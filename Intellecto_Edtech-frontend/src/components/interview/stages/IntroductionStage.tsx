import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { UserCheck, ArrowRight } from "lucide-react";

interface IntroductionStageProps {
  onComplete: () => void;
}

export const IntroductionStage = ({ onComplete }: IntroductionStageProps) => {
  const [response, setResponse] = useState("");

  const handleSubmit = () => {
    if (response.trim()) {
      onComplete();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <UserCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Introduction & Background</CardTitle>
              <CardDescription>
                Let's start by getting to know you better
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tell us about yourself</h3>
            <p className="text-muted-foreground">
              Please introduce yourself and share your background in software development. 
              Include your experience, skills, and what motivates you in your career.
            </p>
            
            <Textarea
              placeholder="I'm a software developer with experience in..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleSubmit}
              disabled={!response.trim()}
              className="gap-2"
            >
              Continue to Technical Questions
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};