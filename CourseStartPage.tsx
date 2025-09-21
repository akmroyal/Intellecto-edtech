import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Mic, MicOff, Volume2, VolumeX, Play, Pause, Settings, MessageSquare, BookOpen, Brain, Users, Clock, Target, Award } from 'lucide-react';
import Model from '../components/model';


interface Message {
    id: string;
    type: 'bot' | 'user';
    content: string;
    timestamp: Date;
}

import { getCourseById } from '@/lib/api';

interface Course {
    id: string;
    title?: string;
    description?: string;
    estimated_duration?: number;
    level?: string;
}

const CourseStartPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const [isRecording, setIsRecording] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            type: 'bot',
            content: 'Welcome to your personalized learning session! I\'m your AI instructor. Today we\'ll be exploring the fundamentals of React development. Are you ready to begin?',
            timestamp: new Date()
        }
    ]);
    const [courseProgress, setCourseProgress] = useState(25);
    const [currentTopic, setCurrentTopic] = useState('Introduction to React Components');
    const [sessionTime, setSessionTime] = useState(0);
    const [course, setCourse] = useState<Course | null>(null);
    const [loadingCourse, setLoadingCourse] = useState(false);
    const [courseError, setCourseError] = useState<string | null>(null);

    // Session timer
    useEffect(() => {
        const timer = setInterval(() => {
            setSessionTime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSendMessage = () => {
        if (!userInput.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: userInput,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setUserInput('');

        // Simulate AI response
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                type: 'bot',
                content: `Great question! Let me explain that concept in more detail. ${userInput.includes('component') ? 'Components are the building blocks of React applications...' : 'I understand your point. Let\'s dive deeper into this topic...'}`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1500);
    };

    const handleVoiceToggle = () => {
        setIsRecording(!isRecording);
        // Here you would integrate speech-to-text functionality
    };

    // Fetch course by id or use location.state.course
    useEffect(() => {
        const idFromParams = params.id || (location.state && (location.state as any).course?.id);
        if (!idFromParams) return; // nothing to fetch

        let cancelled = false;
        const fetchCourse = async () => {
            setLoadingCourse(true);
            setCourseError(null);
            try {
                const data = await getCourseById(idFromParams as string);
                if (cancelled) return;
                setCourse(data as Course);
                if ((data as any).title) setCurrentTopic((data as any).title);
            } catch (err: unknown) {
                const msg = err instanceof Error ? err.message : String(err);
                setCourseError(msg || 'Failed to load course');
            } finally {
                if (!cancelled) setLoadingCourse(false);
            }
        };

        // If location.state already had course, use it immediately
        if (location.state && (location.state as any).course) {
            const c = (location.state as any).course as Course;
            setCourse(c);
            if (c.title) setCurrentTopic(c.title);
        }

        fetchCourse();
        return () => {
            cancelled = true;
        };
    }, [params.id, location.state]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden flex flex-col">
            {/* Animated Background Icons */}
            <div className="absolute inset-0 pointer-events-none">
                <BookOpen className="absolute w-8 h-8 text-primary/20 animate-move-diagonal-1" style={{ top: '10%', left: '5%', animationDelay: '0s' }} />
                <Brain className="absolute w-6 h-6 text-primary-glow/30 animate-move-circular" style={{ top: '20%', right: '15%', animationDelay: '2s' }} />
                <Users className="absolute w-7 h-7 text-primary/25 animate-move-wave" style={{ bottom: '25%', left: '10%', animationDelay: '4s' }} />
                <Target className="absolute w-5 h-5 text-primary-glow/20 animate-move-diagonal-2" style={{ top: '60%', right: '8%', animationDelay: '1s' }} />
                <Award className="absolute w-6 h-6 text-primary/30 animate-move-circular" style={{ bottom: '15%', right: '20%', animationDelay: '3s' }} />
                <Clock className="absolute w-8 h-8 text-primary-glow/25 animate-move-wave" style={{ top: '40%', left: '8%', animationDelay: '5s' }} />
            </div>

            {/* Header */}
            <div className="relative z-10 p-6 border-b border-border/50 bg-background/80 backdrop-blur-sm flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(-1)}
                            className="hover:bg-primary/10 transition-all duration-300"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                                {currentTopic}{loadingCourse ? ' (loading...)' : ''}
                            </h1>
                            <p className="text-muted-foreground text-sm">Interactive Learning Session</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="px-3 py-1">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatTime(sessionTime)}
                        </Badge>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Progress:</span>
                            <div className="w-24">
                                <Progress value={courseProgress} className="h-2" />
                            </div>
                            <span className="text-sm font-medium">{courseProgress}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 p-6 flex-1 overflow-auto">
                {courseError && (
                    <div className="mb-4 text-sm text-red-600">Failed to load course: {courseError}</div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-full">
                    <div className="flex items-center justify-center bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant p-4 rounded-lg bg-white/10">

                    <Model/>
                    </div>
                    {/* Left Side - AI Teacher Bot */}

                    

                    {/* Right Side - Interactive Content */}
                    <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant flex flex-col">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-primary" />
                                Interactive Learning Chat
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col min-h-0">
                            {/* Chat Messages */}
                            <ScrollArea className="flex-1 mb-4 min-h-[300px]">
                                <div className="space-y-4 pr-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] p-3 rounded-lg ${message.type === 'user'
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted border border-border/50'
                                                    }`}
                                            >
                                                <p className="text-sm">{message.content}</p>
                                                <p className={`text-xs mt-1 opacity-70`}>
                                                    {message.timestamp.toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>

                            {/* Input Area */}
                            <div className="space-y-3 mt-auto">
                                <Textarea
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    placeholder="Ask a question or share your thoughts..."
                                    className="min-h-[80px] resize-none"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                />

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant={isRecording ? "destructive" : "outline"}
                                            size="sm"
                                            onClick={handleVoiceToggle}
                                            className="transition-all duration-300"
                                        >
                                            {isRecording ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                                            {isRecording ? 'Stop Recording' : 'Voice Input'}
                                        </Button>
                                        {isRecording && (
                                            <div className="flex items-center gap-1">
                                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                                <span className="text-xs text-muted-foreground">Recording...</span>
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={!userInput.trim()}
                                        className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 transition-all duration-300"
                                    >
                                        Send Message
                                    </Button>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="mt-4 pt-4 border-t border-border/50">
                                <p className="text-xs text-muted-foreground mb-2">Quick Actions:</p>
                                <div className="flex flex-wrap gap-2">
                                    <Button variant="outline" size="sm" onClick={() => setUserInput("Can you explain this concept again?")}>
                                        Explain Again
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => setUserInput("I need more examples")}>
                                        More Examples
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => setUserInput("What's the next topic?")}>
                                        Next Topic
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => setUserInput("I'm ready for a quiz")}>
                                        Take Quiz
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CourseStartPage;
