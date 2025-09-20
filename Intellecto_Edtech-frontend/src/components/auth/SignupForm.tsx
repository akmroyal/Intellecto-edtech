import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { auth } from "@/components/auth/firebase";
import api from "@/lib/api";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Toast } from "@radix-ui/react-toast";
import { useToast } from "@/hooks/use-toast";

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    user_name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update profile with display name (First + Last)
      const combinedName = `${formData.firstName} ${formData.lastName}`.trim();
      await updateProfile(userCredential.user, {
        displayName: combinedName || undefined
      });

      // Persist a small user metadata object locally (backend/signup integration can use this later)
      try {
        const userMeta = {
          uid: userCredential.user.uid,
          firstName: formData.firstName,
          lastName: formData.lastName,
          fullName: combinedName,
          user_name: formData.user_name,
          email: formData.email,
        };
        localStorage.setItem("it_user_meta", JSON.stringify(userMeta));
      } catch (e) {
        // ignore localStorage errors
      }

      // Best-effort: create user on backend as well
      (async () => {
        try {
          const currentUser = auth.currentUser;
          let idToken: string | null = null;
          if (currentUser) {
            idToken = await currentUser.getIdToken();
          }

          const payload = {
            username: formData.user_name,
            email: formData.email,
            password: formData.password,
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: "student"
          };

          const headers: Record<string, string> = {};
          if (idToken) headers["Authorization"] = `Bearer ${idToken}`;

          await api.post("/users/", payload);
        } catch (err) {
          // non-blocking: log and continue
          console.warn("Backend user creation failed:", err);
        }
      })();

      // Send verification email
      await sendEmailVerification(userCredential.user);

  // Navigate to verify email page and pass user info along
  navigate("/verify-email", { state: { email: formData.email, user_name: formData.user_name, fullName: combinedName } });

    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Signup error:", message);
      toast({
        title: "Error",
        description: message,
      });
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Create account
        </h1>
        <p className="text-muted-foreground">Join us and start your journey today</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                placeholder="First name"
                required
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                placeholder="Last name"
                required
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="user_name">Username</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="user_name"
              type="text"
              value={formData.user_name}
              onChange={(e) => handleChange("user_name", e.target.value)}
              placeholder="Choose a username"
              required
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
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
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Create a password"
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

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              placeholder="Confirm your password"
              required
              className="pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="text-sm">
          <label className="flex items-start space-x-2">
            <input type="checkbox" required className="mt-1" />
            <span>
              I agree to the{" "}
              <button type="button" className="text-primary hover:underline">
                Terms of Service
              </button>{" "}
              and{" "}
              <button type="button" className="text-primary hover:underline">
                Privacy Policy
              </button>
            </span>
          </label>
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Creating account..." : "Create account"}
      </Button>

      <div className="text-center">
        <p>
          Already have an account?{" "}
          <button type="button" onClick={onSwitchToLogin} className="text-primary font-medium">
            Sign in
          </button>
        </p>
      </div>
    </form>
  );
}
