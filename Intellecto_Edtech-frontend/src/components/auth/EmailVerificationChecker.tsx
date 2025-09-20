import { useEffect } from "react";
import { auth } from "@/components/auth/firebase";
import { useNavigate } from "react-router-dom";

export const EmailVerificationChecker = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                // Reload the user to get fresh verification status
                await user.reload();

                if (!user.emailVerified) {
                    navigate("/verify-email");
                }
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return <>{children}</>;
};