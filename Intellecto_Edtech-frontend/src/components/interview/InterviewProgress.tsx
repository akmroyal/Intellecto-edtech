// import { CheckCircle2, Circle, Code, MessageSquare, Brain } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// interface ProgressStep {
//   id: string;
//   type: 'introduction' | 'technical' | 'coding' | 'behavioral' | 'conclusion';
//   title: string;
//   completed: boolean;
//   current: boolean;
// }
// interface InterviewProgressProps {
//   steps: ProgressStep[];
//   currentStep: number;
//   totalTime: number;
//   elapsedTime: number;
// }
// export const InterviewProgress = ({
//   steps,
//   currentStep,
//   totalTime,
//   elapsedTime
// }: InterviewProgressProps) => {
//   const getStepIcon = (type: string) => {
//     switch (type) {
//       case 'introduction':
//         return <MessageSquare className="h-4 w-4" />;
//       case 'technical':
//         return <Brain className="h-4 w-4" />;
//       case 'coding':
//         return <Code className="h-4 w-4" />;
//       case 'behavioral':
//         return <MessageSquare className="h-4 w-4" />;
//       default:
//         return <Circle className="h-4 w-4" />;
//     }
//   };
//   const progressPercentage = elapsedTime / totalTime * 100;
//   return <Card className="interview-card animate-fade-in">
//       <CardContent className="p-6">
//         <div className="space-y-6">
//           {/* Time Progress */}
//           <div className="space-y-2">
//             <div className="flex justify-between text-sm">
//               <span className="text-muted-foreground">Interview Progress</span>
//               <span className="text-foreground font-medium">
//                 {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')} / {Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}
//               </span>
//             </div>
//             <div className="w-full bg-muted rounded-full h-2">
//               <div className="bg-gradient-primary h-2 rounded-full transition-all duration-500 ease-out" style={{
//               width: `${Math.min(progressPercentage, 100)}%`
//             }} />
//             </div>
//           </div>

//           {/* Steps Progress */}
//           <div className="space-y-3">
//             <h3 className="text-sm font-semibold text-foreground">Interview Stages</h3>
//             <div className="space-y-2">
//               {steps.map((step, index) => <div key={step.id} className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${step.current ? 'bg-primary/10 border border-primary/20' : step.completed ? 'bg-muted/50' : 'bg-transparent'}`}>
//                   <div className={`
//                     flex items-center justify-center w-8 h-8 rounded-full
//                     ${step.completed ? 'bg-primary text-primary-foreground' : step.current ? 'bg-primary/20 text-primary border-2 border-primary' : 'bg-muted text-muted-foreground'}
//                   `}>
//                     {step.completed ? <CheckCircle2 className="h-4 w-4" /> : getStepIcon(step.type)}
//                   </div>
                  
//                   <div className="flex-1">
//                     <div className={`text-sm font-medium ${step.current ? 'text-primary' : 'text-foreground'}`}>
//                       {step.title}
//                     </div>
//                     {step.current && <div className="text-xs text-muted-foreground mt-1">
//                         Currently in progress...
//                       </div>}
//                   </div>

//                   {/* Connecting Line */}
//                   {index < steps.length - 1}
//                 </div>)}
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>;
// };










// import { Check, ChevronRight, Clock } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// interface InterviewStep {
//   id: string;
//   type: string;
//   title: string;
//   completed: boolean;
//   current: boolean;
// }

// interface InterviewProgressProps {
//   steps: InterviewStep[];
//   currentStep: number;
//   totalTime: number; // in seconds
//   elapsedTime: number; // in seconds
//   onStepClick?: (stepIndex: number) => void;
// }

// export const InterviewProgress = ({ 
//   steps, 
//   currentStep,
//   totalTime,
//   elapsedTime 
// }: InterviewProgressProps) => {
//   // Format time as MM:SS
//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Calculate progress percentage
//   const progressPercentage = (elapsedTime / totalTime) * 100;

//   return (
//     <Card className="interview-card h-full animate-fade-in">
//       <CardHeader>
//         <CardTitle className="text-lg flex items-center justify-between">
//           <span>Interview Progress</span>
//           <span className="text-sm font-normal flex items-center gap-1 text-muted-foreground">
//             <Clock className="h-4 w-4" />
//             {formatTime(elapsedTime)}
//           </span>
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         {/* Progress Bar */}
//         <div className="space-y-2">
//           <div className="flex justify-between text-sm text-muted-foreground">
//             <span>Completed: {Math.min(Math.floor(progressPercentage), 100)}%</span>
//             <span>Total: {formatTime(totalTime)}</span>
//           </div>
//           <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
//             <div
//               className="absolute left-0 top-0 h-full bg-primary transition-all duration-300 ease-in-out"
//               style={{ width: `${Math.min(progressPercentage, 100)}%` }}
//             />
//             <div
//               className="absolute left-0 top-0 h-full bg-primary/30 transition-all duration-300 ease-in-out"
//               style={{ 
//                 width: '100%',
//                 clipPath: `polygon(0 0, ${progressPercentage}% 0, ${progressPercentage}% 100%, 0% 100%)`
//               }}
//             />
//           </div>
//         </div>

//         {/* Steps */}
//         <div className="space-y-4">
//           {steps.map((step, index) => (
//             <div 
//               key={step.id}
//               className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
//                 step.current 
//                   ? 'bg-primary/10 border border-primary/20' 
//                   : 'hover:bg-muted/50'
//               }`}
//             >
//               <div className={`
//                 flex items-center justify-center h-6 w-6 rounded-full flex-shrink-0 mt-0.5
//                 ${step.completed ? 'bg-primary text-primary-foreground' : ''}
//                 ${step.current ? 'border-2 border-primary' : 'border border-muted-foreground'}
//               `}>
//                 {step.completed ? (
//                   <Check className="h-3 w-3" />
//                 ) : (
//                   <span className="text-xs font-medium">
//                     {index + 1}
//                   </span>
//                 )}
//               </div>
//               <div className="flex-1">
//                 <div className={`font-medium ${
//                   step.completed ? 'text-primary' : 
//                   step.current ? 'text-foreground' : 'text-muted-foreground'
//                 }`}>
//                   {step.title}
//                 </div>
//                 <div className="text-xs text-muted-foreground mt-1">
//                   {step.completed ? 'Completed' : 
//                    step.current ? 'In progress' : 'Upcoming'}
//                 </div>
//               </div>
//               {!step.completed && !step.current && (
//                 <ChevronRight className="h-4 w-4 text-muted-foreground mt-1" />
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Current Stage Indicator */}
//         <div className="mt-6 p-3 bg-muted/30 rounded-lg border border-muted">
//           <div className="text-sm font-medium text-muted-foreground">
//             Current Stage
//           </div>
//           <div className="text-lg font-semibold mt-1">
//             {steps.find(step => step.current)?.title || 'Getting Started'}
//           </div>
//           <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
//             <Clock className="h-3 w-3" />
//             <span>
//               {steps.filter(s => s.completed).length} of {steps.length} stages completed
//             </span>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };




import { Check, ChevronRight, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InterviewStep {
  id: string;
  type: string;
  title: string;
  completed: boolean;
  current: boolean;
}

interface InterviewProgressProps {
  steps: InterviewStep[];
  currentStep: number;
  totalTime: number; // in seconds
  elapsedTime: number; // in seconds
  onStepClick?: (stepIndex: number) => void;
}

export const InterviewProgress = ({ 
  steps, 
  currentStep,
  totalTime,
  elapsedTime,
  onStepClick
}: InterviewProgressProps) => {
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progressPercentage = (elapsedTime / totalTime) * 100;

  const handleStepClick = (index: number) => {
    // Only allow clicking on completed steps or the current step
    if (steps[index].completed || steps[index].current) {
      onStepClick?.(index);
    }
  };

  return (
    <Card className="interview-card h-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Interview Progress</span>
          <span className="text-sm font-normal flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            {formatTime(elapsedTime)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Completed: {Math.min(Math.floor(progressPercentage), 100)}%</span>
            <span>Total: {formatTime(totalTime)}</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="absolute left-0 top-0 h-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
            <div
              className="absolute left-0 top-0 h-full bg-primary/30 transition-all duration-300 ease-in-out"
              style={{ 
                width: '100%',
                clipPath: `polygon(0 0, ${progressPercentage}% 0, ${progressPercentage}% 100%, 0% 100%)`
              }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              onClick={() => handleStepClick(index)}
              className={`flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                step.current 
                  ? 'bg-primary/10 border border-primary/20' 
                  : step.completed
                    ? 'hover:bg-primary/5'
                    : 'opacity-70 cursor-not-allowed'
              }`}
            >
              <div className={`
                flex items-center justify-center h-6 w-6 rounded-full flex-shrink-0 mt-0.5
                ${step.completed ? 'bg-primary text-primary-foreground' : ''}
                ${step.current ? 'border-2 border-primary' : 'border border-muted-foreground'}
              `}>
                {step.completed ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <span className="text-xs font-medium">
                    {index + 1}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <div className={`font-medium ${
                  step.completed ? 'text-primary' : 
                  step.current ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {step.completed ? 'Completed' : 
                   step.current ? 'In progress' : 'Upcoming'}
                </div>
              </div>
              {!step.completed && !step.current && (
                <ChevronRight className="h-4 w-4 text-muted-foreground mt-1" />
              )}
            </div>
          ))}
        </div>

        {/* Current Stage Indicator */}
        <div className="mt-6 p-3 bg-muted/30 rounded-lg border border-muted">
          <div className="text-sm font-medium text-muted-foreground">
            Current Stage
          </div>
          <div className="text-lg font-semibold mt-1">
            {steps.find(step => step.current)?.title || 'Getting Started'}
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>
              {steps.filter(s => s.completed).length} of {steps.length} stages completed
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};