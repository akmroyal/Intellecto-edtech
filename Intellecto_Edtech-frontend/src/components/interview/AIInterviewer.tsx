// import { useState, useEffect } from "react";
// import { Bot, User, Sparkles } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// interface Message {
//   id: string;
//   type: 'ai' | 'user';
//   content: string;
//   timestamp: Date;
// }

// interface AIInterviewerProps {
//   messages: Message[];
//   isAISpeaking: boolean;
//   isProcessing: boolean;
// }

// export const AIInterviewer = ({ 
//   messages, 
//   isAISpeaking, 
//   isProcessing 
// }: AIInterviewerProps) => {
//   const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);

//   useEffect(() => {
//     // Animate messages appearing
//     messages.forEach((message, index) => {
//       setTimeout(() => {
//         setDisplayedMessages(prev => [...prev.slice(0, index), message]);
//       }, index * 300);
//     });
//   }, [messages]);

//   return (
//     <Card className="interview-card h-96 animate-fade-in">
//       <CardContent className="p-6 h-full flex flex-col">
//         <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
//           <div className="relative">
//             <Avatar className="h-10 w-10">
//               <AvatarFallback className="bg-gradient-primary">
//                 <Bot className="h-5 w-5 text-primary-foreground" />
//               </AvatarFallback>
//             </Avatar>
//             {isAISpeaking && (
//               <div className="absolute -inset-1 rounded-full border-2 border-primary animate-pulse-glow" />
//             )}
//           </div>
//           <div>
//             <h3 className="font-semibold text-foreground">AI Interviewer</h3>
//             <p className="text-sm text-muted-foreground">
//               {isAISpeaking ? "Speaking..." : isProcessing ? "Thinking..." : "Ready to listen"}
//             </p>
//           </div>
//           {isAISpeaking && (
//             <div className="ml-auto flex items-center gap-1">
//               <Sparkles className="h-4 w-4 text-primary animate-pulse" />
//               <span className="text-xs text-primary">Live</span>
//             </div>
//           )}
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-muted">
//           {displayedMessages.length === 0 ? (
//             <div className="flex items-center justify-center h-full text-center animate-fade-in">
//               <div className="space-y-2">
//                 <Bot className="h-8 w-8 text-muted-foreground mx-auto" />
//                 <p className="text-muted-foreground">
//                   Welcome! I'm your AI interviewer. Let's begin when you're ready.
//                 </p>
//               </div>
//             </div>
//           ) : (
//             displayedMessages.map((message, index) => (
//               <div 
//                 key={message.id}
//                 className={`flex gap-3 animate-slide-up`}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <Avatar className="h-8 w-8 mt-1">
//                   <AvatarFallback className={
//                     message.type === 'ai' 
//                       ? "bg-gradient-primary" 
//                       : "bg-secondary"
//                   }>
//                     {message.type === 'ai' ? (
//                       <Bot className="h-4 w-4 text-primary-foreground" />
//                     ) : (
//                       <User className="h-4 w-4 text-secondary-foreground" />
//                     )}
//                   </AvatarFallback>
//                 </Avatar>
                
//                 <div className="flex-1 space-y-1">
//                   <div className={`
//                     inline-block px-4 py-2 rounded-lg max-w-[80%]
//                     ${message.type === 'ai' 
//                       ? 'bg-primary/10 text-foreground' 
//                       : 'bg-secondary text-secondary-foreground'
//                     }
//                   `}>
//                     {message.content}
//                   </div>
//                   <div className="text-xs text-muted-foreground">
//                     {message.timestamp.toLocaleTimeString()}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
          
//           {isProcessing && (
//             <div className="flex gap-3 animate-fade-in">
//               <Avatar className="h-8 w-8 mt-1">
//                 <AvatarFallback className="bg-gradient-primary">
//                   <Bot className="h-4 w-4 text-primary-foreground" />
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
//                 <div className="flex gap-1">
//                   {[...Array(3)].map((_, i) => (
//                     <div
//                       key={i}
//                       className="w-2 h-2 bg-primary rounded-full animate-pulse"
//                       style={{ animationDelay: `${i * 0.2}s` }}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-sm text-muted-foreground">Analyzing your response...</span>
//               </div>
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };



import { useState, useEffect } from "react";
import { Bot, User, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

interface AIInterviewerProps {
  messages: Message[];
  isAISpeaking: boolean;
  isProcessing: boolean;
  onNewMessage?: (message: string) => void;
}

export const AIInterviewer = ({ 
  messages, 
  isAISpeaking, 
  isProcessing,
  onNewMessage
}: AIInterviewerProps) => {
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    setDisplayedMessages([]);
    messages.forEach((message, index) => {
      setTimeout(() => {
        setDisplayedMessages(prev => [...prev.slice(0, index), message]);
      }, index * 300);
    });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() && onNewMessage) {
      onNewMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <Card className="interview-card h-96 animate-fade-in">
      <CardContent className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-primary">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </AvatarFallback>
            </Avatar>
            {isAISpeaking && (
              <div className="absolute -inset-1 rounded-full border-2 border-primary animate-pulse-glow" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Interviewer</h3>
            <p className="text-sm text-muted-foreground">
              {isAISpeaking ? "Speaking..." : isProcessing ? "Thinking..." : "Ready to listen"}
            </p>
          </div>
          {isAISpeaking && (
            <div className="ml-auto flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-xs text-primary">Live</span>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-muted">
          {displayedMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center animate-fade-in">
              <div className="space-y-2">
                <Bot className="h-8 w-8 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">
                  Welcome! I'm your AI interviewer. Let's begin when you're ready.
                </p>
              </div>
            </div>
          ) : (
            displayedMessages.map((message, index) => (
              <div 
                key={message.id}
                className={`flex gap-3 animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className={
                    message.type === 'ai' 
                      ? "bg-gradient-primary" 
                      : "bg-secondary"
                  }>
                    {message.type === 'ai' ? (
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <User className="h-4 w-4 text-secondary-foreground" />
                    )}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-1">
                  <div className={`
                    inline-block px-4 py-2 rounded-lg max-w-[80%]
                    ${message.type === 'ai' 
                      ? 'bg-primary/10 text-foreground' 
                      : 'bg-secondary text-secondary-foreground'
                    }
                  `}>
                    {message.content}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
          
          {isProcessing && (
            <div className="flex gap-3 animate-fade-in">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback className="bg-gradient-primary">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-primary rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Analyzing your response...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input (for text-based interaction if needed) */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 border rounded-lg px-4 py-2"
            placeholder="Type your response..."
          />
          <button 
            onClick={handleSendMessage}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </CardContent>
    </Card>
  );
};