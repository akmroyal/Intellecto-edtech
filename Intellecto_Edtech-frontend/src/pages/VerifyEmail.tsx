import { useState, useEffect } from "react";
import { auth } from "@/components/auth/firebase";
import { sendEmailVerification, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ShieldCheck, RefreshCw } from "lucide-react";
import { db } from "@/components/auth/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";


export const VerifyEmail = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(auth.currentUser);

    const { toast } = useToast();


    const storeVerifiedUserData = async (user: User) => {
        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    email: user.email,
                    name: user.displayName || "Anonymous",
                    createdAt: new Date(),
                    userId: user.uid,
                });
                console.log("✅ Verified user data stored successfully.");
            } else {
                console.log("ℹ️ User already exists in DB.");
            }
        } catch (error) {
            console.error("❌ Error saving user data:", error);
        }
    };



    // Keep user reference updated
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleResend = async () => {
        if (!user) return;

        setIsLoading(true);
        try {
            await sendEmailVerification(user);
            setCountdown(30);
        } catch (error) {
            console.error("Error resending verification:", error);
            toast({
                title: "Error",
                description: "Failed to resend verification email.",
            });
        }
        setIsLoading(false);
    };

    const checkVerification = async () => {
        if (!user) {
            navigate("/");
            return false;
        }

        try {
            await user.getIdToken(true);
            await user.reload();
            const refreshedUser = auth.currentUser;
            //addition
            if (refreshedUser?.emailVerified) {
                console.log("Trying to write user data:", {
                    name: user.displayName,
                    email: user.email,
                    userId: user.uid,
                });
                //addition done

                await storeVerifiedUserData(refreshedUser);
                navigate("/dashboard");
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error checking verification:", error);
            return false;
        }
    };

    // Auto-redirect when verified
    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }

        const interval = setInterval(async () => {
            const isVerified = await checkVerification();
            if (isVerified) clearInterval(interval);
        }, 2000);

        const timer = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => {
            clearInterval(interval);
            clearInterval(timer);
        };
    }, [user, navigate]);

    return (
        <div className="min-h-screen gradient-background flex items-center justify-center p-4 relative overflow-hidden">
            {/* Floating animated elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-purple-500/10 animate-float animation-delay-100"></div>
                <div className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full bg-primary/5 animate-float animation-delay-300"></div>
                <div className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full bg-accent/10 animate-float animation-delay-500"></div>
                <div className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full bg-purple-500/15 animate-float animation-delay-700"></div>

                {/* Animated icons */}
                <Mail className="absolute top-20 left-20 text-primary/20 w-12 h-12 animate-float animation-delay-200" />
                <ShieldCheck className="absolute bottom-20 right-20 text-accent/20 w-12 h-12 animate-float animation-delay-400" />
                <RefreshCw className="absolute top-1/2 right-40 text-purple-500/20 w-10 h-10 animate-spin-slow" />
            </div>

            {/* Main card with glass effect */}
            <Card className="glass w-full max-w-md relative z-10 animate-scale-in hover-lift">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent text-center">
                        Verify Your Email
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-center space-y-2">
                        <p className="text-muted-foreground">
                            We've sent a verification link to <strong className="text-primary">{user?.email}</strong>
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Please check your inbox and click the link to verify your account.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Button
                            onClick={handleResend}
                            disabled={isLoading || countdown > 0}
                            className="w-full hover-glow"
                        >
                            {isLoading ? (
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            ) : countdown > 0 ? (
                                `Resend in ${countdown}s`
                            ) : (
                                "Resend Verification Email"
                            )}
                        </Button>

                        <Button
                            variant="outline"
                            onClick={async () => {
                                const isVerified = await checkVerification();
                                if (!isVerified) {
                                    toast({
                                        title: "Verification Required",
                                        description: "Please verify your email first.",
                                    });
                                }
                            }}
                            className="w-full hover-scale"
                        >
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            I've verified my email
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};