import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Code2, ArrowRight, CheckCircle } from "lucide-react";

interface TechnicalStageProps {
  onComplete: () => void;
}

const technicalQuestions = [
  {
    id: 1,
    question: "What is the time complexity of binary search algorithm?",
    options: [
      { id: 'a', text: 'O(n)', isCorrect: false },
      { id: 'b', text: 'O(log n)', isCorrect: true },
      { id: 'c', text: 'O(n²)', isCorrect: false },
      { id: 'd', text: 'O(1)', isCorrect: false }
    ]
  },
  {
    id: 2,
    question: "Which data structure is best for implementing a LIFO (Last In, First Out) structure?",
    options: [
      { id: 'a', text: 'Queue', isCorrect: false },
      { id: 'b', text: 'Array', isCorrect: false },
      { id: 'c', text: 'Stack', isCorrect: true },
      { id: 'd', text: 'Linked List', isCorrect: false }
    ]
  },
  {
    id: 3,
    question: "What is the main advantage of using React hooks?",
    options: [
      { id: 'a', text: 'Better performance', isCorrect: false },
      { id: 'b', text: 'Smaller bundle size', isCorrect: false },
      { id: 'c', text: 'State management in functional components', isCorrect: true },
      { id: 'd', text: 'Easier debugging', isCorrect: false }
    ]
  }
];

export const TechnicalStage = ({ onComplete }: TechnicalStageProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleNext = () => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    
    if (currentQuestion < technicalQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      onComplete();
    }
  };

  const progress = ((currentQuestion + 1) / technicalQuestions.length) * 100;
  const question = technicalQuestions[currentQuestion];

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Code2 className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">Technical Questions</CardTitle>
              <CardDescription>
                Question {currentQuestion + 1} of {technicalQuestions.length}
              </CardDescription>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{question.question}</h3>
            
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              <div className="space-y-3">
                {question.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id} className="cursor-pointer">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="gap-2"
            >
              {currentQuestion < technicalQuestions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  Complete Technical Section
                  <CheckCircle className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};