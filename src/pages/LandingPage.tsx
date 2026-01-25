import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Sparkles,
    Target,
    TrendingUp,
    BrainCircuit,
    ArrowRight,
    ShieldCheck,
    Globe,
    Zap,
    BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-10 flex justify-between items-center bg-black/50 backdrop-blur-xl border-b border-white/5">
                <Link to="/" className="font-serif text-2xl font-bold tracking-tighter hover:text-emerald-500 transition-colors">
                    LAGOS FASHION <span className="text-emerald-500 italic">INTEL</span>
                </Link>
                <Link to="/login">
                    <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/5 font-bold">
                        Partner Login
                    </Button>
                </Link>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 md:pt-40 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] md:h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-black to-black -z-10" />
                <div className="absolute top-40 left-1/2 -translate-x-1/2 w-full h-full bg-[url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2574&auto=format&fit=crop')] opacity-[0.03] mix-blend-overlay -z-10" />

                <div className="container mx-auto max-w-6xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold tracking-[0.2em] mb-8">
                            <Sparkles className="w-3 h-3" />
                            Next-Gen Market Architecture
                        </div>
                        <h1 className="text-5xl md:text-8xl font-serif font-bold mb-8 leading-[1] tracking-tight">
                            The Future of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600">Fashion Capital</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                            Lagos Fashion Intel is the OS for high-stakes fashion investments.
                            AI-driven market gap identification, sponsor matching, and precision strategy architecture.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <Link to="/login">
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white h-16 px-12 rounded-2xl text-lg font-bold shadow-2xl shadow-emerald-500/20 group">
                                    Enter Intelligence Suite
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button variant="outline" className="border-white/10 hover:bg-white/5 h-16 px-12 rounded-2xl text-lg font-medium text-white">
                                    Apply for Network Access
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Feature Matrix */}
            <section className="py-24 px-6 bg-zinc-950/50 border-t border-white/5">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Target,
                                title: "Gap Discovery",
                                desc: "Automated analysis of 1,000+ data points to identify untapped niches in the $1.2B Lagos fashion market."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Verified Intelligence",
                                desc: "Proprietary verification system for sponsor ROI and event performance metrics. No more guessing."
                            },
                            {
                                icon: BrainCircuit,
                                title: "AI Sponsorship Pro",
                                desc: "Advanced match-making algorithm connecting luxury brands with high-potential event architectures."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="bg-white/5 border-white/10 hover:border-emerald-500/30 transition-all duration-500 group">
                                    <CardContent className="p-8">
                                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <item.icon className="w-6 h-6 text-emerald-500" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                                        <p className="text-zinc-500 leading-relaxed text-sm">
                                            {item.desc}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dashboard Preview / Mock */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="container mx-auto max-w-6xl">
                    <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-3xl">
                        <div className="absolute inset-0 bg-emerald-900/10 backdrop-blur-3xl -z-10" />
                        <div className="p-4 md:p-12">
                            <div className="flex flex-col md:flex-row gap-12 items-center">
                                <div className="flex-1 space-y-8">
                                    <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                                        Monitor the Market <br />
                                        In Real-Time
                                    </h2>
                                    <div className="space-y-6">
                                        {[
                                            { icon: Zap, text: "98% Accuracy in Market Trend Prediction" },
                                            { icon: Globe, text: "Connect with Global High-Net-Worth Sponsors" },
                                            { icon: BarChart3, text: "Full Financial Visibility into Event Lifecycle" }
                                        ].map((li, idx) => (
                                            <div key={idx} className="flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                                    <li.icon className="w-4 h-4 text-emerald-500" />
                                                </div>
                                                <span className="text-lg text-zinc-300">{li.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Button className="bg-white text-black hover:bg-zinc-200 h-14 px-8 rounded-xl font-bold flex items-center gap-2">
                                        View Demo Dashboard <TrendingUp className="w-5 h-5" />
                                    </Button>
                                </div>
                                <div className="flex-1 w-full relative">
                                    <div className="aspect-square rounded-3xl bg-zinc-900 border border-white/10 flex items-center justify-center relative group">
                                        <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-zinc-900 animate-pulse" />
                                        <BrainCircuit className="w-32 h-32 text-emerald-500 absolute z-10 opacity-20 group-hover:opacity-40 transition-opacity" />
                                        <div className="z-10 text-center px-8">
                                            <p className="font-mono text-emerald-500 text-xs mb-4 tracking-widest">LIVE ANALYTICS</p>
                                            <h4 className="text-2xl font-bold mb-2">Architecting Value</h4>
                                            <p className="text-sm text-zinc-500">Processing 15,000+ social signals and investment flows daily.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-white/5 text-center">
                <div className="mb-8 font-serif text-xl font-bold">
                    LAGOS FASHION <span className="text-emerald-500">INTEL</span>
                </div>
                <p className="text-zinc-500 text-sm mb-8">© 2026 Lagos Fashion Intelligence. All rights reserved. Strategic Partner Network.</p>
                <div className="flex justify-center gap-8 text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
                    <a href="#" className="hover:text-emerald-500 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-emerald-500 transition-colors">Terms</a>
                    <a href="#" className="hover:text-emerald-500 transition-colors">Contact</a>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
