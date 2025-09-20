import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, ArrowRight, CheckCircle } from "lucide-react";

interface BehavioralStageProps {
  onComplete: () => void;
}

const behavioralQuestions = [
  {
    id: 1,
    question: "Tell me about a time when you had to work with a difficult team member. How did you handle the situation?",
    placeholder: "Describe the situation, your actions, and the outcome..."
  },
  {
    id: 2,
    question: "Describe a challenging project you worked on. What made it challenging and how did you overcome the obstacles?",
    placeholder: "Explain the project, challenges faced, and your solutions..."
  },
  {
    id: 3,
    question: "How do you stay updated with the latest technology trends and best practices in software development?",
    placeholder: "Share your learning methods and how you apply new knowledge..."
  }
];

export const BehavioralStage = ({ onComplete }: BehavioralStageProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");

  const handleNext = () => {
    const newAnswers = [...answers, currentAnswer];
    setAnswers(newAnswers);
    
    if (currentQuestion < behavioralQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentAnswer("");
    } else {
      onComplete();
    }
  };

  const progress = ((currentQuestion + 1) / behavioralQuestions.length) * 100;
  const question = behavioralQuestions[currentQuestion];

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">Behavioral Questions</CardTitle>
              <CardDescription>
                Question {currentQuestion + 1} of {behavioralQuestions.length}
              </CardDescription>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{question.question}</h3>
            
            <Textarea
              placeholder={question.placeholder}
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              className="min-h-[150px]"
            />
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleNext}
              disabled={!currentAnswer.trim()}
              className="gap-2"
            >
              {currentQuestion < behavioralQuestions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  Complete Behavioral Section
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