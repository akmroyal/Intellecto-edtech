import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    ArrowLeft,
    BookOpen,
    Calendar,
    Target,
    Award,
    BarChart3,
    Clock,
    TrendingUp,
    CheckCircle,
    FileText,
    Users,
    Star,
    ChevronRight,
    Bookmark,
    Lightbulb,
    Trophy
} from 'lucide-react';

const MyProgressPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('courses');
    const [timeFilter, setTimeFilter] = useState('week');

    // Sample data for courses
    const [courses, setCourses] = useState([
        {
            id: 1,
            title: 'React Fundamentals',
            description: 'Learn the core concepts of React programming',
            progress: 75,
            duration: '12 hours',
            modulesCompleted: 8,
            totalModules: 12,
            lastAccessed: '2 days ago',
            image: '📘'
        },
        {
            id: 2,
            title: 'Advanced JavaScript',
            description: 'Master advanced JavaScript concepts and patterns',
            progress: 45,
            duration: '16 hours',
            modulesCompleted: 5,
            totalModules: 14,
            lastAccessed: '5 days ago',
            image: '📜'
        },
        {
            id: 3,
            title: 'UI/UX Design Principles',
            description: 'Create beautiful and functional user interfaces',
            progress: 90,
            duration: '10 hours',
            modulesCompleted: 9,
            totalModules: 10,
            lastAccessed: 'Yesterday',
            image: '🎨'
        }
    ]);

    // Sample data for projects
    const [projects, setProjects] = useState([
        {
            id: 1,
            title: 'E-commerce Website',
            description: 'Build a full-stack e-commerce application',
            progress: 60,
            deadline: '2023-12-15',
            tasksCompleted: 12,
            totalTasks: 20,
            grade: 'A-',
            teamMembers: 3
        },
        {
            id: 2,
            title: 'Task Management App',
            description: 'Create a productivity app with React Native',
            progress: 85,
            deadline: '2023-11-30',
            tasksCompleted: 17,
            totalTasks: 20,
            grade: 'A',
            teamMembers: 2
        }
    ]);

    // Sample stats
    const [stats, setStats] = useState({
        totalHours: 42,
        coursesCompleted: 5,
        currentStreak: 7,
        weeklyGoal: 10,
        weeklyProgress: 7,
        xpEarned: 2450,
        level: 3
    });

    // Sample achievements
    const [achievements, setAchievements] = useState([
        { id: 1, title: 'First Course Completed', earned: true, icon: '🏆' },
        { id: 2, title: '5 Day Streak', earned: true, icon: '🔥' },
        { id: 3, title: 'Speed Learner', earned: false, icon: '⚡' },
        { id: 4, title: 'Project Master', earned: false, icon: '🛠️' },
        { id: 5, title: 'Perfect Score', earned: true, icon: '💯' },
        { id: 6, title: 'Team Player', earned: true, icon: '👥' }
    ]);

    // Calculate level progress
    const levelProgress = (stats.xpEarned % 1000) / 10;

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden">
            {/* Animated Background Icons */}
            <div className="absolute inset-0 pointer-events-none">
                <BookOpen className="absolute w-8 h-8 text-primary/20 animate-move-diagonal-1" style={{ top: '10%', left: '5%', animationDelay: '0s' }} />
                <Target className="absolute w-6 h-6 text-primary-glow/30 animate-move-circular" style={{ top: '20%', right: '15%', animationDelay: '2s' }} />
                <Trophy className="absolute w-7 h-7 text-primary/25 animate-move-wave" style={{ bottom: '25%', left: '10%', animationDelay: '4s' }} />
                <BarChart3 className="absolute w-5 h-5 text-primary-glow/20 animate-move-diagonal-2" style={{ top: '60%', right: '8%', animationDelay: '1s' }} />
                <Award className="absolute w-6 h-6 text-primary/30 animate-move-circular" style={{ bottom: '15%', right: '20%', animationDelay: '3s' }} />
                <TrendingUp className="absolute w-8 h-8 text-primary-glow/25 animate-move-wave" style={{ top: '40%', left: '8%', animationDelay: '5s' }} />
            </div>

            {/* Header */}
            <div className="relative z-10 p-6 border-b border-border/50 bg-background/80 backdrop-blur-sm">
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
                                My Learning Progress
                            </h1>
                            <p className="text-muted-foreground text-sm">Track your courses, projects, and achievements</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="px-3 py-1">
                            <Clock className="w-4 h-4 mr-1" />
                            {stats.totalHours} hrs learned
                        </Badge>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Level {stats.level}</span>
                            <div className="w-24">
                                <Progress value={levelProgress} className="h-2" />
                            </div>
                            <span className="text-sm font-medium">{levelProgress}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Stats Overview Card */}
                    <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                Learning Overview
                            </CardTitle>
                            <CardDescription>Your progress this week</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-primary/5 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Weekly Goal</span>
                                        <Target className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="text-2xl font-bold">{stats.weeklyProgress}/{stats.weeklyGoal} hrs</div>
                                    <Progress value={(stats.weeklyProgress / stats.weeklyGoal) * 100} className="mt-2 h-2" />
                                </div>

                                <div className="p-4 bg-primary-glow/5 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Current Streak</span>
                                        <Fire className="w-4 h-4 text-primary-glow" />
                                    </div>
                                    <div className="text-2xl font-bold">{stats.currentStreak} days</div>
                                    <p className="text-xs text-muted-foreground mt-1">Keep it up!</p>
                                </div>

                                <div className="p-4 bg-primary/5 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Courses Completed</span>
                                        <CheckCircle className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="text-2xl font-bold">{stats.coursesCompleted}</div>
                                </div>

                                <div className="p-4 bg-primary-glow/5 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Total XP</span>
                                        <Award className="w-4 h-4 text-primary-glow" />
                                    </div>
                                    <div className="text-2xl font-bold">{stats.xpEarned}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Achievements Card */}
                    <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-primary" />
                                Achievements
                            </CardTitle>
                            <CardDescription>Earned {achievements.filter(a => a.earned).length} of {achievements.length}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-3">
                                {achievements.map((achievement) => (
                                    <div
                                        key={achievement.id}
                                        className={`p-3 rounded-lg text-center ${achievement.earned ? 'bg-primary/10 border border-primary/20' : 'bg-muted opacity-50'}`}
                                    >
                                        <div className="text-2xl mb-1">{achievement.icon}</div>
                                        <p className="text-xs font-medium">{achievement.title}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs for Courses and Projects */}
                <Tabs defaultValue="courses" className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
                        <TabsTrigger value="courses" className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            Courses
                        </TabsTrigger>
                        <TabsTrigger value="projects" className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Projects
                        </TabsTrigger>
                    </TabsList>

                    {/* Courses Tab */}
                    <TabsContent value="courses">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map((course) => (
                                <Card key={course.id} className="bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle className="text-lg flex items-center gap-2">
                                                    <span className="text-2xl">{course.image}</span>
                                                    {course.title}
                                                </CardTitle>
                                                <CardDescription className="mt-1">{course.description}</CardDescription>
                                            </div>
                                            <Button variant="ghost" size="icon">
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span>Progress</span>
                                                    <span>{course.progress}%</span>
                                                </div>
                                                <Progress value={course.progress} className="h-2" />
                                            </div>

                                            <div className="flex justify-between text-sm">
                                                <div className="flex items-center gap-1">
                                                    <CheckCircle className="w-4 h-4 text-primary" />
                                                    <span>{course.modulesCompleted}/{course.totalModules} modules</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                                    <span>{course.duration}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="w-full flex justify-between items-center text-xs text-muted-foreground">
                                            <span>Last accessed: {course.lastAccessed}</span>
                                            <Button size="sm" variant="outline">
                                                Continue
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Projects Tab */}
                    <TabsContent value="projects">
                        <div className="grid grid-cols-1 gap-6">
                            {projects.map((project) => (
                                <Card key={project.id} className="bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle>{project.title}</CardTitle>
                                                <CardDescription className="mt-1">{project.description}</CardDescription>
                                            </div>
                                            <Badge variant={project.progress === 100 ? "default" : "secondary"}>
                                                {project.progress === 100 ? 'Completed' : 'In Progress'}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span>Progress</span>
                                                    <span>{project.progress}%</span>
                                                </div>
                                                <Progress value={project.progress} className="h-2" />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>Deadline: {project.deadline}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4" />
                                                    <span>Tasks: {project.tasksCompleted}/{project.totalTasks}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Star className="w-4 h-4" />
                                                    <span>Grade: {project.grade}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4" />
                                                    <span>Team: {project.teamMembers} members</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button variant="outline">View Details</Button>
                                        <Button>Continue Work</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Weekly Goals Card at Bottom */}
                <Card className="mt-6 bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-primary" />
                            Weekly Learning Goals
                        </CardTitle>
                        <CardDescription>Set and track your weekly learning objectives</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <Bookmark className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Complete 2 modules</p>
                                        <p className="text-sm text-muted-foreground">React Fundamentals course</p>
                                    </div>
                                </div>
                                <Badge variant="outline" className="bg-background">3/5 days</Badge>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <Lightbulb className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Spend 5 hours learning</p>
                                        <p className="text-sm text-muted-foreground">Across all courses</p>
                                    </div>
                                </div>
                                <Badge variant="outline" className="bg-background">4/5 hours</Badge>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg opacity-50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <FileText className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Complete project proposal</p>
                                        <p className="text-sm text-muted-foreground">Task Management App</p>
                                    </div>
                                </div>
                                <Badge variant="outline" className="bg-background">Not started</Badge>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Add New Goal</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

// Adding the Fire icon component that was referenced
const Fire = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
    </svg>
);

export default MyProgressPage;