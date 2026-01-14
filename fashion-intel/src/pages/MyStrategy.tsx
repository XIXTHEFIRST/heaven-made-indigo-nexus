import React from "react";
import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import {
    Plus,
    Zap,
    Target,
    TrendingUp,
    ArrowRight,
    Search,
    BrainCircuit,
    Sparkles,
    Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useIntelligenceStore } from "@/stores/intelligenceStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const MyStrategy = () => {
    const { myEvents, deleteMyEvent } = useIntelligenceStore();
    const [searchQuery, setSearchQuery] = React.useState("");

    const filteredEvents = myEvents?.filter(e =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="pt-24 pb-12">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                        >
                            <h1 className="text-4xl font-serif font-bold text-white mb-2 flex items-center gap-3">
                                <BrainCircuit className="w-8 h-8 text-intelligence-primary" />
                                My Event Strategy Hub
                            </h1>
                            <p className="text-muted-foreground">Architecting high-conversion fashion events with AI-powered market positioning.</p>
                        </motion.div>

                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                        >
                            <Link to="/my-strategy/build">
                                <Button className="bg-intelligence-primary hover:bg-intelligence-primary-dark gap-2 shadow-lg shadow-intelligence-primary/20 h-12 px-8 rounded-xl font-bold">
                                    <Plus className="w-5 h-5" />
                                    Build New Strategy
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                                <Input
                                    placeholder="Search your strategy models..."
                                    className="pl-12 h-12 glass-dark border-white/10 rounded-xl"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="space-y-4">
                                {filteredEvents.length === 0 ? (
                                    <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-3xl glass-dark group hover:border-intelligence-primary/20 transition-all">
                                        <div className="w-16 h-16 bg-intelligence-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                            <Sparkles className="w-8 h-8 text-intelligence-primary" />
                                        </div>
                                        <h3 className="text-xl font-serif font-bold mb-2">No Strategies Found</h3>
                                        <p className="text-muted-foreground max-w-sm mx-auto mb-8">
                                            You haven't architected any event strategies yet. Use the coach to find market gaps and match with donors.
                                        </p>
                                        <Link to="/my-strategy/build">
                                            <Button variant="outline" className="border-intelligence-primary/50 text-intelligence-primary">
                                                Initialize Strategy Wizard
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    filteredEvents.map((event, idx) => (
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <Card className="glass-dark border-white/5 hover:border-intelligence-primary/20 transition-all duration-300 group overflow-hidden">
                                                <CardContent className="p-0">
                                                    <div className="flex flex-col md:flex-row">
                                                        <div className="p-6 flex-1 flex flex-col justify-between">
                                                            <div>
                                                                <div className="flex items-center gap-2 mb-3">
                                                                    <Badge variant="secondary" className="bg-white/5 text-[10px] uppercase font-bold tracking-wider">
                                                                        {event.type}
                                                                    </Badge>
                                                                    <Badge className={cn(
                                                                        "text-[10px] font-bold",
                                                                        event.status === "draft" ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/50" : "bg-green-500/20 text-green-500 border-green-500/50"
                                                                    )}>
                                                                        {event.status}
                                                                    </Badge>
                                                                </div>
                                                                <h3 className="text-2xl font-serif font-bold group-hover:text-intelligence-primary transition-colors">{event.name}</h3>
                                                                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{event.uniqueAngle}</p>
                                                            </div>

                                                            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-white/5">
                                                                <div className="flex flex-col">
                                                                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Sponsor Matches</span>
                                                                    <span className="text-lg font-bold text-intelligence-accent">{event.aiRecommendations?.sponsorMatches.length || 0} Targets</span>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Market Gaps</span>
                                                                    <span className="text-lg font-bold text-intelligence-primary">{event.aiRecommendations?.marketGaps.length || 0} Identified</span>
                                                                </div>
                                                                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="text-muted-foreground hover:text-red-400"
                                                                        onClick={() => {
                                                                            if (window.confirm("Permanently delete this strategy?")) {
                                                                                deleteMyEvent(event.id);
                                                                                toast.success("Strategy deleted");
                                                                            }
                                                                        }}
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </Button>
                                                                    <Button variant="outline" className="border-white/10 hover:bg-white/5 gap-2">
                                                                        Manage Strategy <ArrowRight className="w-4 h-4" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="w-full md:w-32 bg-intelligence-primary/5 border-l border-white/5 flex flex-col items-center justify-center p-4 gap-2 text-center">
                                                            <div className="w-12 h-12 rounded-full bg-intelligence-primary/20 flex items-center justify-center">
                                                                <Zap className="w-6 h-6 text-intelligence-primary" />
                                                            </div>
                                                            <span className="text-[10px] font-bold text-intelligence-primary">ANALYSIS READY</span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <Card className="glass-premium border-white/10 overflow-hidden">
                                <div className="p-6 bg-gradient-to-br from-intelligence-primary/20 to-transparent">
                                    <h3 className="text-xl font-serif font-bold mb-2">Coach Insight</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Your current strategy pipeline focuses on <span className="text-white font-medium">Ready-to-Wear</span>.
                                        Market data suggests a 40% higher win-rate for <span className="text-intelligence-accent font-medium">Streetwear Collaborations</span> this quarter.
                                    </p>
                                </div>
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Intelligence Score</span>
                                        <span className="text-sm font-bold text-intelligence-primary">B+ High Potential</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-intelligence-primary to-intelligence-accent w-[78%]" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="glass-dark border-white/10">
                                <CardHeader>
                                    <CardTitle className="text-lg">Strategy Checklist</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {[
                                        "Research 5+ Competitor Events",
                                        "Identify 3 Market Gaps",
                                        "Draft Pitch Deck Hook",
                                        "Map Sponsor Alignment"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm">
                                            <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center text-[10px] font-bold">
                                                {i + 1}
                                            </div>
                                            <span className="text-muted-foreground">{item}</span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MyStrategy;
