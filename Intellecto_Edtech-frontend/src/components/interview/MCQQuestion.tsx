// import { useState } from "react";
// import { CheckCircle2, Clock, ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// interface MCQOption {
//   id: string;
//   text: string;
//   isCorrect?: boolean;
// }

// interface MCQQuestionProps {
//   question: string;
//   options: MCQOption[];
//   timeLimit?: number;
//   onAnswer: (selectedOption: string) => void;
//   onTimeUp?: () => void;
// }

// export const MCQQuestion = ({ 
//   question, 
//   options, 
//   timeLimit = 60, 
//   onAnswer, 
//   onTimeUp 
// }: MCQQuestionProps) => {
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);
//   const [timeLeft, setTimeLeft] = useState(timeLimit);
//   const [isAnswered, setIsAnswered] = useState(false);

//   // Timer effect would go here in a real implementation
  
//   const handleOptionSelect = (optionId: string) => {
//     if (isAnswered) return;
//     setSelectedOption(optionId);
//   };

//   const handleSubmit = () => {
//     if (!selectedOption) return;
//     setIsAnswered(true);
//     onAnswer(selectedOption);
//   };

//   return (
//     <Card className="interview-card max-w-4xl mx-auto animate-slide-up">
//       <CardHeader className="text-center pb-4">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-2 text-muted-foreground">
//             <Clock className="h-4 w-4" />
//             <span className="text-sm font-medium">{timeLeft}s remaining</span>
//           </div>
//           <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
//             Multiple Choice
//           </div>
//         </div>
//         <CardTitle className="text-xl md:text-2xl text-foreground leading-relaxed">
//           {question}
//         </CardTitle>
//       </CardHeader>
      
//       <CardContent className="space-y-4">
//         <div className="grid gap-4">
//           {options.map((option, index) => (
//             <div
//               key={option.id}
//               onClick={() => handleOptionSelect(option.id)}
//               className={`mcq-option ${selectedOption === option.id ? 'selected' : ''} animate-fade-in`}
//               style={{ animationDelay: `${index * 0.1}s` }}
//             >
//               <div className="flex items-center gap-4">
//                 <div className={`
//                   w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold
//                   ${selectedOption === option.id 
//                     ? 'bg-primary text-primary-foreground border-primary' 
//                     : 'border-muted-foreground text-muted-foreground'
//                   }
//                 `}>
//                   {String.fromCharCode(65 + index)}
//                 </div>
//                 <div className="flex-1 text-foreground">{option.text}</div>
//                 {selectedOption === option.id && !isAnswered && (
//                   <CheckCircle2 className="h-5 w-5 text-primary animate-scale-in" />
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {selectedOption && !isAnswered && (
//           <div className="flex justify-center pt-6 animate-fade-in">
//             <Button 
//               onClick={handleSubmit}
//               className="voice-button px-8 py-3"
//               size="lg"
//             >
//               Submit Answer
//               <ArrowRight className="ml-2 h-4 w-4" />
//             </Button>
//           </div>
//         )}

//         {isAnswered && (
//           <div className="text-center py-4 animate-scale-in">
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full">
//               <CheckCircle2 className="h-4 w-4" />
//               <span className="font-medium">Answer Submitted</span>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };


import { useState, useEffect } from "react";
import { CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MCQOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

interface MCQQuestionProps {
  question: string;
  options: MCQOption[];
  timeLimit?: number;
  onAnswer: (selectedOption: string) => void;
  onTimeUp?: () => void;
}

export const MCQQuestion = ({ 
  question, 
  options, 
  timeLimit = 60, 
  onAnswer, 
  onTimeUp 
}: MCQQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isAnswered, setIsAnswered] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsAnswered(true);
    onAnswer(selectedOption);
  };

  return (
    <Card className="interview-card max-w-4xl mx-auto animate-slide-up">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">{timeLeft}s remaining</span>
          </div>
          <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Multiple Choice
          </div>
        </div>
        <CardTitle className="text-xl md:text-2xl text-foreground leading-relaxed">
          {question}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {options.map((option, index) => (
            <div
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={`mcq-option p-4 rounded-lg cursor-pointer transition-all ${
                selectedOption === option.id 
                  ? 'bg-primary/10 border-primary border-2' 
                  : 'bg-muted/50 hover:bg-muted/70'
              } animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <div className={`
                  w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold
                  ${selectedOption === option.id 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'border-muted-foreground text-muted-foreground'
                  }
                `}>
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="flex-1 text-foreground">{option.text}</div>
                {selectedOption === option.id && !isAnswered && (
                  <CheckCircle2 className="h-5 w-5 text-primary animate-scale-in" />
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedOption && !isAnswered && (
          <div className="flex justify-center pt-6 animate-fade-in">
            <Button 
              onClick={handleSubmit}
              className="voice-button px-8 py-3"
              size="lg"
            >
              Submit Answer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {isAnswered && (
          <div className="text-center py-4 animate-scale-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full">
              <CheckCircle2 className="h-4 w-4" />
              <span className="font-medium">Answer Submitted</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};