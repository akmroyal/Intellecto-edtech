import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Send, 
  Bot, 
  User, 
  MessageCircle, 
  AlertCircle, 
  Clock,
  Trash2,
  Archive
} from 'lucide-react';
import { 
  callGeminiAPI, 
  generateMessageId, 
  validateMessage, 
  formatTimestamp, 
  CHAR_LIMITS,
  type ChatMessage, 
  type CourseContext 
} from '@/lib/gemini';
import { useToast } from '@/hooks/use-toast';

interface CourseGeminiChatProps {
  courseContext: CourseContext;
  className?: string;
  onAiResponse?: (response: string) => void; // New prop for avatar integration
}

const MAX_MESSAGES = 100;
const QUEUE_POPUP_THRESHOLD = 90; // Show popup when approaching limit

const CourseGeminiChat: React.FC<CourseGeminiChatProps> = ({ 
  courseContext, 
  className = "",
  onAiResponse // Add this new prop
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [showQueuePopup, setShowQueuePopup] = useState(false);
  const [archivedMessages, setArchivedMessages] = useState<ChatMessage[]>([]);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  // Check if queue popup should be shown
  useEffect(() => {
    if (messages.length >= QUEUE_POPUP_THRESHOLD && messages.length < MAX_MESSAGES) {
      setShowQueuePopup(true);
    } else {
      setShowQueuePopup(false);
    }
  }, [messages.length]);

  // Handle input change with character count
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputMessage(value);
    setCharCount(value.length);
  };

  // Archive oldest messages when limit reached
  const archiveOldMessages = () => {
    if (messages.length >= MAX_MESSAGES) {
      const messagesToArchive = messages.slice(0, 20); // Archive 20 oldest messages
      const remainingMessages = messages.slice(20);
      
      setArchivedMessages(prev => [...prev, ...messagesToArchive]);
      setMessages(remainingMessages);
      
      toast({
        title: "Messages Archived",
        description: `${messagesToArchive.length} old messages have been archived to maintain performance.`,
        duration: 3000,
      });
    }
  };

  // Send message to Gemini
  const handleSendMessage = async () => {
    const validation = validateMessage(inputMessage);
    if (!validation.isValid) {
      toast({
        title: "Invalid Message",
        description: validation.error,
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Check if we need to archive messages
    if (messages.length >= MAX_MESSAGES) {
      archiveOldMessages();
    }

    const userMessage: ChatMessage = {
      id: generateMessageId(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setCharCount(0);
    setIsLoading(true);

    try {
      const response = await callGeminiAPI(
        userMessage.content,
        courseContext,
        messages.slice(-5) // Send last 5 messages for context
      );

      const assistantMessage: ChatMessage = {
        id: generateMessageId(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);

      // **NEW: Pass response to avatar for speech and motion**
      onAiResponse?.(response);

    } catch (error) {
      console.error('Error getting Gemini response:', error);
      
      const errorMessage: ChatMessage = {
        id: generateMessageId(),
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request. Please try again.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
      
      // Also trigger avatar for error message
      onAiResponse?.('Sorry, I encountered an error while processing your request. Please try again.');
      
      toast({
        title: "Chat Error",
        description: "Failed to get response from AI tutor. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && inputMessage.trim()) {
        handleSendMessage();
      }
    }
  };

  // Clear all messages
  const handleClearChat = () => {
    setMessages([]);
    setArchivedMessages([]);
    toast({
      title: "Chat Cleared",
      description: "All messages have been cleared.",
      duration: 2000,
    });
  };

  // Archive current messages manually
  const handleArchiveMessages = () => {
    if (messages.length > 0) {
      setArchivedMessages(prev => [...prev, ...messages]);
      setMessages([]);
      toast({
        title: "Messages Archived",
        description: `${messages.length} messages have been archived.`,
        duration: 3000,
      });
    }
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Chat Header */}
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">AI Course Tutor</CardTitle>
            <Badge variant="outline" className="text-xs">
              {messages.length}/{MAX_MESSAGES}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Archive Dialog */}
            {archivedMessages.length > 0 && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Archive className="w-4 h-4" />
                    <span className="ml-1 text-xs">{archivedMessages.length}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>Archived Messages ({archivedMessages.length})</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-96">
                    <div className="space-y-3 pr-4">
                      {archivedMessages.map((message) => (
                        <div key={message.id} className="border rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            {message.role === 'user' ? (
                              <User className="w-4 h-4 text-green-600" />
                            ) : (
                              <Bot className="w-4 h-4 text-blue-600" />
                            )}
                            <span className="font-medium text-sm">
                              {message.role === 'user' ? 'You' : 'AI Tutor'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatTimestamp(message.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            )}
            
            <Button variant="ghost" size="sm" onClick={handleArchiveMessages}>
              <Archive className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm" onClick={handleClearChat}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Course Context Display */}
        <div className="text-xs text-gray-600 bg-gray-50 rounded p-2">
          <strong>Course:</strong> {courseContext.title || 'N/A'} 
          {courseContext.level && <span className="ml-2"><strong>Level:</strong> {courseContext.level}</span>}
        </div>
      </CardHeader>

      {/* Queue Warning Popup */}
      {showQueuePopup && (
        <div className="mx-4 mb-2 p-2 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2 text-amber-800">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">
              Chat approaching limit ({messages.length}/{MAX_MESSAGES}). 
              Old messages will be auto-archived after {MAX_MESSAGES} messages.
            </span>
          </div>
        </div>
      )}

      {/* Chat Messages Area */}
      <CardContent className="flex-1 flex flex-col p-4">
        <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Start a conversation with your AI tutor!</p>
                <p className="text-sm mt-1">Ask questions about the course content, concepts, or assignments.</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {message.role === 'user' ? (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-green-600" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-blue-600" />
                        </div>
                      )}
                    </div>
                    
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Clock className="w-3 h-3 opacity-60" />
                        <span className="text-xs opacity-60">
                          {formatTimestamp(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="animate-pulse flex space-x-1">
                      <div className="rounded-full bg-gray-400 h-2 w-2"></div>
                      <div className="rounded-full bg-gray-400 h-2 w-2"></div>
                      <div className="rounded-full bg-gray-400 h-2 w-2"></div>
                    </div>
                    <span className="text-xs text-gray-500">AI tutor is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="mt-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Ask your AI tutor about the course..."
                disabled={isLoading}
                className="resize-none"
                maxLength={CHAR_LIMITS.USER_MESSAGE}
              />
              <div className="flex justify-between items-center mt-1">
                <span className={`text-xs ${
                  charCount > CHAR_LIMITS.USER_MESSAGE * 0.9 
                    ? 'text-red-500' 
                    : charCount > CHAR_LIMITS.USER_MESSAGE * 0.7 
                    ? 'text-amber-500' 
                    : 'text-gray-500'
                }`}>
                  {charCount}/{CHAR_LIMITS.USER_MESSAGE}
                </span>
                <span className="text-xs text-gray-400">
                  Press Enter to send, Shift+Enter for new line
                </span>
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default CourseGeminiChat;