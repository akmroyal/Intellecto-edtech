import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Dashboard } from "./pages/Dashboard";
import FinishSignIn from "./components/auth/FinishSignIn";
import SendLink from "./components/auth/SendLink";
import { EmailVerificationChecker } from "./components/auth/EmailVerificationChecker";
import { VerifyEmail } from "./pages/VerifyEmail";
import { auth } from "./components/auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { InterviewPlatform } from "./components/interview/InterviewPlatform";
import ATSChecker from "./pages/ATSChecker";
import { SettingsPage } from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import CreateNewCourse from "./pages/CreateNewCourse";
import TestYourKnowledge from "./pages/TestYourKnowledge";
import CourseStartPage from "./pages/CourseStartPage";
import Courses from "./pages/Courses";
import CoursePage from "./pages/Course";
import MyProgressPage from "./pages/MyProgressPage";
import SkillGapAnalyzer from "./pages/SkillGapAnalyzer";
import FloatingGeminiChat from "./components/FloatingGeminiChat";

const queryClient = new QueryClient();

// Auth protection component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!user.emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Email link authentication routes */}
          <Route path="/sendLink" element={<SendLink />} />
          <Route path="/finishSignIn" element={<FinishSignIn />} />

          {/* Interview Window routes */}
          <Route path="/interview-window" element={<InterviewPlatform />} /> 

          {/* Protected dashboard route with email verification */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <EmailVerificationChecker>
                  <Dashboard />
                </EmailVerificationChecker>
              </ProtectedRoute>
            } 
          />
          <Route
            path="/test"
            element={
              <ProtectedRoute>
                <EmailVerificationChecker>
                  <TestYourKnowledge />
                </EmailVerificationChecker>
              </ProtectedRoute>
            }
          />
          {/* New Course Creation Page */}
          <Route path="/create-course" element={<CreateNewCourse />} />
          <Route path="/create-new-course" element={<CreateNewCourse />} />
    
          <Route path="/course-start" element={<CourseStartPage />} />
          <Route path="/course-start/:id" element={<CourseStartPage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course" element={<CoursePage />} />
          
          <Route path="/my-progress" element={<MyProgressPage />} />

          <Route path="/skill-gap-anlyzer" element={<SkillGapAnalyzer />} />

          {/* ATS Checker Page */}
          <Route 
            path="/ats-checker" 
            element={
              <ProtectedRoute>
                <EmailVerificationChecker>
                  <ATSChecker />
                </EmailVerificationChecker>
              </ProtectedRoute>
            }
          />
          
          {/* Verification page */}
          <Route path="/verify-email" element={<VerifyEmail />} />
          
          {/* Settings page */} 
          <Route path="/settings" element={<SettingsPage />} />

          {/* profile page */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Global Floating AI Chat - Available on all pages */}
        <FloatingGeminiChat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;