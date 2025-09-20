import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '@/components/auth/firebase';
import { sendPasswordResetEmail, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lock, Trash2, ShieldAlert, CheckCircle2, MailCheck, Moon, Sun, Settings } from 'lucide-react';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export const SettingsPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { toast } = useToast();


    const deleteUserData = async (userId: string) => {
        try {
            const userRef = doc(db, "users", userId);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                await deleteDoc(userRef);
                toast({
                    title: "✅ Success",
                    description: "Your user data has been deleted from our database.",
                    variant: "default",
                });
                return true;
            } else {
                toast({
                    title: "ℹ️ Info",
                    description: "No user data found to delete.",
                    variant: "default",
                });
                return false;
            }
        } catch (error) {
            toast({
                title: "❌ Error",
                description: "Failed to delete user data from database.",
                variant: "destructive",
            });
            throw error;
        }
    };

    const handleDeleteAccount = async () => {
        try {
            if (!auth.currentUser) {
                toast({
                    title: "❌ Error",
                    description: "No authenticated user found.",
                    variant: "destructive",
                });
                return;
            }

            setIsLoading(true);
            setError('');

            // Reauthenticate
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email || '',
                currentPassword
            );
            await reauthenticateWithCredential(auth.currentUser, credential);

            // Delete user data
            await deleteUserData(auth.currentUser.uid);

            // Delete auth account
            await deleteUser(auth.currentUser);

            toast({
                title: "✅ Account Deleted",
                description: "Your account and all data have been permanently removed.",
                variant: "default",
            });

            setTimeout(() => navigate('/'), 1500);

        } catch (err: any) {
            toast({
                title: "❌ Deletion Failed",
                description: err.message || "Could not delete account. Please try again.",
                variant: "destructive",
            });
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        try {
            if (!auth.currentUser?.email) {
                toast({
                    title: "❌ Error",
                    description: "No email associated with this account.",
                    variant: "destructive",
                });
                return;
            }

            setIsLoading(true);
            setError('');
            await sendPasswordResetEmail(auth, auth.currentUser.email);

            toast({
                title: "📧 Email Sent",
                description: "Password reset link sent to your email address.",
                variant: "default",
            });

        } catch (err: any) {
            toast({
                title: "❌ Error",
                description: err.message || "Failed to send password reset email.",
                variant: "destructive",
            });
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent">
            {/* Header */}
            <header className="glass border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to Dashboard</span>
                        </button>

                        <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>

                        <div className="w-10"></div> {/* Spacer for alignment */}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-3xl mx-auto px-6 py-8 space-y-8">
                {/* Success/Error Messages */}
                {success && (
                    <div className="glass border border-green-500/30 p-4 rounded-lg flex items-center space-x-3 text-green-400">
                        <CheckCircle2 className="w-5 h-5" />
                        <p>{success}</p>
                    </div>
                )}

                {error && (
                    <div className="glass border border-red-500/30 p-4 rounded-lg flex items-center space-x-3 text-red-400">
                        <ShieldAlert className="w-5 h-5" />
                        <p>{error}</p>
                    </div>
                )}

                {/* Change Password Section */}
                <div className="glass rounded-xl p-6 animate-fade-up">
                    <div className="flex items-center space-x-3 mb-6">
                        <Lock className="w-6 h-6 text-primary" />
                        <h2 className="text-xl font-semibold text-foreground">Change Password</h2>
                    </div>

                    <p className="text-muted-foreground mb-6">
                        Need to update your password? We'll send you a link to reset it.
                    </p>

                    <Button
                        onClick={handlePasswordReset}
                        disabled={isLoading}
                        className="gradient-primary hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.4)] transition-all"
                    >
                        {isLoading ? 'Sending...' : 'Send Password Reset Email'}
                    </Button>
                </div>

                {/* Delete Account Section */}
                <div className="glass rounded-xl p-6 animate-fade-up border border-destructive/30">
                    <div className="flex items-center space-x-3 mb-6">
                        <Trash2 className="w-6 h-6 text-destructive" />
                        <h2 className="text-xl font-semibold text-foreground">Delete Account</h2>
                    </div>

                    <p className="text-muted-foreground mb-6">
                        This will permanently delete your account and all associated data. This action cannot be undone.
                    </p>

                    <Button
                        variant="destructive"
                        onClick={() => setIsDeleteDialogOpen(true)}
                        disabled={isLoading}
                        className="hover:shadow-[0_0_20px_-5px_hsl(var(--destructive)/0.4)] transition-all"
                    >
                        Delete My Account
                    </Button>
                </div>

            </main>

            {/* Delete Account Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="glass border-border/50">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-destructive">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="space-y-4 py-4">
                        <Label htmlFor="currentPassword">Enter your current password to confirm</Label>
                        <Input
                            id="currentPassword"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Current password"
                            className="bg-card/50"
                        />
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteAccount}
                            disabled={!currentPassword || isLoading}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            {isLoading ? 'Deleting...' : 'Delete Account'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};