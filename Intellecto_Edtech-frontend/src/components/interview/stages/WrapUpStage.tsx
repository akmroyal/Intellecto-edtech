import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Calendar, Mail, Phone } from "lucide-react";

interface WrapUpStageProps {
  onFinish: () => void;
}

export const WrapUpStage = ({ onFinish }: WrapUpStageProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Interview Complete!</CardTitle>
              <CardDescription>
                Thank you for participating in our interview process
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">What happens next?</h3>
            
            <div className="grid gap-4">
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Calendar className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Evaluation Process</h4>
                  <p className="text-sm text-muted-foreground">
                    Our team will review your responses within 2-3 business days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Follow-up Communication</h4>
                  <p className="text-sm text-muted-foreground">
                    You'll receive an email with detailed feedback and next steps.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Phone className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Additional Rounds</h4>
                  <p className="text-sm text-muted-foreground">
                    If selected, we'll schedule a technical discussion with our team.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                We appreciate the time you've invested in this interview process.
              </p>
              <Button onClick={onFinish} size="lg" className="w-full sm:w-auto">
                Submit Interview
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};