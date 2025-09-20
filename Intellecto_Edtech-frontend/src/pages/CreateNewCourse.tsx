import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { api, createCourse, CourseCreateData } from "@/lib/api";
import {
    Code,
    BookOpen,
    Laptop,
    Brain,
    Terminal,
    Lightbulb,
    Github,
    Monitor,
    Coffee,
    Zap,
    Database,
    Palette,
    Calculator,
    Globe,
    Camera,
    Music,
    Gamepad2,
    Sparkles
} from "lucide-react";
import { toast } from "sonner";

const CreateNewCourse = () => {
    const navigate = useNavigate();
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [difficultyLevel, setDifficultyLevel] = useState("");
    const [learningGoals, setLearningGoals] = useState("");
    const [addTags, setTags] = useState("");
    const [objectives, setObjectives] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    const subjects = [
        { id: "programming", name: "Programming", icon: Code },
        { id: "data-science", name: "Data Science", icon: Database },
        { id: "web-development", name: "Web Development", icon: Globe },
        { id: "mobile-development", name: "Mobile Development", icon: Laptop },
        { id: "ai-ml", name: "AI & Machine Learning", icon: Brain },
        { id: "cybersecurity", name: "Cybersecurity", icon: Terminal },
        { id: "design", name: "UI/UX Design", icon: Palette },
        { id: "mathematics", name: "Mathematics", icon: Calculator },
        { id: "photography", name: "Photography", icon: Camera },
        { id: "music", name: "Music Production", icon: Music },
        { id: "game-development", name: "Game Development", icon: Gamepad2 },
        { id: "digital-marketing", name: "Digital Marketing", icon: Lightbulb }
    ];

    const handleSubjectToggle = (subjectId: string) => {
        setSelectedSubjects(prev =>
            prev.includes(subjectId)
                ? prev.filter(id => id !== subjectId)
                : [...prev, subjectId]
        );
    };

    const handleCreateCourse = async () => {
        if (!courseName || selectedSubjects.length === 0 || !duration || !difficultyLevel || !addTags) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsCreating(true);

        try {
            // Convert duration string to number based on the select values
            let durationNumber = 1;
            switch (duration) {
                case "1-week":
                    durationNumber = 1;
                    break;
                case "2-weeks":
                    durationNumber = 2;
                    break;
                case "1-month":
                    durationNumber = 4; // 4 weeks
                    break;
                case "3-months":
                    durationNumber = 12; // 12 weeks
                    break;
                case "6-months":
                    durationNumber = 24; // 24 weeks
                    break;
                case "1-year":
                    durationNumber = 52; // 52 weeks
                    break;
                default:
                    // Fallback: try to extract number from string
                    durationNumber = parseInt(duration.match(/\d+/)?.[0] || "1");
            }
            
            // Prepare course data according to backend schema
            const courseData: CourseCreateData = {
                title: courseName,
                description: courseDescription || "No description provided",
                instructor_id: "current_user_id", // You'll need to get this from user context
                tags: addTags, // Backend expects string, not array
                level: difficultyLevel,
                objectives: objectives ? objectives.split('\n').map(obj => obj.trim()).filter(obj => obj) : [],
                estimated_duration: durationNumber, // Backend expects integer (weeks)
                is_published: false
            };

            const response = await createCourse(courseData);
            
            if (response) {
                console.log("Course created successfully:", response);
                toast.success("Course created successfully!");
                // Navigate to the dashboard
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Error creating course:", error);
            toast.error("Failed to create course. Please try again.");
        } finally {
            setIsCreating(false);
        }
    };

    const handleAIGenerate = () => {
        toast.success("AI is generating your customized course...");
        // Here you would integrate with AI service
    };

    const floatingIcons = [
        { Icon: Code, delay: "0s", duration: "20s", animation: "animate-move-diagonal-1" },
        { Icon: BookOpen, delay: "2s", duration: "18s", animation: "animate-move-diagonal-2" },
        { Icon: Laptop, delay: "4s", duration: "22s", animation: "animate-move-circular" },
        { Icon: Brain, delay: "1s", duration: "19s", animation: "animate-move-wave" },
        { Icon: Terminal, delay: "3s", duration: "21s", animation: "animate-move-diagonal-1" },
        { Icon: Lightbulb, delay: "5s", duration: "17s", animation: "animate-move-diagonal-2" },
        { Icon: Github, delay: "0.5s", duration: "20s", animation: "animate-move-circular" },
        { Icon: Monitor, delay: "2.5s", duration: "18s", animation: "animate-move-wave" },
        { Icon: Coffee, delay: "4.5s", duration: "22s", animation: "animate-move-diagonal-1" },
        { Icon: Zap, delay: "1.5s", duration: "19s", animation: "animate-move-diagonal-2" },
        { Icon: Database, delay: "3.5s", duration: "21s", animation: "animate-move-circular" },
        { Icon: Palette, delay: "5.5s", duration: "17s", animation: "animate-move-wave" },
        { Icon: Calculator, delay: "0.8s", duration: "20s", animation: "animate-move-diagonal-1" },
        { Icon: Globe, delay: "2.8s", duration: "18s", animation: "animate-move-diagonal-2" },
        { Icon: Camera, delay: "4.8s", duration: "22s", animation: "animate-move-circular" },
        { Icon: Music, delay: "1.8s", duration: "19s", animation: "animate-move-wave" },
        { Icon: Gamepad2, delay: "3.8s", duration: "21s", animation: "animate-move-diagonal-1" }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-background">
                {/* Back Button Top Left */}
                <div className="absolute top-6 left-6 z-20">
                    <button
                        aria-label="Go back"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg border border-border bg-card/80 hover:bg-card transition-colors shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4 text-foreground" />
                        <span className="text-sm text-foreground">Back</span>
                    </button>
                </div>
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary-glow/10 to-primary/5 animate-gradient-shift" />

            {/* Floating Orbs */}
            <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse-glow" />
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary-glow/30 rounded-full blur-xl animate-float" />
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/15 rounded-full blur-lg animate-glow" />

            {/* Floating Icons */}
            {floatingIcons.map(({ Icon, delay, duration, animation }, index) => (
                <Icon
                    key={index}
                    className={`absolute text-primary/20 animate-icon-glow ${animation}`}
                    size={Math.random() * 20 + 16}
                    style={{
                        left: `${Math.random() * 90 + 5}%`,
                        top: `${Math.random() * 90 + 5}%`,
                        animationDelay: delay,
                        animationDuration: duration,
                    }}
                />
            ))}

            {/* AI Generate Button - Top Right */}
            <div className="absolute top-6 right-6 z-10">
                <Button
                    onClick={handleAIGenerate}
                    className="bg-gradient-primary text-primary-foreground hover:shadow-elegant transition-all duration-300 hover:scale-105"
                >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create Customized Course by AI
                </Button>
            </div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent mb-4">
                            Create New Course
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Design your personalized learning journey. Choose subjects, set your goals, and let AI help you create the perfect course.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left Column - Course Details */}
                        <Card className="backdrop-blur-sm bg-card/80 border-primary/20 shadow-elegant animate-scale-in">
                            <CardHeader>
                                <CardTitle className="text-2xl text-primary">Course Details</CardTitle>
                                <CardDescription>Set up your course fundamentals</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="courseName" className="text-sm font-medium">Course Name *</Label>
                                    <Input
                                        id="courseName"
                                        placeholder="Enter course name"
                                        value={courseName}
                                        onChange={(e) => setCourseName(e.target.value)}
                                        className="border-primary/20 focus:border-primary"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="courseDescription" className="text-sm font-medium">Course Description</Label>
                                    <Textarea
                                        id="courseDescription"
                                        placeholder="Describe what you want to learn..."
                                        value={courseDescription}
                                        onChange={(e) => setCourseDescription(e.target.value)}
                                        className="border-primary/20 focus:border-primary min-h-[100px]"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">Duration *</Label>
                                        <Select value={duration} onValueChange={setDuration}>
                                            <SelectTrigger className="border-primary/20 focus:border-primary">
                                                <SelectValue placeholder="Select duration" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1-week">1 Week</SelectItem>
                                                <SelectItem value="2-weeks">2 Weeks</SelectItem>
                                                <SelectItem value="1-month">1 Month</SelectItem>
                                                <SelectItem value="3-months">3 Months</SelectItem>
                                                <SelectItem value="6-months">6 Months</SelectItem>
                                                <SelectItem value="1-year">1 Year</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">Difficulty Level *</Label>
                                        <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
                                            <SelectTrigger className="border-primary/20 focus:border-primary">
                                                <SelectValue placeholder="Select level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="beginner">Beginner</SelectItem>
                                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                                <SelectItem value="advanced">Advanced</SelectItem>
                                                <SelectItem value="expert">Expert</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="learningGoals" className="text-sm font-medium">Learning Goals</Label>
                                    <Textarea
                                        id="learningGoals"
                                        placeholder="What specific skills or knowledge do you want to gain?"
                                        value={learningGoals}
                                        onChange={(e) => setLearningGoals(e.target.value)}
                                        className="border-primary/20 focus:border-primary"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="objectives" className="text-sm font-medium">Course Objectives</Label>
                                    <Textarea
                                        id="objectives"
                                        placeholder="Enter course objectives (one per line)"
                                        value={objectives}
                                        onChange={(e) => setObjectives(e.target.value)}
                                        className="border-primary/20 focus:border-primary"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="addTags" className="text-sm font-medium">Create Tags for this course * </Label>
                                    <Textarea
                                        id="addTags"
                                        placeholder="Add tags separated by commas (e.g., web-development, machine-learning, python, react)"
                                        value={addTags}
                                        onChange={(e) => setTags(e.target.value)}
                                        className="border-primary/20 focus:border-primary"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Right Column - Subject Selection */}
                        <Card className="backdrop-blur-sm bg-card/80 border-primary/20 shadow-elegant animate-scale-in" style={{ animationDelay: "0.1s" }}>
                            <CardHeader>
                                <CardTitle className="text-2xl text-primary">Choose Subjects</CardTitle>
                                <CardDescription>Select the topics you want to learn *</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-3">
                                    {subjects.map((subject) => {
                                        const Icon = subject.icon;
                                        const isSelected = selectedSubjects.includes(subject.id);

                                        return (
                                            <div
                                                key={subject.id}
                                                className={`relative group cursor-pointer transition-all duration-300 ${isSelected
                                                        ? 'bg-primary/10 border-primary shadow-glow'
                                                        : 'bg-background/50 border-primary/20 hover:border-primary/40'
                                                    } border rounded-lg p-4 hover:scale-105`}
                                                onClick={() => handleSubjectToggle(subject.id)}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <Checkbox
                                                        checked={isSelected}
                                                        onChange={() => handleSubjectToggle(subject.id)}
                                                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                                    />
                                                    <Icon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                                                    <span className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                                                        {subject.name}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Create Button */}
                    <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
                        <Button
                            onClick={handleCreateCourse}
                            disabled={isCreating}
                            size="lg"
                            className="bg-gradient-primary text-primary-foreground hover:shadow-elegant transition-all duration-300 hover:scale-105 px-12 py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <BookOpen className="w-5 h-5 mr-2" />
                            {isCreating ? "Creating Course..." : "Create My Course"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNewCourse;