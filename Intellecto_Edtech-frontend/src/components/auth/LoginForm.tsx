import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/components/auth/firebase"; 
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const navigate = useNavigate();
  const {toast} = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login successful:", userCredential.user);
    navigate("/dashboard"); // Redirect to dashboard
  } catch (error: any) {
    console.error("Login error:", error.message);

    toast({
      title: "Error",
      description: error.message,
    });
  }
  setIsLoading(false);
};
  const handleForgotPassword = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email to reset password.",
      })

      
      return;
    }
    try {
      await sendPasswordResetEmail(auth,email);
      setResetSent(true);
      toast({
        title: "Password Reset",
        description: "Password reset email sent! Check your inbox.",
      });
    } catch (error: any) {
      console.error("Error sending password reset email:", error.message);
      toast({
        title: "Error",
        description: error.message,
      });
    }
  };
  


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Welcome 
        </h1>
        <p className="text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2">
          </label>
          <button onClick={handleForgotPassword} type="button" className="text-primary hover:underline">
            Forgot password?
          </button>
        </div>
      </div>
      {resetSent && (
        <div className="text-green-600 text-sm mt-2 animate-fade-up">
          Password reset email sent! Check your inbox.
        </div>
      )}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>

      <div className="text-center">
        <p>
          Don’t have an account?{" "}
          <button type="button" onClick={onSwitchToSignup} className="text-primary font-medium">
            Sign up
          </button>
        </p>
      </div>
    </form>
  );
}
