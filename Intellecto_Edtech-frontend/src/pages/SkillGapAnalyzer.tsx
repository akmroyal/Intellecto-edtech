import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Brain,
  Target,
  Award,
  BarChart3,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Lightbulb,
  Zap,
  Clock,
  Download,
  Share2
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

const SkillGapAnalyzer = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(true);

  // Sample data for skills assessment
  const [skills, setSkills] = useState([
    { id: 1, name: 'JavaScript', level: 85, target: 95, category: 'Programming' },
    { id: 2, name: 'React', level: 78, target: 90, category: 'Frontend' },
    { id: 3, name: 'TypeScript', level: 65, target: 85, category: 'Programming' },
    { id: 4, name: 'Node.js', level: 60, target: 80, category: 'Backend' },
    { id: 5, name: 'UI/UX Design', level: 72, target: 85, category: 'Design' },
    { id: 6, name: 'Communication', level: 80, target: 90, category: 'Soft Skills' },
  ]);

  // Sample data for learning path
  const [learningPath, setLearningPath] = useState([
    { id: 1, title: 'Advanced React Patterns', priority: 'High', duration: '2 weeks', status: 'Not Started' },
    { id: 2, title: 'TypeScript Mastery', priority: 'High', duration: '3 weeks', status: 'Not Started' },
    { id: 3, title: 'Node.js Fundamentals', priority: 'Medium', duration: '4 weeks', status: 'Not Started' },
  ]);

  // Sample strengths and weaknesses
  const [strengths, setStrengths] = useState([
    { id: 1, name: 'JavaScript', description: 'Strong foundation with modern ES6+ features' },
    { id: 2, name: 'Communication', description: 'Effective at explaining technical concepts' },
  ]);

  const [weaknesses, setWeaknesses] = useState([
    { id: 1, name: 'TypeScript', description: 'Need more practice with advanced types' },
    { id: 2, name: 'Backend Development', description: 'Limited experience with server-side logic' },
  ]);

  const generateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setReportGenerated(true);
      setIsGenerating(false);
    }, 2000);
  };

  // Calculate skill categories
  const categories = [...new Set(skills.map(skill => skill.category))];
  const categoryAverages = categories.map(category => {
    const categorySkills = skills.filter(skill => skill.category === category);
    const average = categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length;
    return { category, average };
  });

  // Data for radar chart
  const radarData = categoryAverages.map(item => ({
    subject: item.category,
    A: item.average,
    fullMark: 100,
  }));

  // Data for bar chart (skills comparison)
  const barData = skills.map(skill => ({
    name: skill.name,
    Current: skill.level,
    Target: skill.target,
  }));

  // Data for pie chart (priority distribution)
  const priorityData = [
    { name: 'High Priority', value: learningPath.filter(item => item.priority === 'High').length },
    { name: 'Medium Priority', value: learningPath.filter(item => item.priority === 'Medium').length },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden">
      {/* Animated Background Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Brain className="absolute w-8 h-8 text-primary/20 animate-move-diagonal-1" style={{ top: '10%', left: '5%', animationDelay: '0s' }} />
        <BarChart3 className="absolute w-6 h-6 text-primary-glow/30 animate-move-circular" style={{ top: '20%', right: '15%', animationDelay: '2s' }} />
        <Target className="absolute w-7 h-7 text-primary/25 animate-move-wave" style={{ bottom: '25%', left: '10%', animationDelay: '4s' }} />
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
                Skill Gap Analyzer
              </h1>
              <p className="text-muted-foreground text-sm">Identify strengths, weaknesses, and your personalized learning path</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {reportGenerated ? (
              <>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </>
            ) : (
              <Button 
                onClick={generateReport} 
                disabled={isGenerating}
                className="gap-2 bg-gradient-to-r from-primary to-primary-glow"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Generate Report
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6">
        {!reportGenerated ? (
          // Report Generation Placeholder
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Skill Gap Analysis</CardTitle>
              <CardDescription>
                We'll analyze your current skills and create a personalized learning path
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={generateReport} 
                disabled={isGenerating}
                className="w-full gap-2 bg-gradient-to-r from-primary to-primary-glow"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Analyzing Your Skills...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Generate Skill Report
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Report Content
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    Overall Proficiency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[{name: 'Completed', value: 73}, {name: 'Remaining', value: 27}]}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={50}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          <Cell fill="#3b82f6" />
                          <Cell fill="#e5e7eb" />
                        </Pie>
                        <text 
                          x="50%" 
                          y="50%" 
                          textAnchor="middle" 
                          dominantBaseline="middle" 
                          className="text-lg font-bold"
                        >
                          73%
                        </text>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-sm text-muted-foreground">Based on 6 skill assessments</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {strengths.map(strength => (
                      <div key={strength.id} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{strength.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    Improvement Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {weaknesses.map(weakness => (
                      <div key={weakness.id} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{weakness.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="path">Learning Path</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        Skill Categories Radar
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} />
                            <Radar
                              name="Skill Level"
                              dataKey="A"
                              stroke="#3b82f6"
                              fill="#3b82f6"
                              fillOpacity={0.6}
                            />
                            <Tooltip />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        Skills Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={barData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Current" fill="#3b82f6" />
                            <Bar dataKey="Target" fill="#e5e7eb" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Skills Breakdown Tab */}
              <TabsContent value="skills">
                <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant">
                  <CardHeader>
                    <CardTitle>Detailed Skills Assessment</CardTitle>
                    <CardDescription>Your current skill levels and targets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skills.map(skill => (
                        <div key={skill.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <Zap className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">{skill.name}</h3>
                              <p className="text-sm text-muted-foreground">{skill.category}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6">
                            <div className="w-32">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Current: {skill.level}%</span>
                                <span>Target: {skill.target}%</span>
                              </div>
                              <Progress value={skill.level} className="h-2" />
                            </div>
                            
                            <Badge 
                              variant={skill.level >= 80 ? "default" : skill.level >= 60 ? "secondary" : "outline"} 
                              className={skill.level < 60 ? "bg-amber-100 text-amber-800 hover:bg-amber-100" : ""}
                            >
                              {skill.level >= 80 ? "Strong" : skill.level >= 60 ? "Intermediate" : "Beginner"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Learning Path Tab */}
              <TabsContent value="path">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        Learning Path
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {learningPath.map(item => (
                          <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                item.priority === 'High' ? 'bg-red-100' : 'bg-blue-100'
                              }`}>
                                {item.priority === 'High' ? (
                                  <Zap className="w-5 h-5 text-red-600" />
                                ) : (
                                  <Clock className="w-5 h-5 text-blue-600" />
                                )}
                              </div>
                              <div>
                                <h3 className="font-medium">{item.title}</h3>
                                <div className="flex items-center gap-3 mt-1">
                                  <Badge 
                                    variant={item.priority === 'High' ? "destructive" : "secondary"} 
                                    className="text-xs"
                                  >
                                    {item.priority} Priority
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{item.duration}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        Priority Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={priorityData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {priorityData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default SkillGapAnalyzer;