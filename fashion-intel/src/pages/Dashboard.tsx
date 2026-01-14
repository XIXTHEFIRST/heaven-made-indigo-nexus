import { Navigation } from "@/components/Navigation";
import { CoachChat } from "@/components/intelligence/CoachChat";
import { StatCard } from "@/components/intelligence/StatCard";
import { ChartCard } from "@/components/intelligence/ChartCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIntelligenceStore } from "@/stores/intelligenceStore";
import {
    Calendar,
    Users,
    TrendingUp,
    Target,
    ArrowRight,
    Search,
    BrainCircuit,
    Zap,
    Sparkles,
    BarChart3
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Dashboard = () => {
    const { events, sponsors, myEvents } = useIntelligenceStore();

    // Stats calculation
    const totalEvents = events.length;
    const activeStrategies = myEvents.length;
    const marketVelocity = "Expanding";
    const coachScore = "A-";

    // Charts data
    const monthlyTrendData = [
        { name: "Jan", interest: 45 },
        { name: "Feb", interest: 52 },
        { name: "Mar", interest: 48 },
        { name: "Apr", interest: 70 },
        { name: "May", interest: 85 },
        { name: "Jun", interest: 92 },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen bg-background text-white">
            <Navigation />

            <main className="pt-24 pb-12">
                <div className="container mx-auto px-6">
                    {/* Coach Identity Hero */}
                    <div className="relative mb-12 p-1 md:p-12 rounded-[2.5rem] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-intelligence-primary/20 via-background to-intelligence-accent/10 z-0" />
                        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2574&auto=format&fit=crop')] opacity-5 mix-blend-overlay z-0" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="max-w-3xl"
                            >
                                <Badge className="mb-6 bg-intelligence-primary/20 text-intelligence-primary border-intelligence-primary/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest animate-pulse">
                                    Coach Active • Analysis Ready
                                </Badge>
                                <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-[1.1]">
                                    Master the Art of <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-intelligence-primary via-white to-intelligence-accent">Sponsorship Intelligence</span>
                                </h1 >
                                <p className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                                    Your personal AI partner for architecting high-impact fashion events in Lagos.
                                    Predicting market gaps, matching global sponsors, and perfecting your pitch delivery.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link to="/my-strategy/build">
                                        <Button className="bg-white text-black hover:bg-white/90 font-bold h-14 px-8 rounded-2xl group text-lg">
                                            Build Event Strategy
                                            <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                                        </Button>
                                    </Link>
                                    <Link to="/dashboard/research">
                                        <Button variant="outline" className="h-14 border-white/10 hover:bg-white/5 text-white font-medium px-8 rounded-2xl backdrop-blur-md text-lg">
                                            Access Research Hub
                                            <Search className="ml-2 w-5 h-5" />
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="hidden lg:block w-80"
                            >
                                <Card className="glass-premium border-white/20 shadow-2xl shadow-intelligence-primary/10 rotate-3 group hover:rotate-0 transition-all duration-700">
                                    <CardContent className="p-8 text-center space-y-6">
                                        <div className="w-20 h-20 rounded-full bg-intelligence-primary/10 flex items-center justify-center mx-auto border border-intelligence-primary/20">
                                            <BrainCircuit className="w-10 h-10 text-intelligence-primary" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1">Your Coach Score</p>
                                            <h3 className="text-6xl font-serif font-bold text-white">{coachScore}</h3>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-intelligence-primary w-[88%]" />
                                            </div>
                                            <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Intel Mastery Level</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>

                    {/* Dashboard Logic */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Summary Column */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Stats */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                            >
                                <motion.div variants={itemVariants}>
                                    <StatCard
                                        title="System Knowledge"
                                        value={`${totalEvents} Events`}
                                        icon={Calendar}
                                        trend={{ value: 100, isPositive: true }}
                                        className="glass-dark border-white/5"
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <StatCard
                                        title="Active Strategies"
                                        value={activeStrategies.toString()}
                                        icon={Target}
                                        trend={{ value: 1, isPositive: true }}
                                        className="glass-dark border-white/5"
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <StatCard
                                        title="Market Velocity"
                                        value={marketVelocity}
                                        icon={TrendingUp}
                                        trend={{ value: 42, isPositive: true }}
                                        className="glass-dark border-white/5"
                                    />
                                </motion.div>
                            </motion.div>

                            {/* Main Activity Area */}
                            <Card className="glass-dark border-white/5 overflow-hidden">
                                <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6">
                                    <div>
                                        <CardTitle className="text-2xl font-serif">Strategy Models</CardTitle>
                                        <CardDescription>Your current architectural pipeline</CardDescription>
                                    </div>
                                    <Link to="/my-strategy">
                                        <Button variant="ghost" className="text-intelligence-primary hover:bg-intelligence-primary/10">
                                            Manage Hub <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>
                                </CardHeader>
                                <CardContent className="p-0">
                                    {myEvents.length === 0 ? (
                                        <div className="p-12 text-center">
                                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Zap className="w-8 h-8 text-muted-foreground opacity-20" />
                                            </div>
                                            <p className="text-muted-foreground italic">No strategies in flight. Ready to architect your first event?</p>
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-white/5">
                                            {myEvents.slice(0, 3).map((strategy) => (
                                                <div key={strategy.id} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-intelligence-primary/10 flex items-center justify-center text-intelligence-primary">
                                                            <Target className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-white group-hover:text-intelligence-primary transition-colors">{strategy.name}</h4>
                                                            <p className="text-xs text-muted-foreground">{strategy.type} • {strategy.status}</p>
                                                        </div>
                                                    </div>
                                                    <Badge className="bg-intelligence-primary/20 text-intelligence-primary border-none">
                                                        {strategy.aiRecommendations?.sponsorMatches.length} Matches Found
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Intelligence Sidebar */}
                        <div className="space-y-8">
                            <Card className="glass-premium border-white/10 bg-gradient-to-br from-intelligence-accent/10 to-transparent">
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-intelligence-accent" />
                                        <CardTitle className="text-lg">Real-time Intel Feed</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                                        <Badge variant="outline" className="text-[9px] border-green-500/50 text-green-500">MARKET TREND</Badge>
                                        <h4 className="text-sm font-bold">Banking Sector Expansion</h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">3 major Financial Institutions just opened Q3 budget cycles for Lifestyle sponsorship.</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                                        <Badge variant="outline" className="text-[9px] border-intelligence-primary/50 text-intelligence-primary">GAP ALERT</Badge>
                                        <h4 className="text-sm font-bold">Sustainable Pop-ups</h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">Oversupply in Runway; 0 matching events found for "Eco-Tourism Fashion" in Q4.</p>
                                    </div>
                                    <Link to="/sponsor-intelligence">
                                        <Button className="w-full bg-intelligence-accent hover:bg-intelligence-accent-dark text-black font-bold text-xs h-10">
                                            Open Intelligence Matrix
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            <ChartCard
                                title="Lagos Market Sentiment"
                                description="Investor appetite tracking"
                                className="border-white/5 bg-transparent"
                            >
                                <div className="h-[200px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={monthlyTrendData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff0a" />
                                            <Bar dataKey="interest" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                                            <defs>
                                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="hsl(var(--intelligence-primary))" stopOpacity={1} />
                                                    <stop offset="100%" stopColor="hsl(var(--intelligence-primary))" stopOpacity={0.2} />
                                                </linearGradient>
                                            </defs>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </ChartCard>
                        </div>
                    </div>
                </div>
            </main>
            <CoachChat />
        </div>
    );
};

export default Dashboard;
