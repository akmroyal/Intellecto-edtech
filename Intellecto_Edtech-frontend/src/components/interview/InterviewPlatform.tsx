// import { useState, useEffect } from "react";
// import { Settings, Calendar, UserCheck, Code2, MessageSquare, LogOut } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import { useToast } from "@/hooks/use-toast";
// import { VoiceControls } from "./VoiceControls";
// import { AIInterviewer } from "./AIInterviewer";
// import { MCQQuestion } from "./MCQQuestion";
// import { CodeEditor } from "./CodeEditor";
// import { InterviewProgress } from "./InterviewProgress";
// import { SpeakingStatus } from "./SpeakingStatus";
// import { IntroductionStage } from "./stages/IntroductionStage";
// import { TechnicalStage } from "./stages/TechnicalStage";
// import { BehavioralStage } from "./stages/BehavioralStage";
// import { WrapUpStage } from "./stages/WrapUpStage";
// interface Message {
//   id: string;
//   type: 'ai' | 'user';
//   content: string;
//   timestamp: Date;
// }
// export const InterviewPlatform = () => {
//   const {
//     toast
//   } = useToast();
//   const [activeTab, setActiveTab] = useState("interview");
//   const [isListening, setIsListening] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isAISpeaking, setIsAISpeaking] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [elapsedTime, setElapsedTime] = useState(0);

//   // Interview steps with dynamic state
//   const getInterviewSteps = () => [
//     {
//       id: '1',
//       type: 'introduction' as const,
//       title: 'Introduction & Background',
//       completed: currentStep > 0,
//       current: currentStep === 0
//     },
//     {
//       id: '2',
//       type: 'technical' as const,
//       title: 'Technical Questions',
//       completed: currentStep > 1,
//       current: currentStep === 1
//     },
//     {
//       id: '3',
//       type: 'coding' as const,
//       title: 'Coding Challenge',
//       completed: currentStep > 2,
//       current: currentStep === 2
//     },
//     {
//       id: '4',
//       type: 'behavioral' as const,
//       title: 'Behavioral Questions',
//       completed: currentStep > 3,
//       current: currentStep === 3
//     },
//     {
//       id: '5',
//       type: 'conclusion' as const,
//       title: 'Wrap-up & Next Steps',
//       completed: currentStep > 4,
//       current: currentStep === 4
//     }
//   ];

//   const interviewSteps = getInterviewSteps();

//   // Sample MCQ question
//   const sampleQuestion = {
//     question: "What is the time complexity of binary search algorithm?",
//     options: [{
//       id: 'a',
//       text: 'O(n)',
//       isCorrect: false
//     }, {
//       id: 'b',
//       text: 'O(log n)',
//       isCorrect: true
//     }, {
//       id: 'c',
//       text: 'O(n²)',
//       isCorrect: false
//     }, {
//       id: 'd',
//       text: 'O(1)',
//       isCorrect: false
//     }]
//   };

//   // Timer effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setElapsedTime(prev => prev + 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Simulate AI responses
//   useEffect(() => {
//     if (messages.length === 0) {
//       // Initial AI greeting
//       setTimeout(() => {
//         addMessage('ai', "Hello! I'm your AI interviewer today. I'm excited to learn more about you and your technical skills. Let's start with a brief introduction - could you tell me about yourself and your background in software development?");
//       }, 1000);
//     }
//   }, []);
//   const addMessage = (type: 'ai' | 'user', content: string) => {
//     const newMessage: Message = {
//       id: Date.now().toString(),
//       type,
//       content,
//       timestamp: new Date()
//     };
//     setMessages(prev => [...prev, newMessage]);
//   };
//   const handleToggleListening = () => {
//     setIsListening(!isListening);
//     if (!isListening) {
//       // Simulate user speaking
//       setTimeout(() => {
//         addMessage('user', "Thank you for having me! I'm a full-stack developer with 3 years of experience working primarily with React, Node.js, and Python. I'm passionate about creating efficient, scalable applications and I'm always eager to learn new technologies.");
//         setIsListening(false);
//         handleAIResponse();
//       }, 3000);
//     }
//   };
//   const handleAIResponse = () => {
//     setIsProcessing(true);
//     setTimeout(() => {
//       setIsProcessing(false);
//       setIsAISpeaking(true);
//       const responses = ["That's great! Your background sounds solid. Now, let's dive into some technical questions. I'd like to understand your problem-solving approach better.", "Excellent! I can see you have good experience. Let's move on to evaluate your technical knowledge with some questions.", "Perfect! Your experience with React and Node.js is valuable. Now I'd like to test your understanding of fundamental concepts."];
//       const randomResponse = responses[Math.floor(Math.random() * responses.length)];
//       addMessage('ai', randomResponse);
//       setTimeout(() => {
//         setIsAISpeaking(false);
//       }, 2000);
//     }, 2000);
//   };
//   const handleMCQAnswer = (selectedOption: string) => {
//     toast({
//       title: "Answer Submitted",
//       description: `You selected option ${selectedOption.toUpperCase()}. Moving to the next question.`
//     });
//     setTimeout(() => {
//       setActiveTab("coding");
//       toast({
//         title: "Coding Challenge",
//         description: "Great! Now let's test your coding skills with a practical problem."
//       });
//     }, 2000);
//   };
//   const handleCodeSubmit = (code: string) => {
//     toast({
//       title: "Code Submitted",
//       description: "Your solution has been analyzed. Well done!"
//     });
//   };

//   const handleStageComplete = () => {
//     setCurrentStep(prev => prev + 1);
//     toast({
//       title: "Stage Completed",
//       description: `Moving to ${interviewSteps[currentStep + 1]?.title || "final stage"}...`
//     });
//   };

//   const handleFinishInterview = () => {
//     toast({
//       title: "Interview Finished",
//       description: "Thank you for participating! Your responses have been recorded."
//     });
//     // Additional logic for finishing interview can be added here
//   };

//   const getCurrentStageContent = () => {
//     switch (currentStep) {
//       case 0:
//         return <IntroductionStage onComplete={handleStageComplete} />;
//       case 1:
//         return <TechnicalStage onComplete={handleStageComplete} />;
//       case 2:
//         return (
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsContent value="interview" className="space-y-6">
//               <AIInterviewer messages={messages} isAISpeaking={isAISpeaking} isProcessing={isProcessing} />
//             </TabsContent>
//             <TabsContent value="mcq" className="space-y-6">
//               <MCQQuestion question={sampleQuestion.question} options={sampleQuestion.options} timeLimit={120} onAnswer={handleMCQAnswer} />
//             </TabsContent>
//             <TabsContent value="coding" className="space-y-6">
//               <CodeEditor 
//                 problem="Implement a function that finds the maximum sum of a contiguous subarray (Kadane's Algorithm). The function should handle both positive and negative numbers efficiently." 
//                 initialCode="// Kadane's Algorithm - Maximum Subarray Sum\nfunction maxSubarraySum(nums) {\n  // Your implementation here\n  let maxSum = nums[0];\n  let currentSum = nums[0];\n  \n  // Complete the implementation\n  \n  return maxSum;\n}" 
//                 language="javascript" 
//                 onCodeChange={code => console.log('Code changed:', code)} 
//                 onRun={handleCodeSubmit} 
//                 onSubmit={(code) => {
//                   handleCodeSubmit(code);
//                   handleStageComplete();
//                 }} 
//               />
//             </TabsContent>
//           </Tabs>
//         );
//       case 3:
//         return <BehavioralStage onComplete={handleStageComplete} />;
//       case 4:
//         return <WrapUpStage onFinish={handleFinishInterview} />;
//       default:
//         return <IntroductionStage onComplete={handleStageComplete} />;
//     }
//   };
//   return <div className="min-h-screen bg-background p-4 md:p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between animate-fade-in">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
//               AI Interview Platform
//             </h1>
//             <p className="text-muted-foreground mt-1">
//               Professional technical interview with AI-powered assessment
//             </p>
//           </div>
          
//           <div className="flex items-center gap-4">
//             <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
//               <Calendar className="h-4 w-4" />
//               <span>{new Date().toLocaleDateString()}</span>
//             </div>
//             <Button variant="outline" size="sm">
//               <Settings className="h-4 w-4 mr-2" />
//               Settings
//             </Button>
//             <AlertDialog>
//               <AlertDialogTrigger asChild>
//                 <Button variant="destructive" size="sm">
//                   <LogOut className="h-4 w-4 mr-2" />
//                   Finish Interview
//                 </Button>
//               </AlertDialogTrigger>
//               <AlertDialogContent>
//                 <AlertDialogHeader>
//                   <AlertDialogTitle>Finish Interview</AlertDialogTitle>
//                   <AlertDialogDescription>
//                     Are you sure you want to submit the interview? After submitting, you cannot continue the same interview again. All your responses will be finalized and sent for evaluation.
//                   </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                   <AlertDialogCancel>Cancel</AlertDialogCancel>
//                   <AlertDialogAction onClick={handleFinishInterview}>
//                     Yes, Finish Interview
//                   </AlertDialogAction>
//                 </AlertDialogFooter>
//               </AlertDialogContent>
//             </AlertDialog>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Left Sidebar - Progress */}
//           <div className="lg:col-span-1">
//             <InterviewProgress steps={interviewSteps} currentStep={currentStep} totalTime={3600} // 1 hour
//           elapsedTime={elapsedTime} />
//           </div>

//           {/* Main Interview Area */}
//           <div className="lg:col-span-3 space-y-6">
//             {/* Voice Controls */}
//             <VoiceControls isListening={isListening} onToggleListening={handleToggleListening} onToggleMute={() => setIsMuted(!isMuted)} isMuted={isMuted} />

//             {/* Speaking Status */}
//             <SpeakingStatus isAISpeaking={isAISpeaking} isUserSpeaking={isListening} />

//             {/* Dynamic Interview Content */}
//             {getCurrentStageContent()}
//           </div>
//         </div>
//       </div>
//     </div>;
// };

















// // import { TestCase } from "./types"; // Assuming you have a types file for TestCase interface
// import { useState, useEffect } from "react";
// import { Settings, Calendar, UserCheck, Code2, MessageSquare, LogOut, CheckCircle2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import { useToast } from "@/hooks/use-toast";
// import { VoiceControls } from "./VoiceControls";
// import { AIInterviewer } from "./AIInterviewer";
// import { MCQQuestion } from "./MCQQuestion";
// import { CodeEditor } from "./CodeEditor";
// import { InterviewProgress } from "./InterviewProgress";
// import { SpeakingStatus } from "./SpeakingStatus";
// import { IntroductionStage } from "./stages/IntroductionStage";
// import { TechnicalStage } from "./stages/TechnicalStage";
// import { BehavioralStage } from "./stages/BehavioralStage";
// import { WrapUpStage } from "./stages/WrapUpStage";

// interface Message {
//   id: string;
//   type: 'ai' | 'user';
//   content: string;
//   timestamp: Date;
// }

// export const InterviewPlatform = () => {
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState("interview");
//   const [isListening, setIsListening] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isAISpeaking, setIsAISpeaking] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [interviewCompleted, setInterviewCompleted] = useState(false);

//   // Interview steps with dynamic state
//   const getInterviewSteps = () => [
//     {
//       id: '1',
//       type: 'introduction',
//       title: 'Introduction & Background',
//       completed: currentStep > 0,
//       current: currentStep === 0
//     },
//     {
//       id: '2',
//       type: 'technical',
//       title: 'Technical Questions',
//       completed: currentStep > 1,
//       current: currentStep === 1
//     },
//     {
//       id: '3',
//       type: 'coding',
//       title: 'Coding Challenge',
//       completed: currentStep > 2,
//       current: currentStep === 2
//     },
//     {
//       id: '4',
//       type: 'behavioral',
//       title: 'Behavioral Questions',
//       completed: currentStep > 3,
//       current: currentStep === 3
//     },
//     {
//       id: '5',
//       type: 'conclusion',
//       title: 'Wrap-up & Next Steps',
//       completed: currentStep > 4,
//       current: currentStep === 4
//     }
//   ];

//   const interviewSteps = getInterviewSteps();

//   // Sample MCQ question
//   const sampleQuestion = {
//     question: "What is the time complexity of binary search algorithm?",
//     options: [
//       { id: 'a', text: 'O(n)', isCorrect: false },
//       { id: 'b', text: 'O(log n)', isCorrect: true },
//       { id: 'c', text: 'O(n²)', isCorrect: false },
//       { id: 'd', text: 'O(1)', isCorrect: false }
//     ]
//   };

//   // Timer effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setElapsedTime(prev => prev + 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Simulate AI responses
//   useEffect(() => {
//     if (messages.length === 0) {
//       // Initial AI greeting
//       setTimeout(() => {
//         addMessage('ai', "Hello! I'm your AI interviewer today. I'm excited to learn more about you and your technical skills. Let's start with a brief introduction - could you tell me about yourself and your background in software development?");
//       }, 1000);
//     }
//   }, []);

//   const addMessage = (type: 'ai' | 'user', content: string) => {
//     const newMessage: Message = {
//       id: Date.now().toString(),
//       type,
//       content,
//       timestamp: new Date()
//     };
//     setMessages(prev => [...prev, newMessage]);
//   };

//   const handleToggleListening = () => {
//     setIsListening(!isListening);
//     if (!isListening) {
//       // Simulate user speaking
//       setTimeout(() => {
//         addMessage('user', "Thank you for having me! I'm a full-stack developer with 3 years of experience working primarily with React, Node.js, and Python. I'm passionate about creating efficient, scalable applications and I'm always eager to learn new technologies.");
//         setIsListening(false);
//         handleAIResponse();
//       }, 3000);
//     }
//   };

//   const handleAIResponse = () => {
//     setIsProcessing(true);
//     setTimeout(() => {
//       setIsProcessing(false);
//       setIsAISpeaking(true);
//       const responses = [
//         "That's great! Your background sounds solid. Now, let's dive into some technical questions. I'd like to understand your problem-solving approach better.",
//         "Excellent! I can see you have good experience. Let's move on to evaluate your technical knowledge with some questions.",
//         "Perfect! Your experience with React and Node.js is valuable. Now I'd like to test your understanding of fundamental concepts."
//       ];
//       const randomResponse = responses[Math.floor(Math.random() * responses.length)];
//       addMessage('ai', randomResponse);
//       setTimeout(() => {
//         setIsAISpeaking(false);
//       }, 2000);
//     }, 2000);
//   };

//   const handleMCQAnswer = (selectedOption: string) => {
//     const isCorrect = sampleQuestion.options.find(opt => opt.id === selectedOption)?.isCorrect;
    
//     toast({
//       title: isCorrect ? "Correct Answer!" : "Incorrect Answer",
//       description: `You selected option ${selectedOption.toUpperCase()}. ${isCorrect ? "Well done!" : "Let's review this later."}`,
//       variant: isCorrect ? "default" : "destructive"
//     });
    
//     setTimeout(() => {
//       setActiveTab("coding");
//       toast({
//         title: "Coding Challenge",
//         description: "Great! Now let's test your coding skills with a practical problem."
//       });
//     }, 2000);
//   };

//   const handleCodeRun = async (code: string): Promise<TestCase[]> => {
//     // Simulate API call to run code
//     return new Promise(resolve => {
//       setTimeout(() => {
//         const sampleTestCases: TestCase[] = [
//           { input: "sum(2, 3)", expected: "5", actual: "5", passed: true },
//           { input: "sum(-1, 1)", expected: "0", actual: "0", passed: true },
//           { input: "sum(0, 0)", expected: "0", actual: "0", passed: true },
//           { input: "sum(10, 20)", expected: "30", actual: "25", passed: false },
//         ];
//         resolve(sampleTestCases);
//       }, 1500);
//     });
//   };

//   const handleCodeSubmit = async (code: string): Promise<boolean> => {
//     // Simulate API call to submit code
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(true);
//       }, 1000);
//     });
//   };

//   const handleStageComplete = () => {
//     if (currentStep < interviewSteps.length - 1) {
//       setCurrentStep(prev => prev + 1);
//       toast({
//         title: "Stage Completed",
//         description: `Moving to ${interviewSteps[currentStep + 1]?.title || "final stage"}...`
//       });
//     } else {
//       handleFinishInterview();
//     }
//   };

//   const handleFinishInterview = () => {
//     setInterviewCompleted(true);
//     toast({
//       title: "Interview Finished",
//       description: "Thank you for participating! Your responses have been recorded."
//     });
//   };

//   const getCurrentStageContent = () => {
//     if (interviewCompleted) {
//       return (
//         <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
//           <CheckCircle2 className="h-16 w-16 text-green-500" />
//           <h2 className="text-2xl font-bold">Interview Completed</h2>
//           <p className="text-muted-foreground">
//             Thank you for completing the interview. Your results will be reviewed and you'll hear back soon.
//           </p>
//           <Button onClick={() => window.location.reload()}>
//             Start New Interview
//           </Button>
//         </div>
//       );
//     }

//     switch (currentStep) {
//       case 0:
//         return <IntroductionStage onComplete={handleStageComplete} />;
//       case 1:
//         return <TechnicalStage onComplete={handleStageComplete} />;
//       case 2:
//         return (
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsContent value="interview" className="space-y-6">
//               <AIInterviewer 
//                 messages={messages} 
//                 isAISpeaking={isAISpeaking} 
//                 isProcessing={isProcessing}
//                 onNewMessage={(message) => {
//                   addMessage('user', message);
//                   handleAIResponse();
//                 }}
//               />
//             </TabsContent>
//             <TabsContent value="mcq" className="space-y-6">
//               <MCQQuestion 
//                 question={sampleQuestion.question} 
//                 options={sampleQuestion.options} 
//                 timeLimit={120} 
//                 onAnswer={handleMCQAnswer} 
//                 onTimeUp={() => setActiveTab("coding")}
//               />
//             </TabsContent>
//             <TabsContent value="coding" className="space-y-6">
//               <CodeEditor 
//                 problem="Implement a function that finds the maximum sum of a contiguous subarray (Kadane's Algorithm). The function should handle both positive and negative numbers efficiently." 
//                 initialCode="// Kadane's Algorithm - Maximum Subarray Sum\nfunction maxSubarraySum(nums) {\n  // Your implementation here\n  let maxSum = nums[0];\n  let currentSum = nums[0];\n  \n  // Complete the implementation\n  \n  return maxSum;\n}" 
//                 language="javascript" 
//                 onCodeChange={code => console.log('Code changed:', code)} 
//                 onRun={handleCodeRun} 
//                 onSubmit={async (code) => {
//                   await handleCodeSubmit(code);
//                   handleStageComplete();
//                 }} 
//               />
//             </TabsContent>
//           </Tabs>
//         );
//       case 3:
//         return <BehavioralStage onComplete={handleStageComplete} />;
//       case 4:
//         return <WrapUpStage onFinish={handleFinishInterview} />;
//       default:
//         return <IntroductionStage onComplete={handleStageComplete} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background p-4 md:p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between animate-fade-in">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
//               AI Interview Platform
//             </h1>
//             <p className="text-muted-foreground mt-1">
//               Professional technical interview with AI-powered assessment
//             </p>
//           </div>
          
//           <div className="flex items-center gap-4">
//             <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
//               <Calendar className="h-4 w-4" />
//               <span>{new Date().toLocaleDateString()}</span>
//             </div>
//             <Button variant="outline" size="sm">
//               <Settings className="h-4 w-4 mr-2" />
//               Settings
//             </Button>
//             <AlertDialog>
//               <AlertDialogTrigger asChild>
//                 <Button variant="destructive" size="sm">
//                   <LogOut className="h-4 w-4 mr-2" />
//                   Finish Interview
//                 </Button>
//               </AlertDialogTrigger>
//               <AlertDialogContent>
//                 <AlertDialogHeader>
//                   <AlertDialogTitle>Finish Interview</AlertDialogTitle>
//                   <AlertDialogDescription>
//                     Are you sure you want to submit the interview? After submitting, you cannot continue the same interview again. All your responses will be finalized and sent for evaluation.
//                   </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                   <AlertDialogCancel>Cancel</AlertDialogCancel>
//                   <AlertDialogAction onClick={handleFinishInterview}>
//                     Yes, Finish Interview
//                   </AlertDialogAction>
//                 </AlertDialogFooter>
//               </AlertDialogContent>
//             </AlertDialog>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Left Sidebar - Progress */}
//           <div className="lg:col-span-1">
//             <InterviewProgress 
//               steps={interviewSteps} 
//               currentStep={currentStep} 
//               totalTime={3600} 
//               elapsedTime={elapsedTime} 
//             />
//           </div>

//           {/* Main Interview Area */}
//           <div className="lg:col-span-3 space-y-6">
//             {/* Voice Controls */}
//             <VoiceControls 
//               isListening={isListening} 
//               onToggleListening={handleToggleListening} 
//               onToggleMute={() => setIsMuted(!isMuted)} 
//               isMuted={isMuted} 
//             />

//             {/* Speaking Status */}
//             <SpeakingStatus 
//               isAISpeaking={isAISpeaking} 
//               isUserSpeaking={isListening} 
//             />

//             {/* Dynamic Interview Content */}
//             {getCurrentStageContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



























// import { useState, useEffect } from "react";
// import { Settings, Calendar, UserCheck, Code2, MessageSquare, LogOut, CheckCircle2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import { useToast } from "@/hooks/use-toast";
// import { VoiceControls } from "./VoiceControls";
// import { AIInterviewer } from "./AIInterviewer";
// import { MCQQuestion } from "./MCQQuestion";
// import { CodeEditor } from "./CodeEditor";
// import { InterviewProgress } from "./InterviewProgress";
// import { SpeakingStatus } from "./SpeakingStatus";
// import { IntroductionStage } from "./stages/IntroductionStage";
// import { TechnicalStage } from "./stages/TechnicalStage";
// import { BehavioralStage } from "./stages/BehavioralStage";
// import { WrapUpStage } from "./stages/WrapUpStage";

// interface Message {
//   id: string;
//   type: 'ai' | 'user';
//   content: string;
//   timestamp: Date;
// }

// // Add TestCase interface at the top level
// interface TestCase {
//   input: string;
//   expected: string;
//   actual?: string;
//   passed?: boolean;
// }

// export const InterviewPlatform = () => {
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState("interview");
//   const [isListening, setIsListening] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isAISpeaking, setIsAISpeaking] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [interviewCompleted, setInterviewCompleted] = useState(false);

//   // Interview steps with dynamic state
//   const getInterviewSteps = () => [
//     {
//       id: '1',
//       type: 'introduction',
//       title: 'Introduction & Background',
//       completed: currentStep > 0,
//       current: currentStep === 0
//     },
//     {
//       id: '2',
//       type: 'technical',
//       title: 'Technical Questions',
//       completed: currentStep > 1,
//       current: currentStep === 1
//     },
//     {
//       id: '3',
//       type: 'coding',
//       title: 'Coding Challenge',
//       completed: currentStep > 2,
//       current: currentStep === 2
//     },
//     {
//       id: '4',
//       type: 'behavioral',
//       title: 'Behavioral Questions',
//       completed: currentStep > 3,
//       current: currentStep === 3
//     },
//     {
//       id: '5',
//       type: 'conclusion',
//       title: 'Wrap-up & Next Steps',
//       completed: currentStep > 4,
//       current: currentStep === 4
//     }
//   ];

//   const interviewSteps = getInterviewSteps();

//   // Sample MCQ question
//   const sampleQuestion = {
//     question: "What is the time complexity of binary search algorithm?",
//     options: [
//       { id: 'a', text: 'O(n)', isCorrect: false },
//       { id: 'b', text: 'O(log n)', isCorrect: true },
//       { id: 'c', text: 'O(n²)', isCorrect: false },
//       { id: 'd', text: 'O(1)', isCorrect: false }
//     ]
//   };

//   // Timer effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setElapsedTime(prev => prev + 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Simulate AI responses
//   useEffect(() => {
//     if (messages.length === 0) {
//       // Initial AI greeting
//       setTimeout(() => {
//         addMessage('ai', "Hello! I'm your AI interviewer today. I'm excited to learn more about you and your technical skills. Let's start with a brief introduction - could you tell me about yourself and your background in software development?");
//       }, 1000);
//     }
//   }, []);

//   const addMessage = (type: 'ai' | 'user', content: string) => {
//     const newMessage: Message = {
//       id: Date.now().toString(),
//       type,
//       content,
//       timestamp: new Date()
//     };
//     setMessages(prev => [...prev, newMessage]);
//   };

//   const handleToggleListening = () => {
//     setIsListening(!isListening);
//     if (!isListening) {
//       // Simulate user speaking
//       setTimeout(() => {
//         addMessage('user', "Thank you for having me! I'm a full-stack developer with 3 years of experience working primarily with React, Node.js, and Python. I'm passionate about creating efficient, scalable applications and I'm always eager to learn new technologies.");
//         setIsListening(false);
//         handleAIResponse();
//       }, 3000);
//     }
//   };

//   const handleAIResponse = () => {
//     setIsProcessing(true);
//     setTimeout(() => {
//       setIsProcessing(false);
//       setIsAISpeaking(true);
//       const responses = [
//         "That's great! Your background sounds solid. Now, let's dive into some technical questions. I'd like to understand your problem-solving approach better.",
//         "Excellent! I can see you have good experience. Let's move on to evaluate your technical knowledge with some questions.",
//         "Perfect! Your experience with React and Node.js is valuable. Now I'd like to test your understanding of fundamental concepts."
//       ];
//       const randomResponse = responses[Math.floor(Math.random() * responses.length)];
//       addMessage('ai', randomResponse);
//       setTimeout(() => {
//         setIsAISpeaking(false);
//       }, 2000);
//     }, 2000);
//   };

//   const handleMCQAnswer = (selectedOption: string) => {
//     const isCorrect = sampleQuestion.options.find(opt => opt.id === selectedOption)?.isCorrect;
    
//     toast({
//       title: isCorrect ? "Correct Answer!" : "Incorrect Answer",
//       description: `You selected option ${selectedOption.toUpperCase()}. ${isCorrect ? "Well done!" : "Let's review this later."}`,
//       variant: isCorrect ? "default" : "destructive"
//     });
    
//     setTimeout(() => {
//       setActiveTab("coding");
//       toast({
//         title: "Coding Challenge",
//         description: "Great! Now let's test your coding skills with a practical problem."
//       });
//     }, 2000);
//   };

//   const handleCodeRun = async (code: string): Promise<TestCase[]> => {
//     // Simulate API call to run code
//     return new Promise(resolve => {
//       setTimeout(() => {
//         const sampleTestCases: TestCase[] = [
//           { input: "sum(2, 3)", expected: "5", actual: "5", passed: true },
//           { input: "sum(-1, 1)", expected: "0", actual: "0", passed: true },
//           { input: "sum(0, 0)", expected: "0", actual: "0", passed: true },
//           { input: "sum(10, 20)", expected: "30", actual: "25", passed: false },
//         ];
//         resolve(sampleTestCases);
//       }, 1500);
//     });
//   };

//   const handleCodeSubmit = async (code: string): Promise<boolean> => {
//     // Simulate API call to submit code
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(true);
//       }, 1000);
//     });
//   };

//   const handleStageComplete = () => {
//     if (currentStep < interviewSteps.length - 1) {
//       setCurrentStep(prev => prev + 1);
//       toast({
//         title: "Stage Completed",
//         description: `Moving to ${interviewSteps[currentStep + 1]?.title || "final stage"}...`
//       });
//     } else {
//       handleFinishInterview();
//     }
//   };

//   const handleFinishInterview = () => {
//     setInterviewCompleted(true);
//     toast({
//       title: "Interview Finished",
//       description: "Thank you for participating! Your responses have been recorded."
//     });
//   };

//   const getCurrentStageContent = () => {
//     if (interviewCompleted) {
//       return (
//         <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
//           <CheckCircle2 className="h-16 w-16 text-green-500" />
//           <h2 className="text-2xl font-bold">Interview Completed</h2>
//           <p className="text-muted-foreground">
//             Thank you for completing the interview. Your results will be reviewed and you'll hear back soon.
//           </p>
//           <Button onClick={() => window.location.reload()}>
//             Start New Interview
//           </Button>
//         </div>
//       );
//     }

//     switch (currentStep) {
//       case 0:
//         return <IntroductionStage onComplete={handleStageComplete} />;
//       case 1:
//         return <TechnicalStage onComplete={handleStageComplete} />;
//       case 2:
//         return (
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsContent value="interview" className="space-y-6">
//               <AIInterviewer 
//                 messages={messages} 
//                 isAISpeaking={isAISpeaking} 
//                 isProcessing={isProcessing}
//                 onNewMessage={(message) => {
//                   addMessage('user', message);
//                   handleAIResponse();
//                 }}
//               />
//             </TabsContent>
//             <TabsContent value="mcq" className="space-y-6">
//               <MCQQuestion 
//                 question={sampleQuestion.question} 
//                 options={sampleQuestion.options} 
//                 timeLimit={120} 
//                 onAnswer={handleMCQAnswer} 
//                 onTimeUp={() => setActiveTab("coding")}
//               />
//             </TabsContent>
//             <TabsContent value="coding" className="space-y-6">
//               <CodeEditor 
//                 problem="Implement a function that finds the maximum sum of a contiguous subarray (Kadane's Algorithm). The function should handle both positive and negative numbers efficiently." 
//                 initialCode="// Kadane's Algorithm - Maximum Subarray Sum\nfunction maxSubarraySum(nums) {\n  // Your implementation here\n  let maxSum = nums[0];\n  let currentSum = nums[0];\n  \n  // Complete the implementation\n  \n  return maxSum;\n}" 
//                 language="javascript" 
//                 onCodeChange={code => console.log('Code changed:', code)} 
//                 onRun={handleCodeRun} 
//                 onSubmit={async (code) => {
//                   const result = await handleCodeSubmit(code);
//                   if (result) {
//                     handleStageComplete();
//                   }
//                   return result;
//                 }} 
//               />
//             </TabsContent>
//           </Tabs>
//         );
//       case 3:
//         return <BehavioralStage onComplete={handleStageComplete} />;
//       case 4:
//         return <WrapUpStage onFinish={handleFinishInterview} />;
//       default:
//         return <IntroductionStage onComplete={handleStageComplete} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background p-4 md:p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between animate-fade-in">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
//               AI Interview Platform
//             </h1>
//             <p className="text-muted-foreground mt-1">
//               Professional technical interview with AI-powered assessment
//             </p>
//           </div>
          
//           <div className="flex items-center gap-4">
//             <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
//               <Calendar className="h-4 w-4" />
//               <span>{new Date().toLocaleDateString()}</span>
//             </div>
//             <Button variant="outline" size="sm">
//               <Settings className="h-4 w-4 mr-2" />
//               Settings
//             </Button>
//             <AlertDialog>
//               <AlertDialogTrigger asChild>
//                 <Button variant="destructive" size="sm">
//                   <LogOut className="h-4 w-4 mr-2" />
//                   Finish Interview
//                 </Button>
//               </AlertDialogTrigger>
//               <AlertDialogContent>
//                 <AlertDialogHeader>
//                   <AlertDialogTitle>Finish Interview</AlertDialogTitle>
//                   <AlertDialogDescription>
//                     Are you sure you want to submit the interview? After submitting, you cannot continue the same interview again. All your responses will be finalized and sent for evaluation.
//                   </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                   <AlertDialogCancel>Cancel</AlertDialogCancel>
//                   <AlertDialogAction onClick={handleFinishInterview}>
//                     Yes, Finish Interview
//                   </AlertDialogAction>
//                 </AlertDialogFooter>
//               </AlertDialogContent>
//             </AlertDialog>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Left Sidebar - Progress */}
//           <div className="lg:col-span-1">
//             <InterviewProgress 
//               steps={interviewSteps} 
//               currentStep={currentStep} 
//               totalTime={3600} 
//               elapsedTime={elapsedTime} 
//             />
//           </div>

//           {/* Main Interview Area */}
//           <div className="lg:col-span-3 space-y-6">
//             {/* Voice Controls */}
//             <VoiceControls 
//               isListening={isListening} 
//               onToggleListening={handleToggleListening} 
//               onToggleMute={() => setIsMuted(!isMuted)} 
//               isMuted={isMuted} 
//             />

//             {/* Speaking Status */}
//             <SpeakingStatus 
//               isAISpeaking={isAISpeaking} 
//               isUserSpeaking={isListening} 
//             />

//             {/* Dynamic Interview Content */}
//             {getCurrentStageContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



















// import { useState, useEffect } from "react";
// import { Settings, Calendar, UserCheck, Code2, MessageSquare, LogOut, CheckCircle2, Terminal } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import { useToast } from "@/hooks/use-toast";
// import { VoiceControls } from "./VoiceControls";
// import { AIInterviewer } from "./AIInterviewer";
// import { MCQQuestion } from "./MCQQuestion";
// import { CodeEditor } from "./CodeEditor";
// import { InterviewProgress } from "./InterviewProgress";
// import { SpeakingStatus } from "./SpeakingStatus";
// import { IntroductionStage } from "./stages/IntroductionStage";
// import { TechnicalStage } from "./stages/TechnicalStage";
// import { BehavioralStage } from "./stages/BehavioralStage";
// import { WrapUpStage } from "./stages/WrapUpStage";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// interface Message {
//   id: string;
//   type: 'ai' | 'user';
//   content: string;
//   timestamp: Date;
// }

// interface TestCase {
//   input: string;
//   expected: string;
//   actual?: string;
//   passed?: boolean;
// }

// export const InterviewPlatform = () => {
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState("coding"); // Set default to "coding"
//   const [isListening, setIsListening] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isAISpeaking, setIsAISpeaking] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [currentStep, setCurrentStep] = useState(2); // Set default to coding stage (index 2)
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [interviewCompleted, setInterviewCompleted] = useState(false);

//   // Interview steps with dynamic state
//   const getInterviewSteps = () => [
//     {
//       id: '1',
//       type: 'introduction',
//       title: 'Introduction & Background',
//       completed: currentStep > 0,
//       current: currentStep === 0
//     },
//     {
//       id: '2',
//       type: 'technical',
//       title: 'Technical Questions',
//       completed: currentStep > 1,
//       current: currentStep === 1
//     },
//     {
//       id: '3',
//       type: 'coding',
//       title: 'Coding Challenge',
//       completed: currentStep > 2,
//       current: currentStep === 2
//     },
//     {
//       id: '4',
//       type: 'behavioral',
//       title: 'Behavioral Questions',
//       completed: currentStep > 3,
//       current: currentStep === 3
//     },
//     {
//       id: '5',
//       type: 'conclusion',
//       title: 'Wrap-up & Next Steps',
//       completed: currentStep > 4,
//       current: currentStep === 4
//     }
//   ];

//   const interviewSteps = getInterviewSteps();

//   // Sample MCQ question
//   const sampleQuestion = {
//     question: "What is the time complexity of binary search algorithm?",
//     options: [
//       { id: 'a', text: 'O(n)', isCorrect: false },
//       { id: 'b', text: 'O(log n)', isCorrect: true },
//       { id: 'c', text: 'O(n²)', isCorrect: false },
//       { id: 'd', text: 'O(1)', isCorrect: false }
//     ]
//   };

//   // Timer effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setElapsedTime(prev => prev + 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const addMessage = (type: 'ai' | 'user', content: string) => {
//     const newMessage: Message = {
//       id: Date.now().toString(),
//       type,
//       content,
//       timestamp: new Date()
//     };
//     setMessages(prev => [...prev, newMessage]);
//   };

//   const handleToggleListening = () => {
//     setIsListening(!isListening);
//   };

//   const handleAIResponse = () => {
//     setIsProcessing(true);
//     setTimeout(() => {
//       setIsProcessing(false);
//       setIsAISpeaking(true);
//       setTimeout(() => {
//         setIsAISpeaking(false);
//       }, 2000);
//     }, 2000);
//   };

//   const handleMCQAnswer = (selectedOption: string) => {
//     const isCorrect = sampleQuestion.options.find(opt => opt.id === selectedOption)?.isCorrect;
//     toast({
//       title: isCorrect ? "Correct Answer!" : "Incorrect Answer",
//       description: `You selected option ${selectedOption.toUpperCase()}. ${isCorrect ? "Well done!" : "Let's review this later."}`,
//       variant: isCorrect ? "default" : "destructive"
//     });
//   };

//   const handleCodeRun = async (code: string): Promise<TestCase[]> => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         const sampleTestCases: TestCase[] = [
//           { input: "sum(2, 3)", expected: "5", actual: "5", passed: true },
//           { input: "sum(-1, 1)", expected: "0", actual: "0", passed: true },
//           { input: "sum(0, 0)", expected: "0", actual: "0", passed: true },
//           { input: "sum(10, 20)", expected: "30", actual: "25", passed: false },
//         ];
//         resolve(sampleTestCases);
//       }, 1500);
//     });
//   };

//   const handleCodeSubmit = async (code: string): Promise<boolean> => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(true);
//       }, 1000);
//     });
//   };

//   const handleStageComplete = () => {
//     if (currentStep < interviewSteps.length - 1) {
//       setCurrentStep(prev => prev + 1);
//     } else {
//       handleFinishInterview();
//     }
//   };

//   const handleFinishInterview = () => {
//     setInterviewCompleted(true);
//     toast({
//       title: "Interview Finished",
//       description: "Thank you for participating! Your responses have been recorded."
//     });
//   };

//   // Function to directly navigate to coding challenge
//   const goToCodingChallenge = () => {
//     setCurrentStep(2); // Coding challenge is at index 2
//     setActiveTab("coding");
//   };

//   const getCurrentStageContent = () => {
//     if (interviewCompleted) {
//       return (
//         <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
//           <CheckCircle2 className="h-16 w-16 text-green-500" />
//           <h2 className="text-2xl font-bold">Interview Completed</h2>
//           <p className="text-muted-foreground">
//             Thank you for completing the interview. Your results will be reviewed and you'll hear back soon.
//           </p>
//           <Button onClick={() => window.location.reload()}>
//             Start New Interview
//           </Button>
//         </div>
//       );
//     }

//     switch (currentStep) {
//       case 0:
//         return <IntroductionStage onComplete={handleStageComplete} />;
//       case 1:
//         return <TechnicalStage onComplete={handleStageComplete} />;
//       case 2:
//         return (
//           <div className="space-y-6">
//             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//               <TabsList className="grid w-full max-w-md grid-cols-2">
//                 <TabsTrigger value="problem" className="flex items-center gap-2">
//                   <Code2 className="h-4 w-4" />
//                   Problem
//                 </TabsTrigger>
//                 <TabsTrigger value="coding" className="flex items-center gap-2">
//                   <Terminal className="h-4 w-4" />
//                   Code Editor
//                 </TabsTrigger>
//               </TabsList>
              
//               <TabsContent value="problem" className="mt-4">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Coding Challenge</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="mb-4">Implement Kadane's Algorithm to find the maximum subarray sum.</p>
//                     <Button onClick={() => setActiveTab("coding")}>
//                       Start Coding
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
              
//               <TabsContent value="coding" className="mt-0">
//                 <CodeEditor 
//                   problem="Implement a function that finds the maximum sum of a contiguous subarray (Kadane's Algorithm). The function should handle both positive and negative numbers efficiently." 
//                   initialCode="function maxSubarraySum(nums) {\n  // Your implementation here\n}" 
//                   language="javascript" 
//                   onCodeChange={console.log} 
//                   onRun={handleCodeRun} 
//                   onSubmit={handleCodeSubmit}
//                 />
//               </TabsContent>
//             </Tabs>
//           </div>
//         );
//       case 3:
//         return <BehavioralStage onComplete={handleStageComplete} />;
//       case 4:
//         return <WrapUpStage onFinish={handleFinishInterview} />;
//       default:
//         return <IntroductionStage onComplete={handleStageComplete} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background p-4 md:p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header and other components remain the same */}
        
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Interview Progress - Make steps clickable */}
//           <div className="lg:col-span-1">
//             <InterviewProgress 
//               steps={interviewSteps} 
//               currentStep={currentStep} 
//               totalTime={3600} 
//               elapsedTime={elapsedTime} 
//               onStepClick={(stepIndex) => {
//                 setCurrentStep(stepIndex);
//                 if (stepIndex === 2) setActiveTab("coding");
//               }}
//             />
//           </div>

//           {/* Main Interview Area */}
//           <div className="lg:col-span-3 space-y-6">
//             {/* Other components */}
//             {getCurrentStageContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// // Merged 1
// import { useState, useEffect, useRef } from "react";
// import { Settings, Calendar, UserCheck, Code2, MessageSquare, LogOut, CheckCircle2, Terminal, Mic, MicOff } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import { useToast } from "@/hooks/use-toast";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { VoiceControls } from "./VoiceControls";
// import { AIInterviewer } from "./AIInterviewer";
// import { MCQQuestion } from "./MCQQuestion";
// import { CodeEditor } from "./CodeEditor";
// import { InterviewProgress } from "./InterviewProgress";
// import { SpeakingStatus } from "./SpeakingStatus";
// import { IntroductionStage } from "./stages/IntroductionStage";
// import { TechnicalStage } from "./stages/TechnicalStage";
// import { BehavioralStage } from "./stages/BehavioralStage";
// import { WrapUpStage } from "./stages/WrapUpStage";

// interface Message {
//   id: string;
//   type: 'ai' | 'user';
//   content: string;
//   timestamp: Date;
// }

// interface TestCase {
//   input: string;
//   expected: string;
//   actual?: string;
//   passed?: boolean;
// }

// interface InterviewStep {
//   id: string;
//   type: string;
//   title: string;
//   completed: boolean;
//   current: boolean;
// }

// export const InterviewPlatform = () => {
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState("interview");
//   const [isListening, setIsListening] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isAISpeaking, setIsAISpeaking] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [interviewCompleted, setInterviewCompleted] = useState(false);
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [userTranscript, setUserTranscript] = useState("");
//   const recognitionRef = useRef<any>(null);

//   // Interview questions (would normally come from API)
//   const interviewQuestions = {
//     introduction: [
//       "Tell me about yourself and your background in software development.",
//       "What interests you about this position?",
//       "Walk me through your resume and highlight relevant experience."
//     ],
//     technical: [
//       "Explain the difference between let, const, and var in JavaScript.",
//       "What is the virtual DOM in React and how does it work?",
//       "How would you optimize a slow-loading web application?"
//     ],
//     behavioral: [
//       "Tell me about a time you faced a difficult technical challenge and how you overcame it.",
//       "Describe a situation where you had to work with a difficult team member.",
//       "Give an example of how you've handled tight deadlines in the past."
//     ]
//   };

//   // Interview steps with dynamic state
//   const interviewSteps: InterviewStep[] = [
//     {
//       id: '1',
//       type: 'introduction',
//       title: 'Introduction & Background',
//       completed: currentStep > 0,
//       current: currentStep === 0
//     },
//     {
//       id: '2',
//       type: 'technical',
//       title: 'Technical Questions',
//       completed: currentStep > 1,
//       current: currentStep === 1
//     },
//     {
//       id: '3',
//       type: 'coding',
//       title: 'Coding Challenge',
//       completed: currentStep > 2,
//       current: currentStep === 2
//     },
//     {
//       id: '4',
//       type: 'behavioral',
//       title: 'Behavioral Questions',
//       completed: currentStep > 3,
//       current: currentStep === 3
//     },
//     {
//       id: '5',
//       type: 'conclusion',
//       title: 'Wrap-up & Next Steps',
//       completed: currentStep > 4,
//       current: currentStep === 4
//     }
//   ];

//   // Sample MCQ question
//   const sampleQuestion = {
//     question: "What is the time complexity of binary search algorithm?",
//     options: [
//       { id: 'a', text: 'O(n)', isCorrect: false },
//       { id: 'b', text: 'O(log n)', isCorrect: true },
//       { id: 'c', text: 'O(n²)', isCorrect: false },
//       { id: 'd', text: 'O(1)', isCorrect: false }
//     ]
//   };

//   // Initialize speech recognition
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         recognitionRef.current = new SpeechRecognition();
//         recognitionRef.current.continuous = true;
//         recognitionRef.current.interimResults = true;
        
//         recognitionRef.current.onresult = (event: any) => {
//           let interimTranscript = '';
//           let finalTranscript = '';
          
//           for (let i = event.resultIndex; i < event.results.length; i++) {
//             const transcript = event.results[i][0].transcript;
//             if (event.results[i].isFinal) {
//               finalTranscript += transcript;
//             } else {
//               interimTranscript += transcript;
//             }
//           }
          
//           setUserTranscript(finalTranscript || interimTranscript);
//         };
        
//         recognitionRef.current.onerror = (event: any) => {
//           console.error('Speech recognition error', event.error);
//           setIsListening(false);
//         };
//       }
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };
//   }, []);

//   // Timer effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setElapsedTime(prev => prev + 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Auto-start listening when AI finishes speaking
//   useEffect(() => {
//     if (!isAISpeaking && !isProcessing && currentStep !== 2 && !interviewCompleted) {
//       startListening();
//     }
//   }, [isAISpeaking, isProcessing, currentStep, interviewCompleted]);

//   // Auto-stop listening after 30 seconds of inactivity
//   useEffect(() => {
//     let timeout: NodeJS.Timeout;
//     if (isListening && userTranscript) {
//       timeout = setTimeout(() => {
//         stopListening();
//         processUserResponse(userTranscript);
//       }, 30000); // 30 seconds timeout
//     }
//     return () => clearTimeout(timeout);
//   }, [isListening, userTranscript]);

//   // Initial AI greeting
//   useEffect(() => {
//     if (messages.length === 0) {
//       setTimeout(() => {
//         askQuestion(currentStep, questionIndex);
//       }, 1000);
//     }
//   }, []);

//   const startListening = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.start();
//       setIsListening(true);
//       setUserTranscript("");
//     }
//   };

//   const stopListening = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     }
//   };

//   const toggleListening = () => {
//     if (isListening) {
//       stopListening();
//     } else {
//       startListening();
//     }
//   };

//   const toggleMute = () => {
//     setIsMuted(!isMuted);
//   };

//   const addMessage = (type: 'ai' | 'user', content: string) => {
//     const newMessage: Message = {
//       id: Date.now().toString(),
//       type,
//       content,
//       timestamp: new Date()
//     };
//     setMessages(prev => [...prev, newMessage]);
//   };

//   const askQuestion = (step: number, index: number) => {
//     setIsProcessing(true);
//     setIsAISpeaking(true);
    
//     let question = "";
//     switch (step) {
//       case 0:
//         question = interviewQuestions.introduction[index] || "Tell me about yourself.";
//         break;
//       case 1:
//         question = interviewQuestions.technical[index] || "Explain a technical concept you're familiar with.";
//         break;
//       case 3:
//         question = interviewQuestions.behavioral[index] || "Describe a challenging work situation you faced.";
//         break;
//       default:
//         question = "Please proceed to the next section.";
//     }
    
//     addMessage('ai', question);
    
//     setTimeout(() => {
//       setIsProcessing(false);
//       setTimeout(() => {
//         setIsAISpeaking(false);
//       }, 2000);
//     }, 1500);
//   };

//   const processUserResponse = (response: string) => {
//     if (response.trim()) {
//       addMessage('user', response);
      
//       // Evaluate response (in a real app, this would call an API)
//       setIsProcessing(true);
//       setTimeout(() => {
//         setIsProcessing(false);
        
//         // Move to next question or stage
//         if (questionIndex < 2) {
//           setQuestionIndex(prev => prev + 1);
//           askQuestion(currentStep, questionIndex + 1);
//         } else {
//           handleStageComplete();
//         }
//       }, 2000);
//     }
//   };

//   const handleMCQAnswer = (selectedOption: string) => {
//     const isCorrect = sampleQuestion.options.find(opt => opt.id === selectedOption)?.isCorrect;
    
//     toast({
//       title: isCorrect ? "Correct Answer!" : "Incorrect Answer",
//       description: `You selected option ${selectedOption.toUpperCase()}. ${isCorrect ? "Well done!" : "Let's review this later."}`,
//       variant: isCorrect ? "default" : "destructive"
//     });
    
//     setTimeout(() => {
//       setActiveTab("coding");
//       toast({
//         title: "Coding Challenge",
//         description: "Great! Now let's test your coding skills with a practical problem."
//       });
//     }, 2000);
//   };

//   const handleCodeRun = async (code: string): Promise<TestCase[]> => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         const sampleTestCases: TestCase[] = [
//           { input: "sum(2, 3)", expected: "5", actual: "5", passed: true },
//           { input: "sum(-1, 1)", expected: "0", actual: "0", passed: true },
//           { input: "sum(0, 0)", expected: "0", actual: "0", passed: true },
//           { input: "sum(10, 20)", expected: "30", actual: "25", passed: false },
//         ];
//         resolve(sampleTestCases);
//       }, 1500);
//     });
//   };

//   const handleCodeSubmit = async (code: string): Promise<boolean> => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(true);
//       }, 1000);
//     });
//   };

//   const handleStageComplete = () => {
//     if (currentStep < interviewSteps.length - 1) {
//       setCurrentStep(prev => prev + 1);
//       setQuestionIndex(0);
      
//       if (currentStep + 1 === 2) { // Coding stage
//         setActiveTab("coding");
//       } else if (currentStep + 1 === 3) { // Behavioral stage
//         askQuestion(currentStep + 1, 0);
//       }
      
//       toast({
//         title: "Stage Completed",
//         description: `Moving to ${interviewSteps[currentStep + 1]?.title || "final stage"}...`
//       });
//     } else {
//       handleFinishInterview();
//     }
//   };

//   const handleFinishInterview = () => {
//     setInterviewCompleted(true);
//     stopListening();
//     toast({
//       title: "Interview Finished",
//       description: "Thank you for participating! Your responses have been recorded."
//     });
//   };

//   const getCurrentStageContent = () => {
//     if (interviewCompleted) {
//       return (
//         <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
//           <CheckCircle2 className="h-16 w-16 text-green-500" />
//           <h2 className="text-2xl font-bold">Interview Completed</h2>
//           <p className="text-muted-foreground">
//             Thank you for completing the interview. Your results will be reviewed and you'll hear back soon.
//           </p>
//           <Button onClick={() => window.location.reload()}>
//             Start New Interview
//           </Button>
//         </div>
//       );
//     }

//     switch (currentStep) {
//       case 0:
//         return <IntroductionStage onComplete={handleStageComplete} />;
//       case 1:
//         return <TechnicalStage onComplete={handleStageComplete} />;
//       case 2:
//         return (
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsList className="grid w-full max-w-md grid-cols-2">
//               <TabsTrigger value="problem" className="flex items-center gap-2">
//                 <Code2 className="h-4 w-4" />
//                 Problem
//               </TabsTrigger>
//               <TabsTrigger value="coding" className="flex items-center gap-2">
//                 <Terminal className="h-4 w-4" />
//                 Code Editor
//               </TabsTrigger>
//             </TabsList>
            
//             <TabsContent value="problem" className="mt-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Coding Challenge</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="mb-4">Implement Kadane's Algorithm to find the maximum subarray sum.</p>
//                   <Button onClick={() => setActiveTab("coding")}>
//                     Start Coding
//                   </Button>
//                 </CardContent>
//               </Card>
//             </TabsContent>
            
//             <TabsContent value="coding" className="mt-0">
//               <CodeEditor 
//                 problem="Implement a function that finds the maximum sum of a contiguous subarray (Kadane's Algorithm). The function should handle both positive and negative numbers efficiently." 
//                 initialCode="function maxSubarraySum(nums) {\n  // Your implementation here\n}" 
//                 language="javascript" 
//                 onCodeChange={console.log} 
//                 onRun={handleCodeRun} 
//                 onSubmit={async (code) => {
//                   const result = await handleCodeSubmit(code);
//                   if (result) {
//                     handleStageComplete();
//                   }
//                   return result;
//                 }}
//               />
//             </TabsContent>
//           </Tabs>
//         );
//       case 3:
//         return <BehavioralStage onComplete={handleStageComplete} />;
//       case 4:
//         return <WrapUpStage onFinish={handleFinishInterview} />;
//       default:
//         return <IntroductionStage onComplete={handleStageComplete} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background p-4 md:p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between animate-fade-in">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
//               AI Interview Platform
//             </h1>
//             <p className="text-muted-foreground mt-1">
//               Professional technical interview with AI-powered assessment
//             </p>
//           </div>
          
//           <div className="flex items-center gap-4">
//             <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
//               <Calendar className="h-4 w-4" />
//               <span>{new Date().toLocaleDateString()}</span>
//             </div>
//             <Button variant="outline" size="sm">
//               <Settings className="h-4 w-4 mr-2" />
//               Settings
//             </Button>
//             <AlertDialog>
//               <AlertDialogTrigger asChild>
//                 <Button variant="destructive" size="sm">
//                   <LogOut className="h-4 w-4 mr-2" />
//                   Finish Interview
//                 </Button>
//               </AlertDialogTrigger>
//               <AlertDialogContent>
//                 <AlertDialogHeader>
//                   <AlertDialogTitle>Finish Interview</AlertDialogTitle>
//                   <AlertDialogDescription>
//                     Are you sure you want to submit the interview? After submitting, you cannot continue the same interview again. All your responses will be finalized and sent for evaluation.
//                   </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                   <AlertDialogCancel>Cancel</AlertDialogCancel>
//                   <AlertDialogAction onClick={handleFinishInterview}>
//                     Yes, Finish Interview
//                   </AlertDialogAction>
//                 </AlertDialogFooter>
//               </AlertDialogContent>
//             </AlertDialog>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Left Sidebar - Progress */}
//           <div className="lg:col-span-1">
//             <InterviewProgress 
//               steps={interviewSteps} 
//               currentStep={currentStep} 
//               totalTime={3600} 
//               elapsedTime={elapsedTime} 
//               onStepClick={(stepIndex) => {
//                 if (stepIndex <= currentStep || stepIndex === currentStep + 1) {
//                   setCurrentStep(stepIndex);
//                   if (stepIndex === 2) setActiveTab("coding");
//                   if (stepIndex === 3) askQuestion(3, 0);
//                 }
//               }}
//             />
//           </div>

//           {/* Main Interview Area */}
//           <div className="lg:col-span-3 space-y-6">
//             {/* Voice Controls */}
//             <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
//               <div className="flex items-center gap-4">
//                 <Button 
//                   variant={isListening ? "default" : "outline"} 
//                   size="sm" 
//                   onClick={toggleListening}
//                 >
//                   {isListening ? (
//                     <>
//                       <MicOff className="h-4 w-4 mr-2" />
//                       Stop Listening
//                     </>
//                   ) : (
//                     <>
//                       <Mic className="h-4 w-4 mr-2" />
//                       Start Listening
//                     </>
//                   )}
//                 </Button>
//                 <Button 
//                   variant={isMuted ? "destructive" : "outline"} 
//                   size="sm" 
//                   onClick={toggleMute}
//                 >
//                   {isMuted ? "Unmute AI" : "Mute AI"}
//                 </Button>
//               </div>
//               <SpeakingStatus 
//                 isAISpeaking={isAISpeaking} 
//                 isUserSpeaking={isListening} 
//               />
//             </div>

//             {/* Current transcript */}
//             {isListening && (
//               <div className="p-4 bg-muted/20 rounded-lg border border-muted">
//                 <p className="text-sm text-muted-foreground">You're speaking...</p>
//                 <p className="mt-2">{userTranscript || "Listening for your response..."}</p>
//               </div>
//             )}

//             {/* Dynamic Interview Content */}
//             {getCurrentStageContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// // Merged 2
// import { useState, useEffect, useRef } from "react";
// import { Settings, Calendar, UserCheck, Code2, MessageSquare, LogOut, CheckCircle2, Terminal, Mic, MicOff } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import { useToast } from "@/hooks/use-toast";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useNavigate } from 'react-router-dom';
// import { CodeEditor } from "./CodeEditor";
// import { InterviewProgress } from "./InterviewProgress";
// import { SpeakingStatus } from "./SpeakingStatus";
// import { IntroductionStage } from "./stages/IntroductionStage";
// import { TechnicalStage } from "./stages/TechnicalStage";
// import { BehavioralStage } from "./stages/BehavioralStage";
// import { WrapUpStage } from "./stages/WrapUpStage";

// interface Message {
//   id: string;
//   type: 'ai' | 'user';
//   content: string;
//   timestamp: Date;
// }

// interface TestCase {
//   input: string;
//   expected: string;
//   actual?: string;
//   passed?: boolean;
// }

// interface InterviewStep {
//   id: string;
//   type: string;
//   title: string;
//   completed: boolean;
//   current: boolean;
// }

// interface InterviewResponse {
//   question: string;
//   answer: string;
//   stage: string;
//   timestamp: Date;
// }

// export const InterviewPlatform = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState("interview");
//   const [isListening, setIsListening] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isAISpeaking, setIsAISpeaking] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [interviewCompleted, setInterviewCompleted] = useState(false);
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [userTranscript, setUserTranscript] = useState("");
//   const [responses, setResponses] = useState<InterviewResponse[]>([]);
//   const [showStageChangeConfirm, setShowStageChangeConfirm] = useState(false);
//   const [pendingStep, setPendingStep] = useState<number | null>(null);
//   const recognitionRef = useRef<any>(null);
//   const synthRef = useRef<SpeechSynthesis>(typeof window !== 'undefined' ? window.speechSynthesis : null);
//   const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

//   // Interview questions
//   const interviewQuestions = {
//     introduction: [
//       "Tell me about yourself and your background in software development.",
//       "What interests you about this position?",
//       "Walk me through your resume and highlight relevant experience."
//     ],
//     technical: [
//       "Explain the difference between let, const, and var in JavaScript.",
//       "What is the virtual DOM in React and how does it work?",
//       "How would you optimize a slow-loading web application?"
//     ],
//     behavioral: [
//       "Tell me about a time you faced a difficult technical challenge and how you overcame it.",
//       "Describe a situation where you had to work with a difficult team member.",
//       "Give an example of how you've handled tight deadlines in the past."
//     ]
//   };

//   // Interview steps with dynamic state
//   const interviewSteps: InterviewStep[] = [
//     {
//       id: '1',
//       type: 'introduction',
//       title: 'Introduction & Background',
//       completed: currentStep > 0,
//       current: currentStep === 0
//     },
//     {
//       id: '2',
//       type: 'technical',
//       title: 'Technical Questions',
//       completed: currentStep > 1,
//       current: currentStep === 1
//     },
//     {
//       id: '3',
//       type: 'coding',
//       title: 'Coding Challenge',
//       completed: currentStep > 2,
//       current: currentStep === 2
//     },
//     {
//       id: '4',
//       type: 'behavioral',
//       title: 'Behavioral Questions',
//       completed: currentStep > 3,
//       current: currentStep === 3
//     },
//     {
//       id: '5',
//       type: 'conclusion',
//       title: 'Wrap-up & Next Steps',
//       completed: currentStep > 4,
//       current: currentStep === 4
//     }
//   ];

//   // Sample MCQ question
//   const sampleQuestion = {
//     question: "What is the time complexity of binary search algorithm?",
//     options: [
//       { id: 'a', text: 'O(n)', isCorrect: false },
//       { id: 'b', text: 'O(log n)', isCorrect: true },
//       { id: 'c', text: 'O(n²)', isCorrect: false },
//       { id: 'd', text: 'O(1)', isCorrect: false }
//     ]
//   };

//   // Initialize speech recognition and synthesis
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       // Speech recognition setup
//       const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         recognitionRef.current = new SpeechRecognition();
//         recognitionRef.current.continuous = true;
//         recognitionRef.current.interimResults = true;
        
//         recognitionRef.current.onresult = (event: any) => {
//           let interimTranscript = '';
//           let finalTranscript = '';
          
//           for (let i = event.resultIndex; i < event.results.length; i++) {
//             const transcript = event.results[i][0].transcript;
//             if (event.results[i].isFinal) {
//               finalTranscript += transcript;
//             } else {
//               interimTranscript += transcript;
//             }
//           }
          
//           setUserTranscript(finalTranscript || interimTranscript);
//         };
        
//         recognitionRef.current.onerror = (event: any) => {
//           console.error('Speech recognition error', event.error);
//           setIsListening(false);
//         };

//         recognitionRef.current.onend = () => {
//           if (isListening) {
//             recognitionRef.current.start();
//           }
//         };
//       }

//       // Speech synthesis setup
//       synthRef.current = window.speechSynthesis;
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//       if (utteranceRef.current) {
//         synthRef.current?.cancel();
//       }
//     };
//   }, []);

//   // Timer effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setElapsedTime(prev => prev + 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Auto-start listening when AI finishes speaking
//   useEffect(() => {
//     if (!isAISpeaking && !isProcessing && currentStep !== 2 && !interviewCompleted) {
//       startListening();
//     }
//   }, [isAISpeaking, isProcessing, currentStep, interviewCompleted]);

//   // Auto-stop listening after 30 seconds of inactivity
//   useEffect(() => {
//     let timeout: NodeJS.Timeout;
//     if (isListening && userTranscript) {
//       timeout = setTimeout(() => {
//         stopListening();
//         processUserResponse(userTranscript);
//       }, 30000);
//     }
//     return () => clearTimeout(timeout);
//   }, [isListening, userTranscript]);

//   // Initial AI greeting
//   useEffect(() => {
//     if (messages.length === 0 && !interviewCompleted) {
//       setTimeout(() => {
//         askQuestion(currentStep, questionIndex);
//       }, 1000);
//     }
//   }, []);

//   const speak = (text: string) => {
//     if (isMuted) return;

//     return new Promise<void>((resolve) => {
//       if (synthRef.current && text) {
//         synthRef.current.cancel(); // Cancel any ongoing speech
        
//         utteranceRef.current = new SpeechSynthesisUtterance(text);
//         utteranceRef.current.onend = () => {
//           setIsAISpeaking(false);
//           resolve();
//         };
//         utteranceRef.current.onerror = (event) => {
//           console.error('Speech synthesis error', event);
//           setIsAISpeaking(false);
//           resolve();
//         };
        
//         setIsAISpeaking(true);
//         synthRef.current.speak(utteranceRef.current);
//       } else {
//         resolve();
//       }
//     });
//   };

//   const startListening = () => {
//     if (recognitionRef.current && !isListening) {
//       try {
//         recognitionRef.current.start();
//         setIsListening(true);
//         setUserTranscript("");
//       } catch (e) {
//         console.error('Speech recognition start error:', e);
//         setTimeout(() => startListening(), 100);
//       }
//     }
//   };

//   const stopListening = () => {
//     if (recognitionRef.current && isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     }
//   };

//   const toggleListening = () => {
//     if (isListening) {
//       stopListening();
//     } else {
//       startListening();
//     }
//   };

//   const toggleMute = () => {
//     setIsMuted(!isMuted);
//     if (!isMuted && isAISpeaking) {
//       synthRef.current?.cancel();
//       setIsAISpeaking(false);
//     }
//   };

//   const addMessage = (type: 'ai' | 'user', content: string) => {
//     const newMessage: Message = {
//       id: Date.now().toString(),
//       type,
//       content,
//       timestamp: new Date()
//     };
//     setMessages(prev => [...prev, newMessage]);
//   };

//   const askQuestion = async (step: number, index: number) => {
//     setIsProcessing(true);
//     stopListening();
    
//     let question = "";
//     switch (step) {
//       case 0:
//         question = interviewQuestions.introduction[index] || "Tell me about yourself.";
//         break;
//       case 1:
//         question = interviewQuestions.technical[index] || "Explain a technical concept you're familiar with.";
//         break;
//       case 3:
//         question = interviewQuestions.behavioral[index] || "Describe a challenging work situation you faced.";
//         break;
//       default:
//         question = "Please proceed to the next section.";
//     }
    
//     addMessage('ai', question);
//     await speak(question);
    
//     setIsProcessing(false);
//   };

//   const processUserResponse = (response: string) => {
//     if (response.trim()) {
//       addMessage('user', response);
      
//       // Record the response
//       const currentStage = interviewSteps[currentStep].type;
//       const currentQuestion = 
//         currentStep === 0 ? interviewQuestions.introduction[questionIndex] :
//         currentStep === 1 ? interviewQuestions.technical[questionIndex] :
//         currentStep === 3 ? interviewQuestions.behavioral[questionIndex] : "";
      
//       setResponses(prev => [
//         ...prev,
//         {
//           question: currentQuestion,
//           answer: response,
//           stage: currentStage,
//           timestamp: new Date()
//         }
//       ]);
      
//       // Evaluate response
//       setIsProcessing(true);
//       setTimeout(() => {
//         setIsProcessing(false);
        
//         // Move to next question or stage
//         if (questionIndex < 2) {
//           setQuestionIndex(prev => prev + 1);
//           askQuestion(currentStep, questionIndex + 1);
//         } else {
//           handleStageComplete();
//         }
//       }, 2000);
//     }
//   };

//   const handleMCQAnswer = (selectedOption: string) => {
//     const isCorrect = sampleQuestion.options.find(opt => opt.id === selectedOption)?.isCorrect;
    
//     toast({
//       title: isCorrect ? "Correct Answer!" : "Incorrect Answer",
//       description: `You selected option ${selectedOption.toUpperCase()}. ${isCorrect ? "Well done!" : "Let's review this later."}`,
//       variant: isCorrect ? "default" : "destructive"
//     });
    
//     setTimeout(() => {
//       setActiveTab("coding");
//       toast({
//         title: "Coding Challenge",
//         description: "Great! Now let's test your coding skills with a practical problem."
//       });
//     }, 2000);
//   };

//   const handleCodeRun = async (code: string): Promise<TestCase[]> => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         const sampleTestCases: TestCase[] = [
//           { input: "sum(2, 3)", expected: "5", actual: "5", passed: true },
//           { input: "sum(-1, 1)", expected: "0", actual: "0", passed: true },
//           { input: "sum(0, 0)", expected: "0", actual: "0", passed: true },
//           { input: "sum(10, 20)", expected: "30", actual: "25", passed: false },
//         ];
//         resolve(sampleTestCases);
//       }, 1500);
//     });
//   };

//   const handleCodeSubmit = async (code: string): Promise<boolean> => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(true);
//       }, 1000);
//     });
//   };

//   const handleStageComplete = () => {
//     if (currentStep < interviewSteps.length - 1) {
//       setCurrentStep(prev => prev + 1);
//       setQuestionIndex(0);
      
//       if (currentStep + 1 === 2) { // Coding stage
//         setActiveTab("coding");
//       } else if (currentStep + 1 === 3) { // Behavioral stage
//         askQuestion(currentStep + 1, 0);
//       }
      
//       toast({
//         title: "Stage Completed",
//         description: `Moving to ${interviewSteps[currentStep + 1]?.title || "final stage"}...`
//       });
//     } else {
//       handleFinishInterview();
//     }
//   };

//   const handleFinishInterview = () => {
//     setInterviewCompleted(true);
//     stopListening();
//     if (utteranceRef.current) {
//       synthRef.current?.cancel();
//     }
    
//     // Save responses to localStorage
//     localStorage.setItem('interviewResponses', JSON.stringify(responses));
    
//     toast({
//       title: "Interview Finished",
//       description: "Thank you for participating! Redirecting to dashboard..."
//     });
    
//     setTimeout(() => {
//       navigate('/dashboard');
//     }, 3000);
//   };

//   const confirmStageChange = (stepIndex: number) => {
//     if (stepIndex > currentStep + 1) {
//       toast({
//         title: "Cannot skip stages",
//         description: "Please complete the current stage before moving forward.",
//         variant: "destructive"
//       });
//       return;
//     }

//     if (stepIndex < currentStep) {
//       setPendingStep(stepIndex);
//       setShowStageChangeConfirm(true);
//     } else {
//       proceedWithStageChange(stepIndex);
//     }
//   };

//   const proceedWithStageChange = (stepIndex: number) => {
//     setCurrentStep(stepIndex);
//     setQuestionIndex(0);
    
//     if (stepIndex === 2) {
//       setActiveTab("coding");
//     } else if (stepIndex === 3) {
//       askQuestion(3, 0);
//     } else if (stepIndex < currentStep) {
//       // When going back, ask the first question of that stage
//       askQuestion(stepIndex, 0);
//     }
    
//     setShowStageChangeConfirm(false);
//     setPendingStep(null);
//   };

//   const getCurrentStageContent = () => {
//     if (interviewCompleted) {
//       return (
//         <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
//           <CheckCircle2 className="h-16 w-16 text-green-500" />
//           <h2 className="text-2xl font-bold">Interview Completed</h2>
//           <p className="text-muted-foreground">
//             Thank you for completing the interview. Redirecting to dashboard...
//           </p>
//         </div>
//       );
//     }

//     switch (currentStep) {
//       case 0:
//         return <IntroductionStage onComplete={handleStageComplete} />;
//       case 1:
//         return <TechnicalStage onComplete={handleStageComplete} />;
//       case 2:
//         return (
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsList className="grid w-full max-w-md grid-cols-2">
//               <TabsTrigger value="problem" className="flex items-center gap-2">
//                 <Code2 className="h-4 w-4" />
//                 Problem
//               </TabsTrigger>
//               <TabsTrigger value="coding" className="flex items-center gap-2">
//                 <Terminal className="h-4 w-4" />
//                 Code Editor
//               </TabsTrigger>
//             </TabsList>
            
//             <TabsContent value="problem" className="mt-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Coding Challenge</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="mb-4">Implement Kadane's Algorithm to find the maximum subarray sum.</p>
//                   <Button onClick={() => setActiveTab("coding")}>
//                     Start Coding
//                   </Button>
//                 </CardContent>
//               </Card>
//             </TabsContent>
            
//             <TabsContent value="coding" className="mt-0">
//               <CodeEditor 
//                 problem="Implement a function that finds the maximum sum of a contiguous subarray (Kadane's Algorithm). The function should handle both positive and negative numbers efficiently." 
//                 initialCode="function maxSubarraySum(nums) {\n  // Your implementation here\n}" 
//                 language="javascript" 
//                 onCodeChange={console.log} 
//                 onRun={handleCodeRun} 
//                 onSubmit={async (code) => {
//                   const result = await handleCodeSubmit(code);
//                   if (result) {
//                     handleStageComplete();
//                   }
//                   return result;
//                 }}
//               />
//             </TabsContent>
//           </Tabs>
//         );
//       case 3:
//         return <BehavioralStage onComplete={handleStageComplete} />;
//       case 4:
//         return <WrapUpStage onFinish={handleFinishInterview} />;
//       default:
//         return <IntroductionStage onComplete={handleStageComplete} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background p-4 md:p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between animate-fade-in">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
//               AI Interview Platform
//             </h1>
//             <p className="text-muted-foreground mt-1">
//               Professional technical interview with AI-powered assessment
//             </p>
//           </div>
          
//           <div className="flex items-center gap-4">
//             <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
//               <Calendar className="h-4 w-4" />
//               <span>{new Date().toLocaleDateString()}</span>
//             </div>
//             <Button variant="outline" size="sm">
//               <Settings className="h-4 w-4 mr-2" />
//               Settings
//             </Button>
//             <AlertDialog>
//               <AlertDialogTrigger asChild>
//                 <Button variant="destructive" size="sm">
//                   <LogOut className="h-4 w-4 mr-2" />
//                   Finish Interview
//                 </Button>
//               </AlertDialogTrigger>
//               <AlertDialogContent>
//                 <AlertDialogHeader>
//                   <AlertDialogTitle>Finish Interview</AlertDialogTitle>
//                   <AlertDialogDescription>
//                     Are you sure you want to submit the interview? After submitting, you cannot continue the same interview again. All your responses will be finalized and sent for evaluation.
//                   </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                   <AlertDialogCancel>Cancel</AlertDialogCancel>
//                   <AlertDialogAction onClick={handleFinishInterview}>
//                     Yes, Finish Interview
//                   </AlertDialogAction>
//                 </AlertDialogFooter>
//               </AlertDialogContent>
//             </AlertDialog>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Left Sidebar - Progress */}
//           <div className="lg:col-span-1">
//             <InterviewProgress 
//               steps={interviewSteps} 
//               currentStep={currentStep} 
//               totalTime={3600} 
//               elapsedTime={elapsedTime} 
//               onStepClick={confirmStageChange}
//             />
//           </div>

//           {/* Main Interview Area */}
//           <div className="lg:col-span-3 space-y-6">
//             {/* Voice Controls */}
//             <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
//               <div className="flex items-center gap-4">
//                 <Button 
//                   variant={isListening ? "default" : "outline"} 
//                   size="sm" 
//                   onClick={toggleListening}
//                 >
//                   {isListening ? (
//                     <>
//                       <MicOff className="h-4 w-4 mr-2" />
//                       Stop Listening
//                     </>
//                   ) : (
//                     <>
//                       <Mic className="h-4 w-4 mr-2" />
//                       Start Listening
//                     </>
//                   )}
//                 </Button>
//                 <Button 
//                   variant={isMuted ? "destructive" : "outline"} 
//                   size="sm" 
//                   onClick={toggleMute}
//                 >
//                   {isMuted ? "Unmute AI" : "Mute AI"}
//                 </Button>
//               </div>
//               <SpeakingStatus 
//                 isAISpeaking={isAISpeaking} 
//                 isUserSpeaking={isListening} 
//               />
//             </div>

//             {/* Current transcript */}
//             {isListening && (
//               <div className="p-4 bg-muted/20 rounded-lg border border-muted">
//                 <p className="text-sm text-muted-foreground">You're speaking...</p>
//                 <p className="mt-2">{userTranscript || "Listening for your response..."}</p>
//               </div>
//             )}

//             {/* Dynamic Interview Content */}
//             {getCurrentStageContent()}
//           </div>
//         </div>
//       </div>

//       {/* Stage change confirmation dialog */}
//       <AlertDialog open={showStageChangeConfirm} onOpenChange={setShowStageChangeConfirm}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Confirm Stage Change</AlertDialogTitle>
//             <AlertDialogDescription>
//               Are you sure you want to go back to the previous stage? Your current progress in this stage will be paused.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={() => pendingStep !== null && proceedWithStageChange(pendingStep)}>
//               Confirm
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };



// // Merged 3
// import { useState, useEffect, useRef } from "react";
// import { Settings, Calendar, UserCheck, Code2, MessageSquare, LogOut, CheckCircle2, Terminal, Mic, MicOff } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import { useToast } from "@/hooks/use-toast";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useNavigate } from 'react-router-dom';
// import { CodeEditor } from "./CodeEditor";
// import { InterviewProgress } from "./InterviewProgress";
// import { SpeakingStatus } from "./SpeakingStatus";
// import { IntroductionStage } from "./stages/IntroductionStage";
// import { TechnicalStage } from "./stages/TechnicalStage";
// import { BehavioralStage } from "./stages/BehavioralStage";
// import { WrapUpStage } from "./stages/WrapUpStage";

// interface Message {
//   id: string;
//   type: 'ai' | 'user';
//   content: string;
//   timestamp: Date;
// }

// interface TestCase {
//   input: string;
//   expected: string;
//   actual?: string;
//   passed?: boolean;
// }

// interface InterviewStep {
//   id: string;
//   type: string;
//   title: string;
//   completed: boolean;
//   current: boolean;
// }

// interface InterviewResponse {
//   question: string;
//   answer: string;
//   stage: string;
//   timestamp: Date;
// }

// export const InterviewPlatform = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState("interview");
//   const [isListening, setIsListening] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isAISpeaking, setIsAISpeaking] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [interviewCompleted, setInterviewCompleted] = useState(false);
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [userTranscript, setUserTranscript] = useState("");
//   const [responses, setResponses] = useState<InterviewResponse[]>([]);
//   const [mcqTimeLeft, setMcqTimeLeft] = useState(30);
//   const recognitionRef = useRef<any>(null);
//   const synthRef = useRef<SpeechSynthesis>(typeof window !== 'undefined' ? window.speechSynthesis : null);
//   const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
//   const mcqTimerRef = useRef<NodeJS.Timeout | null>(null);

//   // Interview questions
//   const interviewQuestions = {
//     introduction: [
//       "Tell me about yourself and your background in software development.",
//       "What interests you about this position?",
//       "Walk me through your resume and highlight relevant experience."
//     ],
//     technical: [
//       "Explain the difference between let, const, and var in JavaScript.",
//       "What is the virtual DOM in React and how does it work?",
//       "How would you optimize a slow-loading web application?"
//     ],
//     behavioral: [
//       "Tell me about a time you faced a difficult technical challenge and how you overcame it.",
//       "Describe a situation where you had to work with a difficult team member.",
//       "Give an example of how you've handled tight deadlines in the past."
//     ]
//   };

//   // Interview steps with dynamic state
//   const interviewSteps: InterviewStep[] = [
//     {
//       id: '1',
//       type: 'introduction',
//       title: 'Introduction & Background',
//       completed: currentStep > 0,
//       current: currentStep === 0
//     },
//     {
//       id: '2',
//       type: 'technical',
//       title: 'Technical Questions',
//       completed: currentStep > 1,
//       current: currentStep === 1
//     },
//     {
//       id: '3',
//       type: 'coding',
//       title: 'Coding Challenge',
//       completed: currentStep > 2,
//       current: currentStep === 2
//     },
//     {
//       id: '4',
//       type: 'behavioral',
//       title: 'Behavioral Questions',
//       completed: currentStep > 3,
//       current: currentStep === 3
//     },
//     {
//       id: '5',
//       type: 'conclusion',
//       title: 'Wrap-up & Next Steps',
//       completed: currentStep > 4,
//       current: currentStep === 4
//     }
//   ];

//   // Sample MCQ question
//   const sampleQuestion = {
//     question: "What is the time complexity of binary search algorithm?",
//     options: [
//       { id: 'a', text: 'O(n)', isCorrect: false },
//       { id: 'b', text: 'O(log n)', isCorrect: true },
//       { id: 'c', text: 'O(n²)', isCorrect: false },
//       { id: 'd', text: 'O(1)', isCorrect: false }
//     ]
//   };

//   // Initialize speech recognition and synthesis
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       // Speech recognition setup
//       const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         recognitionRef.current = new SpeechRecognition();
//         recognitionRef.current.continuous = true;
//         recognitionRef.current.interimResults = true;
        
//         recognitionRef.current.onresult = (event: any) => {
//           let interimTranscript = '';
//           let finalTranscript = '';
          
//           for (let i = event.resultIndex; i < event.results.length; i++) {
//             const transcript = event.results[i][0].transcript;
//             if (event.results[i].isFinal) {
//               finalTranscript += transcript;
//             } else {
//               interimTranscript += transcript;
//             }
//           }
          
//           setUserTranscript(finalTranscript || interimTranscript);
//         };
        
//         recognitionRef.current.onerror = (event: any) => {
//           console.error('Speech recognition error', event.error);
//           setIsListening(false);
//         };

//         recognitionRef.current.onend = () => {
//           if (isListening) {
//             recognitionRef.current.start();
//           }
//         };
//       }

//       // Speech synthesis setup
//       synthRef.current = window.speechSynthesis;
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//       if (utteranceRef.current) {
//         synthRef.current?.cancel();
//       }
//       if (mcqTimerRef.current) {
//         clearInterval(mcqTimerRef.current);
//       }
//     };
//   }, []);

//   // Timer effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setElapsedTime(prev => prev + 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Auto-start listening when AI finishes speaking (except for coding stage)
//   useEffect(() => {
//     if (!isAISpeaking && !isProcessing && currentStep !== 2 && !interviewCompleted) {
//       startListening();
//     }
//   }, [isAISpeaking, isProcessing, currentStep, interviewCompleted]);

//   // Auto-stop listening after 30 seconds of inactivity
//   useEffect(() => {
//     let timeout: NodeJS.Timeout;
//     if (isListening && userTranscript) {
//       timeout = setTimeout(() => {
//         stopListening();
//         processUserResponse(userTranscript);
//       }, 30000);
//     }
//     return () => clearTimeout(timeout);
//   }, [isListening, userTranscript]);

//   // Initial AI greeting
//   useEffect(() => {
//     if (messages.length === 0 && !interviewCompleted) {
//       setTimeout(() => {
//         askQuestion(currentStep, questionIndex);
//       }, 1000);
//     }
//   }, []);

//   // MCQ timer effect
//   useEffect(() => {
//     if (currentStep === 1 && questionIndex === 0) {
//       setMcqTimeLeft(30);
//       if (mcqTimerRef.current) {
//         clearInterval(mcqTimerRef.current);
//       }
      
//       mcqTimerRef.current = setInterval(() => {
//         setMcqTimeLeft(prev => {
//           if (prev <= 1) {
//             clearInterval(mcqTimerRef.current as NodeJS.Timeout);
//             handleMCQTimeout();
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }

//     return () => {
//       if (mcqTimerRef.current) {
//         clearInterval(mcqTimerRef.current);
//       }
//     };
//   }, [currentStep, questionIndex]);

//   const speak = (text: string) => {
//     if (isMuted) return;

//     return new Promise<void>((resolve) => {
//       if (synthRef.current && text) {
//         synthRef.current.cancel(); // Cancel any ongoing speech
        
//         utteranceRef.current = new SpeechSynthesisUtterance(text);
//         utteranceRef.current.onend = () => {
//           setIsAISpeaking(false);
//           resolve();
//         };
//         utteranceRef.current.onerror = (event) => {
//           console.error('Speech synthesis error', event);
//           setIsAISpeaking(false);
//           resolve();
//         };
        
//         setIsAISpeaking(true);
//         synthRef.current.speak(utteranceRef.current);
//       } else {
//         resolve();
//       }
//     });
//   };

//   const startListening = () => {
//     if (recognitionRef.current && !isListening && currentStep !== 2) {
//       try {
//         recognitionRef.current.start();
//         setIsListening(true);
//         setUserTranscript("");
//       } catch (e) {
//         console.error('Speech recognition start error:', e);
//         setTimeout(() => startListening(), 100);
//       }
//     }
//   };

//   const stopListening = () => {
//     if (recognitionRef.current && isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     }
//   };

//   const toggleListening = () => {
//     if (isListening) {
//       stopListening();
//     } else {
//       startListening();
//     }
//   };

//   const toggleMute = () => {
//     setIsMuted(!isMuted);
//     if (!isMuted && isAISpeaking) {
//       synthRef.current?.cancel();
//       setIsAISpeaking(false);
//     }
//   };

//   const addMessage = (type: 'ai' | 'user', content: string) => {
//     const newMessage: Message = {
//       id: Date.now().toString(),
//       type,
//       content,
//       timestamp: new Date()
//     };
//     setMessages(prev => [...prev, newMessage]);
//   };

//   const askQuestion = async (step: number, index: number) => {
//     setIsProcessing(true);
//     stopListening();
    
//     let question = "";
//     switch (step) {
//       case 0:
//         question = interviewQuestions.introduction[index] || "Tell me about yourself.";
//         break;
//       case 1:
//         question = interviewQuestions.technical[index] || "Explain a technical concept you're familiar with.";
//         break;
//       case 3:
//         question = interviewQuestions.behavioral[index] || "Describe a challenging work situation you faced.";
//         break;
//       default:
//         question = "Please proceed to the next section.";
//     }
    
//     addMessage('ai', question);
//     await speak(question);
    
//     setIsProcessing(false);
//   };

//   const processUserResponse = (response: string) => {
//     if (response.trim()) {
//       addMessage('user', response);
      
//       // Record the response
//       const currentStage = interviewSteps[currentStep].type;
//       const currentQuestion = 
//         currentStep === 0 ? interviewQuestions.introduction[questionIndex] :
//         currentStep === 1 ? interviewQuestions.technical[questionIndex] :
//         currentStep === 3 ? interviewQuestions.behavioral[questionIndex] : "";
      
//       setResponses(prev => [
//         ...prev,
//         {
//           question: currentQuestion,
//           answer: response,
//           stage: currentStage,
//           timestamp: new Date()
//         }
//       ]);
      
//       // Evaluate response
//       setIsProcessing(true);
//       setTimeout(() => {
//         setIsProcessing(false);
        
//         // Move to next question or stage
//         if (questionIndex < 2) {
//           setQuestionIndex(prev => prev + 1);
//           askQuestion(currentStep, questionIndex + 1);
//         } else {
//           handleStageComplete();
//         }
//       }, 2000);
//     }
//   };

//   const handleMCQAnswer = (selectedOption: string) => {
//     if (mcqTimerRef.current) {
//       clearInterval(mcqTimerRef.current);
//     }
    
//     const isCorrect = sampleQuestion.options.find(opt => opt.id === selectedOption)?.isCorrect;
    
//     toast({
//       title: isCorrect ? "Correct Answer!" : "Incorrect Answer",
//       description: `You selected option ${selectedOption.toUpperCase()}. ${isCorrect ? "Well done!" : "Let's review this later."}`,
//       variant: isCorrect ? "default" : "destructive"
//     });
    
//     setTimeout(() => {
//       setActiveTab("coding");
//       toast({
//         title: "Coding Challenge",
//         description: "Great! Now let's test your coding skills with a practical problem."
//       });
//     }, 2000);
//   };

//   const handleMCQTimeout = () => {
//     toast({
//       title: "Time's up!",
//       description: "Moving to the next question automatically.",
//       variant: "destructive"
//     });
    
//     setTimeout(() => {
//       setActiveTab("coding");
//       toast({
//         title: "Coding Challenge",
//         description: "Now let's test your coding skills with a practical problem."
//       });
//     }, 2000);
//   };

//   const handleCodeRun = async (code: string): Promise<TestCase[]> => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         const sampleTestCases: TestCase[] = [
//           { input: "sum(2, 3)", expected: "5", actual: "5", passed: true },
//           { input: "sum(-1, 1)", expected: "0", actual: "0", passed: true },
//           { input: "sum(0, 0)", expected: "0", actual: "0", passed: true },
//           { input: "sum(10, 20)", expected: "30", actual: "25", passed: false },
//         ];
//         resolve(sampleTestCases);
//       }, 1500);
//     });
//   };

//   const handleCodeSubmit = async (code: string): Promise<boolean> => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(true);
//       }, 1000);
//     });
//   };

//   const handleStageComplete = () => {
//     if (currentStep < interviewSteps.length - 1) {
//       setCurrentStep(prev => prev + 1);
//       setQuestionIndex(0);
      
//       if (currentStep + 1 === 2) { // Coding stage
//         setActiveTab("coding");
//       } else if (currentStep + 1 === 3) { // Behavioral stage
//         askQuestion(currentStep + 1, 0);
//       }
      
//       toast({
//         title: "Stage Completed",
//         description: `Moving to ${interviewSteps[currentStep + 1]?.title || "final stage"}...`
//       });
//     } else {
//       handleFinishInterview();
//     }
//   };

//   const handleFinishInterview = () => {
//     setInterviewCompleted(true);
//     stopListening();
//     if (utteranceRef.current) {
//       synthRef.current?.cancel();
//     }
    
//     // Save responses to localStorage
//     localStorage.setItem('interviewResponses', JSON.stringify(responses));
    
//     toast({
//       title: "Interview Finished",
//       description: "Thank you for participating! Redirecting to dashboard..."
//     });
    
//     setTimeout(() => {
//       navigate('/dashboard');
//     }, 3000);
//   };

//   const getCurrentStageContent = () => {
//     if (interviewCompleted) {
//       return (
//         <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
//           <CheckCircle2 className="h-16 w-16 text-green-500" />
//           <h2 className="text-2xl font-bold">Interview Completed</h2>
//           <p className="text-muted-foreground">
//             Thank you for completing the interview. Redirecting to dashboard...
//           </p>
//         </div>
//       );
//     }

//     switch (currentStep) {
//       case 0:
//         return <IntroductionStage onComplete={handleStageComplete} />;
//       case 1:
//         return (
//           <div className="space-y-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Technical Question</CardTitle>
//                 <div className="text-sm text-muted-foreground">
//                   Time remaining: {mcqTimeLeft}s
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="mb-4">{sampleQuestion.question}</p>
//                 <div className="space-y-2">
//                   {sampleQuestion.options.map((option) => (
//                     <Button
//                       key={option.id}
//                       variant="outline"
//                       className="w-full justify-start"
//                       onClick={() => handleMCQAnswer(option.id)}
//                     >
//                       {option.id}. {option.text}
//                     </Button>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         );
//       case 2:
//         return (
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsList className="grid w-full max-w-md grid-cols-2">
//               <TabsTrigger value="problem" className="flex items-center gap-2">
//                 <Code2 className="h-4 w-4" />
//                 Problem
//               </TabsTrigger>
//               <TabsTrigger value="coding" className="flex items-center gap-2">
//                 <Terminal className="h-4 w-4" />
//                 Code Editor
//               </TabsTrigger>
//             </TabsList>
            
//             <TabsContent value="problem" className="mt-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Coding Challenge</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="mb-4">Implement Kadane's Algorithm to find the maximum subarray sum.</p>
//                   <Button onClick={() => setActiveTab("coding")}>
//                     Start Coding
//                   </Button>
//                 </CardContent>
//               </Card>
//             </TabsContent>
            
//             <TabsContent value="coding" className="mt-0">
//               <CodeEditor 
//                 problem="Implement a function that finds the maximum sum of a contiguous subarray (Kadane's Algorithm). The function should handle both positive and negative numbers efficiently." 
//                 initialCode="function maxSubarraySum(nums) {\n  // Your implementation here\n}" 
//                 language="javascript" 
//                 onCodeChange={console.log} 
//                 onRun={handleCodeRun} 
//                 onSubmit={async (code) => {
//                   const result = await handleCodeSubmit(code);
//                   if (result) {
//                     handleStageComplete();
//                   }
//                   return result;
//                 }}
//               />
//             </TabsContent>
//           </Tabs>
//         );
//       case 3:
//         return <BehavioralStage onComplete={handleStageComplete} />;
//       case 4:
//         return <WrapUpStage onFinish={handleFinishInterview} />;
//       default:
//         return <IntroductionStage onComplete={handleStageComplete} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background p-4 md:p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between animate-fade-in">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
//               AI Interview Platform
//             </h1>
//             <p className="text-muted-foreground mt-1">
//               Professional technical interview with AI-powered assessment
//             </p>
//           </div>
          
//           <div className="flex items-center gap-4">
//             <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
//               <Calendar className="h-4 w-4" />
//               <span>{new Date().toLocaleDateString()}</span>
//             </div>
//             <Button variant="outline" size="sm">
//               <Settings className="h-4 w-4 mr-2" />
//               Settings
//             </Button>
//             <AlertDialog>
//               <AlertDialogTrigger asChild>
//                 <Button variant="destructive" size="sm">
//                   <LogOut className="h-4 w-4 mr-2" />
//                   Finish Interview
//                 </Button>
//               </AlertDialogTrigger>
//               <AlertDialogContent>
//                 <AlertDialogHeader>
//                   <AlertDialogTitle>Finish Interview</AlertDialogTitle>
//                   <AlertDialogDescription>
//                     Are you sure you want to submit the interview? After submitting, you cannot continue the same interview again. All your responses will be finalized and sent for evaluation.
//                   </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                   <AlertDialogCancel>Cancel</AlertDialogCancel>
//                   <AlertDialogAction onClick={handleFinishInterview}>
//                     Yes, Finish Interview
//                   </AlertDialogAction>
//                 </AlertDialogFooter>
//               </AlertDialogContent>
//             </AlertDialog>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Left Sidebar - Progress */}
//           <div className="lg:col-span-1">
//             <InterviewProgress 
//               steps={interviewSteps} 
//               currentStep={currentStep} 
//               totalTime={3600} 
//               elapsedTime={elapsedTime} 
//               onStepClick={(stepIndex) => {
//                 // Prevent going back to previous stages
//                 if (stepIndex < currentStep) {
//                   toast({
//                     title: "Cannot go back",
//                     description: "You cannot return to previous stages once completed.",
//                     variant: "destructive"
//                   });
//                 }
//               }}
//             />
//           </div>

//           {/* Main Interview Area */}
//           <div className="lg:col-span-3 space-y-6">
//             {/* Voice Controls */}
//             <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
//               <div className="flex items-center gap-4">
//                 <Button 
//                   variant={isListening ? "default" : "outline"} 
//                   size="sm" 
//                   onClick={toggleListening}
//                   disabled={currentStep === 2} // Disable during coding stage
//                 >
//                   {isListening ? (
//                     <>
//                       <MicOff className="h-4 w-4 mr-2" />
//                       Stop Listening
//                     </>
//                   ) : (
//                     <>
//                       <Mic className="h-4 w-4 mr-2" />
//                       Start Listening
//                     </>
//                   )}
//                 </Button>
//                 <Button 
//                   variant={isMuted ? "destructive" : "outline"} 
//                   size="sm" 
//                   onClick={toggleMute}
//                 >
//                   {isMuted ? "Unmute AI" : "Mute AI"}
//                 </Button>
//               </div>
//               <SpeakingStatus 
//                 isAISpeaking={isAISpeaking} 
//                 isUserSpeaking={isListening} 
//               />
//             </div>

//             {/* Current transcript */}
//             {isListening && (
//               <div className="p-4 bg-muted/20 rounded-lg border border-muted">
//                 <p className="text-sm text-muted-foreground">You're speaking...</p>
//                 <p className="mt-2">{userTranscript || "Listening for your response..."}</p>
//               </div>
//             )}

//             {/* Dynamic Interview Content */}
//             {getCurrentStageContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// Merged 4

import { useState, useEffect, useRef } from "react";
import { Settings, Calendar, UserCheck, Code2, MessageSquare, LogOut, CheckCircle2, Terminal, Mic, MicOff, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { CodeEditor } from "./CodeEditor";
import { InterviewProgress } from "./InterviewProgress";
import { SpeakingStatus } from "./SpeakingStatus";
import { TechnicalStage } from "./stages/TechnicalStage";

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

interface TestCase {
  input: string;
  expected: string;
  actual?: string;
  passed?: boolean;
}

interface InterviewStep {
  id: string;
  type: string;
  title: string;
  completed: boolean;
  current: boolean;
}

interface InterviewResponse {
  question: string;
  answer: string;
  stage: string;
  timestamp: Date;
}

export const InterviewPlatform = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("interview");
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userTranscript, setUserTranscript] = useState("");
  const [responses, setResponses] = useState<InterviewResponse[]>([]);
  const [mcqTimeLeft, setMcqTimeLeft] = useState(30);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis>(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const mcqTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Interview questions
  const interviewQuestions = {
    introduction: [
      "Please introduce yourself and share your background in software development. Include your experience, skills, and what motivates you in your career.",
      "What interests you about this position?",
      "Walk me through your resume and highlight relevant experience."
    ],
    technical: [
      "Explain the difference between let, const, and var in JavaScript.",
      "What is the virtual DOM in React and how does it work?",
      "How would you optimize a slow-loading web application?"
    ],
    behavioral: [
      "Tell me about a time you faced a difficult technical challenge and how you overcame it.",
      "Describe a situation where you had to work with a difficult team member.",
      "Give an example of how you've handled tight deadlines in the past."
    ]
  };

  // Interview steps with dynamic state
  const interviewSteps: InterviewStep[] = [
    {
      id: '1',
      type: 'introduction',
      title: 'Introduction & Background',
      completed: currentStep > 0,
      current: currentStep === 0
    },
    {
      id: '2',
      type: 'technical',
      title: 'Technical Questions',
      completed: currentStep > 1,
      current: currentStep === 1
    },
    {
      id: '3',
      type: 'coding',
      title: 'Coding Challenge',
      completed: currentStep > 2,
      current: currentStep === 2
    },
    {
      id: '4',
      type: 'behavioral',
      title: 'Behavioral Questions',
      completed: currentStep > 3,
      current: currentStep === 3
    },
    {
      id: '5',
      type: 'conclusion',
      title: 'Wrap-up & Next Steps',
      completed: currentStep > 4,
      current: currentStep === 4
    }
  ];

  // Sample MCQ question
  const sampleQuestion = {
    question: "What is the time complexity of binary search algorithm?",
    options: [
      { id: 'a', text: 'O(n)', isCorrect: false },
      { id: 'b', text: 'O(log n)', isCorrect: true },
      { id: 'c', text: 'O(n²)', isCorrect: false },
      { id: 'd', text: 'O(1)', isCorrect: false }
    ]
  };

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Speech recognition setup
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        
        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }
          
          setUserTranscript(finalTranscript || interimTranscript);
        };
        
        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          if (isListening) {
            recognitionRef.current.start();
          }
        };
      }

      // Speech synthesis setup
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (utteranceRef.current) {
        synthRef.current?.cancel();
      }
      if (mcqTimerRef.current) {
        clearInterval(mcqTimerRef.current);
      }
    };
  }, []);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-start listening when AI finishes speaking (except for coding stage and MCQ)
  useEffect(() => {
    if (!isAISpeaking && !isProcessing && currentStep !== 2 && currentStep !== 1 && !interviewCompleted) {
      startListening();
    }
  }, [isAISpeaking, isProcessing, currentStep, interviewCompleted]);

  // Auto-stop listening after 30 seconds of inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isListening && userTranscript) {
      timeout = setTimeout(() => {
        stopListening();
        processUserResponse(userTranscript);
      }, 30000);
    }
    return () => clearTimeout(timeout);
  }, [isListening, userTranscript]);

  // Initial AI greeting
  useEffect(() => {
    if (messages.length === 0 && !interviewCompleted) {
      setTimeout(() => {
        askQuestion(currentStep, questionIndex);
      }, 1000);
    }
  }, []);

  // MCQ timer effect
  useEffect(() => {
    if (currentStep === 1) {
      setMcqTimeLeft(30);
      if (mcqTimerRef.current) {
        clearInterval(mcqTimerRef.current);
      }
      
      mcqTimerRef.current = setInterval(() => {
        setMcqTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(mcqTimerRef.current as NodeJS.Timeout);
            handleMCQTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (mcqTimerRef.current) {
        clearInterval(mcqTimerRef.current);
      }
    };
  }, [currentStep]);

  const speak = (text: string) => {
    if (isMuted) return;

    return new Promise<void>((resolve) => {
      if (synthRef.current && text) {
        synthRef.current.cancel(); // Cancel any ongoing speech
        
        utteranceRef.current = new SpeechSynthesisUtterance(text);
        utteranceRef.current.onend = () => {
          setIsAISpeaking(false);
          resolve();
        };
        utteranceRef.current.onerror = (event) => {
          console.error('Speech synthesis error', event);
          setIsAISpeaking(false);
          resolve();
        };
        
        setIsAISpeaking(true);
        synthRef.current.speak(utteranceRef.current);
      } else {
        resolve();
      }
    });
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening && currentStep !== 1 && currentStep !== 2) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setUserTranscript("");
      } catch (e) {
        console.error('Speech recognition start error:', e);
        setTimeout(() => startListening(), 100);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted && isAISpeaking) {
      synthRef.current?.cancel();
      setIsAISpeaking(false);
    }
  };

  const addMessage = (type: 'ai' | 'user', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const askQuestion = async (step: number, index: number) => {
    setIsProcessing(true);
    stopListening();
    
    let question = "";
    switch (step) {
      case 0:
        question = interviewQuestions.introduction[index] || "Tell me about yourself.";
        break;
      case 1:
        question = interviewQuestions.technical[index] || "Explain a technical concept you're familiar with.";
        break;
      case 3:
        question = interviewQuestions.behavioral[index] || "Describe a challenging work situation you faced.";
        break;
      default:
        question = "Please proceed to the next section.";
    }
    
    addMessage('ai', question);
    await speak(question);
    
    setIsProcessing(false);
  };

  const processUserResponse = (response: string) => {
    if (response.trim()) {
      addMessage('user', response);
      
      // Record the response
      const currentStage = interviewSteps[currentStep].type;
      const currentQuestion = 
        currentStep === 0 ? interviewQuestions.introduction[questionIndex] :
        currentStep === 1 ? interviewQuestions.technical[questionIndex] :
        currentStep === 3 ? interviewQuestions.behavioral[questionIndex] : "";
      
      setResponses(prev => [
        ...prev,
        {
          question: currentQuestion,
          answer: response,
          stage: currentStage,
          timestamp: new Date()
        }
      ]);
      
      // Evaluate response
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        
        // Move to next question or stage
        if (questionIndex < 2) {
          setQuestionIndex(prev => prev + 1);
          askQuestion(currentStep, questionIndex + 1);
        } else {
          handleStageComplete();
        }
      }, 2000);
    }
  };

  const handleMCQAnswer = (optionId: string) => {
    if (mcqTimerRef.current) {
      clearInterval(mcqTimerRef.current);
    }
    setSelectedOption(optionId);
  };

  const handleMCQNext = () => {
    setSelectedOption(null);
    if (questionIndex < 2) {
      setQuestionIndex(prev => prev + 1);
      setMcqTimeLeft(30);
      mcqTimerRef.current = setInterval(() => {
        setMcqTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(mcqTimerRef.current as NodeJS.Timeout);
            handleMCQTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      handleStageComplete();
    }
  };

  const handleMCQTimeout = () => {
    setSelectedOption(null);
    if (questionIndex < 2) {
      setQuestionIndex(prev => prev + 1);
      setMcqTimeLeft(30);
      mcqTimerRef.current = setInterval(() => {
        setMcqTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(mcqTimerRef.current as NodeJS.Timeout);
            handleMCQTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      handleStageComplete();
    }
  };

  const handleCodeRun = async (code: string): Promise<TestCase[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const sampleTestCases: TestCase[] = [
          { input: "sum(2, 3)", expected: "5", actual: "5", passed: true },
          { input: "sum(-1, 1)", expected: "0", actual: "0", passed: true },
          { input: "sum(0, 0)", expected: "0", actual: "0", passed: true },
          { input: "sum(10, 20)", expected: "30", actual: "25", passed: false },
        ];
        resolve(sampleTestCases);
      }, 1500);
    });
  };

  const handleCodeSubmit = async (code: string): Promise<boolean> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  };

  const handleStageComplete = () => {
    if (currentStep < interviewSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setQuestionIndex(0);
      
      if (currentStep + 1 === 2) { // Coding stage
        setActiveTab("coding");
      } else if (currentStep + 1 === 3) { // Behavioral stage
        askQuestion(currentStep + 1, 0);
      }
    } else {
      handleFinishInterview();
    }
  };

  const handleFinishInterview = () => {
    setInterviewCompleted(true);
    stopListening();
    if (utteranceRef.current) {
      synthRef.current?.cancel();
    }
    
    // Save responses to localStorage
    localStorage.setItem('interviewResponses', JSON.stringify(responses));
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  const IntroductionStage = ({ onComplete }: { onComplete: () => void }) => {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Introduction Question</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{interviewQuestions.introduction[questionIndex]}</p>
            {isListening && (
              <div className="p-4 bg-muted/20 rounded-lg border border-muted">
                <p className="text-sm text-muted-foreground">You're speaking...</p>
                <p className="mt-2">{userTranscript || "Listening for your response..."}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  // const TechnicalStage = () => {
  //   return (
  //     <div className="space-y-4">
  //       <Card>
  //         <CardHeader>
  //           <CardTitle>Technical Question</CardTitle>
  //           <div className="text-sm text-muted-foreground">
  //             Time remaining: {mcqTimeLeft}s
  //           </div>
  //         </CardHeader>
  //         <CardContent>
  //           <p className="mb-4">{sampleQuestion.question}</p>
  //           <div className="space-y-2">
  //             {sampleQuestion.options.map((option) => (
  //               <Button
  //                 key={option.id}
  //                 variant={selectedOption === option.id ? "default" : "outline"}
  //                 className="w-full justify-start"
  //                 onClick={() => handleMCQAnswer(option.id)}
  //               >
  //                 {option.id}. {option.text}
  //               </Button>
  //             ))}
  //           </div>
  //           {selectedOption && (
  //             <div className="mt-4 flex justify-end">
  //               <Button onClick={handleMCQNext}>
  //                 Next Question <ChevronRight className="h-4 w-4 ml-2" />
  //               </Button>
  //             </div>
  //           )}
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // };

  const BehavioralStage = ({ onComplete }: { onComplete: () => void }) => {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Behavioral Question</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{interviewQuestions.behavioral[questionIndex]}</p>
            {isListening && (
              <div className="p-4 bg-muted/20 rounded-lg border border-muted">
                <p className="text-sm text-muted-foreground">You're speaking...</p>
                <p className="mt-2">{userTranscript || "Listening for your response..."}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const WrapUpStage = ({ onFinish }: { onFinish: () => void }) => {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
        <h2 className="text-2xl font-bold">Interview Complete</h2>
        <p className="text-muted-foreground">
          Thank you for participating in this interview.
        </p>
        <Button onClick={onFinish}>
          Finish Interview
        </Button>
      </div>
    );
  };

  const getCurrentStageContent = () => {
    if (interviewCompleted) {
      return (
        <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
          <h2 className="text-2xl font-bold">Interview Completed</h2>
          <p className="text-muted-foreground">
            Thank you for completing the interview. Redirecting to dashboard...
          </p>
        </div>
      );
    }

    switch (currentStep) {
      case 0:
        return <IntroductionStage onComplete={handleStageComplete} />;
      case 1:
        <TechnicalStage onComplete={handleStageComplete} />
        // return <TechnicalStage />;
      case 2:
        return (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="problem" className="flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                Problem
              </TabsTrigger>
              <TabsTrigger value="coding" className="flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                Code Editor
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="problem" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Coding Challenge</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Implement Kadane's Algorithm to find the maximum subarray sum.</p>
                  <Button onClick={() => setActiveTab("coding")}>
                    Start Coding
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="coding" className="mt-0">
              <CodeEditor 
                problem="Implement a function that finds the maximum sum of a contiguous subarray (Kadane's Algorithm). The function should handle both positive and negative numbers efficiently." 
                initialCode="function maxSubarraySum(nums) {\n  // Your implementation here\n}" 
                language="javascript" 
                onCodeChange={console.log} 
                onRun={handleCodeRun} 
                onSubmit={async (code) => {
                  const result = await handleCodeSubmit(code);
                  if (result) {
                    handleStageComplete();
                  }
                  return result;
                }}
              />
            </TabsContent>
          </Tabs>
        );
      case 3:
        return <BehavioralStage onComplete={handleStageComplete} />;
      case 4:
        return <WrapUpStage onFinish={handleFinishInterview} />;
      default:
        return <IntroductionStage onComplete={handleStageComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              AI Interview Platform
            </h1>
            <p className="text-muted-foreground mt-1">
              Professional technical interview with AI-powered assessment
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Finish Interview
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Finish Interview</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to submit the interview? After submitting, you cannot continue the same interview again.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleFinishInterview}>
                    Yes, Finish Interview
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Progress */}
          <div className="lg:col-span-1">
            <InterviewProgress 
              steps={interviewSteps} 
              currentStep={currentStep} 
              totalTime={3600} 
              elapsedTime={elapsedTime} 
              onStepClick={(stepIndex) => {
                // Prevent going back to previous stages
                if (stepIndex < currentStep) {
                  toast({
                    title: "Cannot go back",
                    description: "You cannot return to previous stages once completed.",
                    variant: "destructive"
                  });
                }
              }}
            />
          </div>

          {/* Main Interview Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Voice Controls */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-4">
                <Button 
                  variant={isListening ? "default" : "outline"} 
                  size="sm" 
                  onClick={toggleListening}
                  disabled={currentStep === 1 || currentStep === 2} // Disable during MCQ and coding stages
                >
                  {isListening ? (
                    <>
                      <MicOff className="h-4 w-4 mr-2" />
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 mr-2" />
                      Start Listening
                    </>
                  )}
                </Button>
                <Button 
                  variant={isMuted ? "destructive" : "outline"} 
                  size="sm" 
                  onClick={toggleMute}
                >
                  {isMuted ? "Unmute AI" : "Mute AI"}
                </Button>
              </div>
              <SpeakingStatus 
                isAISpeaking={isAISpeaking} 
                isUserSpeaking={isListening} 
              />
            </div>

            {/* Current transcript */}
            {/* {isListening && (
              <div className="p-4 bg-muted/20 rounded-lg border border-muted">
                <p className="text-sm text-muted-foreground">You're speaking...</p>
                <p className="mt-2">{userTranscript || "Listening for your response..."}</p>
              </div>
            )} */}

            {/* Dynamic Interview Content */}
            {getCurrentStageContent()}
          </div>
        </div>
      </div>
    </div>
  );
};