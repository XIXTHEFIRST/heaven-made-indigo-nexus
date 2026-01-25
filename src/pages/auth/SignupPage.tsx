import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, Mail, Lock, User, ArrowRight } from 'lucide-react';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState<'Researcher' | 'Viewer'>('Viewer');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error: signupError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    }
                }
            });

            if (signupError) throw signupError;

            if (data.user) {
                // The trigger in SQL should handle profile creation, 
                // but often we need to explicitly update if it doesn't.
                // In our schema.sql, we have the profiles table but no trigger for insert of auth.users yet.
                // Let's manually create the profile to be sure.
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        { id: data.user.id, full_name: fullName, role: role }
                    ]);

                if (profileError) {
                    console.error('Profile creation error:', profileError);
                    // Even if profile fails, user is created. We might want to notify.
                }
            }

            toast.success('Account created! Please check your email for verification.');
            navigate('/login');
        } catch (error: any) {
            toast.error(error.message || 'Failed to sign up');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-700/10 blur-[120px] rounded-full" />

            <div className="relative z-10 w-full max-w-md px-4">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-serif font-bold tracking-tight text-white mb-2">LAGOS FASHION <span className="text-emerald-500">INTEL</span></h1>
                    <p className="text-zinc-400">Apply for exclusive access to the intelligence network</p>
                </div>

                <Card className="glass-dark border-white/10">
                    <CardHeader>
                        <CardTitle className="text-xl text-white">Sign Up</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Fill in your details to get started
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSignup}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-zinc-300">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                                    <Input
                                        id="fullName"
                                        type="text"
                                        placeholder="John Doe"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:ring-emerald-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-zinc-300">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:ring-emerald-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-zinc-300">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 bg-white/5 border-white/10 text-white focus:ring-emerald-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role" className="text-zinc-300">Desired Role</Label>
                                <Select value={role} onValueChange={(value: any) => setRole(value)}>
                                    <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-emerald-500">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                        <SelectItem value="Viewer">Viewer (Read-only)</SelectItem>
                                        <SelectItem value="Researcher">Researcher (Edit data)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <Button
                                type="submit"
                                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white transition-all shadow-lg shadow-emerald-700/20"
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        Create Account <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                            <div className="text-center text-sm text-zinc-400">
                                Already have an account?{' '}
                                <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium font-serif">
                                    Sign In
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default SignupPage;
