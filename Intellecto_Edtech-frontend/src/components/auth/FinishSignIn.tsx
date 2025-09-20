// FinishSignIn.tsx
import React, { useEffect } from "react";
import { auth } from "./firebase";
import {isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

const FinishSignIn: React.FC = () => {

    const {toast} = useToast()

    useEffect(() => {
        const completeSignIn = async () => {
            const email = window.localStorage.getItem("emailForSignIn");
            if (!email) {
                toast({
                    title: "Error",
                    description: "No email found in local storage.",
                });
                return;
            }

            if (isSignInWithEmailLink(auth,window.location.href)) {
                try {
                    const result = await signInWithEmailLink(auth, email, window.location.href);

                    toast({
                        title: "Success",
                        description: "Successfully signed in!",
                    });
                    window.localStorage.removeItem("emailForSignIn");
                    console.log("User:", result.user);
                } catch (error) {
                    console.error("Error signing in:", error);
                }
            }
        };

        completeSignIn();
    }, []);

    return <p>Finishing sign-in...</p>;
};

export default FinishSignIn;
