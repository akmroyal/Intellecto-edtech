import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl border border-border/50",
      "bg-card/80 backdrop-blur-glass",
      "shadow-elegant",
      "p-8 w-full max-w-md",
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/10 before:to-transparent before:pointer-events-none",
      className
    )}>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}