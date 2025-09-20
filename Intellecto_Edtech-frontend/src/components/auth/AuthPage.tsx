import { useState } from "react";
import { Code, BookOpen, Laptop, Zap, Brain, Lightbulb, Monitor, Coffee, Terminal, Github } from "lucide-react";
import { AuthCard } from "./AuthCard";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-interactive bg-[length:200%_200%] animate-gradient-shift flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements with interactive gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/15 rounded-full blur-3xl animate-float animate-glow" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-3/4 left-1/3 w-72 h-72 bg-primary-glow/12 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }}></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-primary/8 rounded-full blur-3xl animate-glow" style={{ animationDelay: "4s" }}></div>
      </div>

      {/* Floating coding/study icons with directional movement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        {/* Top Row - Diagonal Movement */}
        <Code 
          className="absolute top-[8%] left-[12%] text-primary/50 animate-move-diagonal-1 animate-icon-glow" 
          size={28} 
          style={{ animationDelay: "0s" }}
        />
        <BookOpen 
          className="absolute top-[18%] right-[15%] text-primary-glow/45 animate-move-wave animate-icon-glow" 
          size={26} 
          style={{ animationDelay: "2s" }}
        />
        <Laptop 
          className="absolute top-[12%] left-[65%] text-primary/40 animate-move-circular animate-icon-glow" 
          size={30} 
          style={{ animationDelay: "4s" }}
        />
        
        {/* Upper Middle Row - Wave and Circular Movement */}
        <Brain 
          className="absolute top-[32%] left-[8%] text-primary-glow/50 animate-move-diagonal-2 animate-icon-glow" 
          size={24} 
          style={{ animationDelay: "1s" }}
        />
        <Terminal 
          className="absolute top-[38%] right-[18%] text-primary/45 animate-move-wave animate-icon-glow" 
          size={22} 
          style={{ animationDelay: "3s" }}
        />
        <Lightbulb 
          className="absolute top-[28%] left-[75%] text-primary-glow/40 animate-move-diagonal-1 animate-icon-glow" 
          size={26} 
          style={{ animationDelay: "5s" }}
        />
        
        {/* Center Row - Mixed Movement Patterns */}
        <Github 
          className="absolute top-[52%] left-[20%] text-primary/50 animate-move-circular animate-icon-glow" 
          size={28} 
          style={{ animationDelay: "6s" }}
        />
        <Monitor 
          className="absolute top-[48%] right-[25%] text-primary-glow/45 animate-move-diagonal-2 animate-icon-glow" 
          size={30} 
          style={{ animationDelay: "7s" }}
        />
        <Coffee 
          className="absolute top-[58%] left-[70%] text-primary/40 animate-move-wave animate-icon-glow" 
          size={24} 
          style={{ animationDelay: "8s" }}
        />
        
        {/* Lower Row - Advanced Movement */}
        <Zap 
          className="absolute bottom-[25%] left-[15%] text-primary-glow/50 animate-move-diagonal-1 animate-icon-glow" 
          size={22} 
          style={{ animationDelay: "9s" }}
        />
        <Code 
          className="absolute bottom-[18%] right-[20%] text-primary/45 animate-move-circular animate-icon-glow" 
          size={20} 
          style={{ animationDelay: "10s" }}
        />
        <BookOpen 
          className="absolute bottom-[30%] left-[68%] text-primary-glow/40 animate-move-wave animate-icon-glow" 
          size={24} 
          style={{ animationDelay: "11s" }}
        />
        
        {/* Scattered Additional Icons for Continuous Movement */}
        <Brain 
          className="absolute top-[68%] left-[35%] text-primary/35 animate-move-diagonal-2 animate-icon-glow" 
          size={18} 
          style={{ animationDelay: "12s" }}
        />
        <Terminal 
          className="absolute bottom-[45%] right-[8%] text-primary-glow/35 animate-move-diagonal-1 animate-icon-glow" 
          size={20} 
          style={{ animationDelay: "13s" }}
        />
        <Lightbulb 
          className="absolute top-[78%] left-[42%] text-primary/40 animate-move-circular animate-icon-glow" 
          size={22} 
          style={{ animationDelay: "14s" }}
        />
        <Monitor 
          className="absolute top-[22%] left-[45%] text-primary-glow/30 animate-move-wave animate-icon-glow" 
          size={16} 
          style={{ animationDelay: "15s" }}
        />
        <Github 
          className="absolute bottom-[12%] left-[85%] text-primary/35 animate-move-diagonal-2 animate-icon-glow" 
          size={18} 
          style={{ animationDelay: "16s" }}
        />
      </div>

      {/* Main auth card */}
      <div className="relative z-10">
        <AuthCard className="animate-in fade-in-0 zoom-in-95 duration-500">
          {isLogin ? (
            <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
          ) : (
            <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </AuthCard>
      </div>

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      ></div>
    </div>
  );
}