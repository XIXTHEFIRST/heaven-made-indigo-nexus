import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Mail, Lock, ArrowRight } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            toast.success('Logged in successfully!');
            navigate(from, { replace: true });
        } catch (error: any) {
            toast.error(error.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-700/10 blur-[120px] rounded-full" />

            <div className="relative z-10 w-full max-w-md px-4">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-serif font-bold tracking-tight text-white mb-2">LAGOS FASHION <span className="text-emerald-500">INTEL</span></h1>
                    <p className="text-zinc-400">Strategic Intelligence for High-Stakes Fashion Markets</p>
                </div>

                <Card className="glass-dark border-white/10">
                    <CardHeader>
                        <CardTitle className="text-xl text-white">Login</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Enter your credentials to access the platform
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleLogin}>
                        <CardContent className="space-y-4">
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
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-zinc-300">Password</Label>
                                    <a href="#" className="text-sm text-emerald-400 hover:text-emerald-300">
                                        Forgot password?
                                    </a>
                                </div>
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
                                        Sign In <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                            <div className="text-center text-sm text-zinc-400 pb-2">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-emerald-400 hover:text-emerald-300 font-medium font-serif">
                                    Apply for Access
                                </Link>
                            </div>
                            <div className="pt-4 border-t border-white/5 text-center">
                                <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-500/60 mb-2">Investor / Demo Mode</p>
                                <p className="text-xs text-zinc-500 italic">Use public demo credentials to explore the system's capabilities.</p>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
