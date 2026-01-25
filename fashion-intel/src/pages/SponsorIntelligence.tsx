import React from "react";
import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    TrendingUp,
    Building2,
    Zap,
    Target,
    AlertCircle,
    ArrowUpRight,
    MessageSquare,
    DollarSign,
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useIntelligenceStore } from "@/stores/intelligenceStore";
import { cn } from "@/lib/utils";

const SponsorIntelligence = () => {
    const { sponsors } = useIntelligenceStore();
    const [searchQuery, setSearchQuery] = React.useState("");

    const filteredSponsors = sponsors.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.industry.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background text-emerald-950">
            <Navigation />

            <main className="pt-24 pb-12">
                <div className="container mx-auto px-6">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="max-w-2xl"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-700 border border-emerald-100">
                                    <Target className="w-6 h-6" />
                                </div>
                                <h1 className="text-4xl font-serif font-bold text-emerald-950">Sponsor Intelligence Matrix</h1>
                            </div>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Decoding brand behaviors in the Lagos fashion ecosystem.
                                Track investment trends, active sectors, and "win-conditions" for the city's top donors.
                            </p>
                        </motion.div>

                        <div className="flex gap-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-80">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-emerald-600/50" />
                                <Input
                                    placeholder="Search brands or sectors..."
                                    className="pl-9 glass-dark border-emerald-100/50 bg-white"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50 text-emerald-900 gap-2">
                                <Filter className="w-4 h-4" /> Filters
                            </Button>
                        </div>
                    </div>

                    {/* High-Level Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        {[
                            { label: "Active Investors", value: sponsors.length, icon: Building2, color: "text-emerald-700" },
                            { label: "Market Velocity", value: "High", icon: TrendingUp, color: "text-emerald-600" },
                            { label: "Top Sector", value: "Banking", icon: DollarSign, color: "text-emerald-800" },
                            { label: "Unmet Gaps", value: "12", icon: AlertCircle, color: "text-red-500" }
                        ].map((stat, i) => (
                            <Card key={i} className="glass-dark border-emerald-100 overflow-hidden bg-white shadow-sm">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1">{stat.label}</p>
                                            <h3 className="text-2xl font-serif font-bold">{stat.value}</h3>
                                        </div>
                                        <div className={cn("p-2 rounded-lg bg-white/5", stat.color)}>
                                            <stat.icon className="w-4 h-4" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Sponsor Intelligence Cards */}
                    <div className="grid grid-cols-1 gap-8">
                        {filteredSponsors.map((sponsor, idx) => (
                            <motion.div
                                key={sponsor.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Card className="glass-premium border-emerald-100 hover:border-emerald-300 transition-all duration-500 overflow-hidden group bg-white shadow-sm">
                                    <CardContent className="p-0">
                                        <div className="flex flex-col lg:flex-row">
                                            {/* Left: Basic Info */}
                                            <div className="p-8 lg:w-1/4 border-b lg:border-b-0 lg:border-r border-emerald-100 space-y-6 bg-emerald-50/20">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                                                        {sponsor.logo ? (
                                                            <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <span className="text-xl font-bold">{sponsor.name[0]}</span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-serif font-bold group-hover:text-emerald-700 transition-colors text-emerald-950">{sponsor.name}</h3>
                                                        <Badge variant="outline" className="text-[10px] mt-1 border-emerald-200 bg-emerald-50 text-emerald-700 uppercase">{sponsor.industry}</Badge>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 pt-4">
                                                    <div>
                                                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Active Investment</span>
                                                        <p className="text-lg font-bold">₦{(sponsor.totalInvestmentBudget / 1000000).toFixed(1)}M+</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Risk Level</span>
                                                        <p className="text-sm font-medium text-green-500">LOW (Consistent)</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Middle: Intelligence Analysis */}
                                            <div className="p-8 flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-700">
                                                        <Zap className="w-4 h-4" /> Winning Strategy
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        {sponsor.intel?.winningStrategy || `Align with ${sponsor.industry} digitisation goals. They prioritize tech-integrated fashion moments and Gen-Z acquisition.`}
                                                    </p>

                                                    <div className="pt-4 space-y-3">
                                                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest block">Careabouts</span>
                                                        <div className="flex flex-wrap gap-2">
                                                            {(sponsor.intel?.careabouts || ["Tech Integration", "Viral Content", "Market Share", "Premium Positioning"]).map((c, i) => (
                                                                <Badge key={i} variant="outline" className="bg-emerald-50/50 text-[10px] text-emerald-800 border-emerald-100">{c}</Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-800">
                                                        <TrendingUp className="w-4 h-4" /> Market Trends
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        {sponsor.intel?.trends || `Moving from traditional branding to "Experience First" activations. Significant budget increase noted for outdoor interactive events.`}
                                                    </p>

                                                    <div className="pt-4 p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10">
                                                        <h5 className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">Red Flags</h5>
                                                        <p className="text-xs text-muted-foreground">
                                                            {sponsor.intel?.redFlags || "Avoid over-promising on TV metrics; they care about social conversions."}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right: Actions */}
                                            <div className="p-8 lg:w-64 border-t lg:border-t-0 lg:border-l border-emerald-100 flex flex-col justify-center gap-3">
                                                <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs h-11 uppercase tracking-widest shadow-md shadow-emerald-700/10">
                                                    Generate Pitch Draft
                                                </Button>
                                                <Button variant="outline" className="w-full border-emerald-100 hover:bg-emerald-50 text-emerald-900 text-xs h-11 uppercase tracking-widest gap-2">
                                                    <MessageSquare className="w-3 h-3" /> Intel Notes
                                                </Button>
                                                <div className="mt-4 pt-4 border-t border-emerald-100 text-center">
                                                    <span className="text-[10px] text-muted-foreground uppercase font-black">Match Probability</span>
                                                    <div className="text-2xl font-serif font-bold text-emerald-700 mt-1">82%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SponsorIntelligence;
