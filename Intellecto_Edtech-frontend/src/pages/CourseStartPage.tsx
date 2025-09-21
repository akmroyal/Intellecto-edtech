import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Volume2, VolumeX, Play, Pause, Settings, BookOpen, Brain, Users, Clock, Target, Award } from 'lucide-react';
import CourseGeminiChat from '@/components/CourseGeminiChat';
import CourseAvatar from '@/components/CourseAvatar';
import type { CourseContext } from '@/lib/gemini';
import { getCourseById } from '@/lib/api';

interface Course {
    id: string;
    title?: string;
    description?: string;
    estimated_duration?: number;
    level?: string;
    tags?: string;
}


const CourseStartPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const [isRecording, setIsRecording] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [courseProgress, setCourseProgress] = useState(25);
    const [currentTopic, setCurrentTopic] = useState('Introduction to React Components');
    const [sessionTime, setSessionTime] = useState(0);
    const [course, setCourse] = useState<Course | null>(null);
    const [loadingCourse, setLoadingCourse] = useState(false);
    const [courseError, setCourseError] = useState<string | null>(null);
    
    // Avatar-specific states
    const [lastAiResponse, setLastAiResponse] = useState<string>('');
    const [totalInteractions, setTotalInteractions] = useState(0);
    const [avatarSpeaking, setAvatarSpeaking] = useState(false);

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

    // Prepare course context for Gemini chat
    const courseContext: CourseContext = {
        title: course?.title || currentTopic,
        description: course?.description || 'Interactive learning session',
        level: course?.level || 'Intermediate',
        tags: course?.tags || '',
        currentTopic: currentTopic,
    };

    // Handle AI responses - this will trigger avatar speech and motion
    const handleAiResponse = (response: string) => {
        setLastAiResponse(response);
        setTotalInteractions(prev => prev + 1);
        // Update course progress based on interactions
        setCourseProgress(prev => Math.min(prev + 2, 100));
    };

    // Avatar speech event handlers
    const handleAvatarSpeechStart = () => {
        setAvatarSpeaking(true);
    };

    const handleAvatarSpeechEnd = () => {
        setAvatarSpeaking(false);
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
                            <p className="text-muted-foreground text-sm">
                                Interactive Learning Session 
                                {avatarSpeaking && (
                                    <span className="ml-2 text-blue-600 animate-pulse">🎙️ Avatar Speaking</span>
                                )}
                            </p>
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
                    {/* Left Side - AI Teacher Avatar */}
                    <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant h-fit">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${
                                        avatarSpeaking ? 'bg-red-500 animate-pulse' : 'bg-green-500 animate-pulse'
                                    }`} />
                                    AI Instructor {avatarSpeaking ? 'Speaking' : 'Live'}
                                </CardTitle>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsMuted(!isMuted)}
                                        className="hover:bg-primary/10"
                                        title={isMuted ? "Unmute Avatar" : "Mute Avatar"}
                                    >
                                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="hover:bg-primary/10"
                                        title={isPlaying ? "Pause Avatar" : "Resume Avatar"}
                                    >
                                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="hover:bg-primary/10"
                                        title="Avatar Settings"
                                    >
                                        <Settings className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* 3D Avatar Component with AI Response Integration */}
                            <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
                                <CourseAvatar 
                                    className="h-full"
                                    aiResponse={lastAiResponse} // Pass AI response for automatic speech
                                    onSpeechStart={handleAvatarSpeechStart}
                                    onSpeechEnd={handleAvatarSpeechEnd}
                                />
                            </div>

                            {/* AI Response Indicator */}
                            {lastAiResponse && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm font-medium text-blue-700">Latest AI Response</span>
                                    </div>
                                    <p className="text-xs text-blue-600 line-clamp-2">{lastAiResponse}</p>
                                </div>
                            )}

                            {/* Learning Controls */}
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="p-4 bg-primary/5 border-primary/20">
                                    <div className="text-center">
                                        <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
                                        <p className="text-sm font-medium">Current Focus</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {course?.level || 'Component Lifecycle'}
                                        </p>
                                    </div>
                                </Card>
                                <Card className="p-4 bg-primary-glow/5 border-primary-glow/20">
                                    <div className="text-center">
                                        <Award className="w-6 h-6 mx-auto mb-2 text-primary-glow" />
                                        <p className="text-sm font-medium">XP Earned</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            +{totalInteractions * 25} Points
                                        </p>
                                    </div>
                                </Card>
                            </div>

                            {/* Enhanced Learning Stats */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Comprehension Level</span>
                                    <Badge variant="secondary">{course?.level || 'Intermediate'}</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">AI Interactions</span>
                                    <span className="text-sm font-medium">{totalInteractions}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Speech Status</span>
                                    <span className={`text-sm font-medium ${
                                        avatarSpeaking ? 'text-red-600' : 
                                        isMuted ? 'text-gray-500' : 'text-green-600'
                                    }`}>
                                        {avatarSpeaking ? '🎙️ Speaking' : 
                                         isMuted ? '🔇 Muted' : '✓ Ready'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Session Duration</span>
                                    <span className="text-sm font-medium">{formatTime(sessionTime)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Course Tags</span>
                                    <span className="text-xs text-muted-foreground max-w-32 truncate">
                                        {course?.tags || 'react, components'}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right Side - Gemini AI Chat with Avatar Integration */}
                    <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant flex flex-col min-h-[600px]">
                        <CourseGeminiChat 
                            courseContext={courseContext}
                            className="h-full"
                            onAiResponse={handleAiResponse} // Connect AI responses to avatar
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CourseStartPage;