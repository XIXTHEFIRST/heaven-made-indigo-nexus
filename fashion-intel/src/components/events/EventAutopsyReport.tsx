import React from "react";
import { motion } from "framer-motion";
import {
    Zap,
    Target,
    AlertTriangle,
    BookOpen,
    TrendingUp,
    Download,
    Share2,
    CheckCircle2,
    BarChart3,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/intelligence";
import { cn } from "@/lib/utils";

interface EventAutopsyReportProps {
    event: Event;
    onDownload?: () => void;
}

const EventAutopsyReport: React.FC<EventAutopsyReportProps> = ({ event, onDownload }) => {
    if (!event.autopsyReport) return (
        <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 glass-dark rounded-3xl border border-white/10">
            <div className="w-16 h-16 rounded-full bg-intelligence-primary/10 flex items-center justify-center">
                <Zap className="w-8 h-8 text-intelligence-primary animate-pulse" />
            </div>
            <h3 className="text-xl font-serif font-bold">Intelligence Pending</h3>
            <p className="text-muted-foreground max-w-xs">Study this event to unlock AI-powered autopsy reports and market gap analysis.</p>
            <Button className="bg-intelligence-primary hover:bg-intelligence-primary-dark">Analyze Event Now</Button>
        </div>
    );

    // Parse the autopsy report sections if it's formatted as a string with markers
    // For now we'll render it with a premium layout

    return (
        <div className="space-y-8 p-1">
            {/* Header Section */}
            <div className="relative p-8 rounded-3xl overflow-hidden glass-premium border border-white/10">
                <div className="absolute top-0 right-0 p-8">
                    <Badge className="bg-intelligence-primary/20 text-intelligence-primary border-intelligence-primary/50 px-4 py-1 text-xs uppercase tracking-widest font-bold">
                        Intelligence Unlocked
                    </Badge>
                </div>

                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-2xl bg-intelligence-primary/10 border border-intelligence-primary/20 text-intelligence-primary">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-serif font-bold tracking-tight">Post-Event Intelligence Autopsy</h2>
                    </div>
                    <p className="text-lg text-black font-medium">
                        Critical analysis of <span className="text-emerald-700 font-bold">{event.name}</span>.
                        Revealing exploitable gaps and sponsor behavior patterns for your next brand partnership.
                    </p>
                </div>

                <div className="flex gap-3 mt-8">
                    <Button onClick={onDownload} className="gap-2 bg-white text-black hover:bg-white/90">
                        <Download className="w-4 h-4" /> Export Report
                    </Button>
                    <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5">
                        <Share2 className="w-4 h-4" /> Share Intel
                    </Button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Sponsor Success Factors */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-2 p-6 rounded-3xl glass-dark border border-white/5 space-y-6"
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Target className="w-5 h-5 text-intelligence-primary" />
                            Sponsor Success Factors
                        </h3>
                        <Badge variant="outline" className="border-white/10">Performance Benchmarking</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {event.intelSponsors?.map((s, i) => (
                            <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="font-bold text-intelligence-accent uppercase tracking-tighter">Sponsor ID: {s.sponsorId}</div>
                                    <Badge className="bg-intelligence-primary/10 text-intelligence-primary border-none text-[10px]">{s.tier}</Badge>
                                </div>
                                <p className="text-sm text-black leading-relaxed font-medium">
                                    <span className="text-emerald-700 font-bold italic">Outcome:</span> {s.deliverables}
                                </p>
                                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground">Deal Estimated:</span>
                                    <span className="text-sm font-bold text-green-500">₦{(s.dealAmount / 1000000).toFixed(1)}M</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-intelligence-primary/5 border border-intelligence-primary/10">
                        <h4 className="text-sm font-bold text-intelligence-primary flex items-center gap-2 mb-2">
                            <BookOpen className="w-4 h-4" /> Strategic Context
                        </h4>
                        <p className="text-sm text-black whitespace-pre-line leading-relaxed font-medium">
                            {event.autopsyReport.split('⚠️ MARKET GAPS')[0].split('💰 SPONSOR SUCCESS FACTORS:')[1]}
                        </p>
                    </div>
                </motion.div>

                {/* Quick Metrics & Gaps */}
                <div className="space-y-6">
                    {/* Success Metrics Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-3xl glass-premium border border-white/10 bg-gradient-to-br from-intelligence-primary/5 to-transparent"
                    >
                        <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                            <BarChart3 className="w-5 h-5 text-intelligence-primary" />
                            Success Metrics
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Digital Impact</span>
                                <span className="text-2xl font-serif font-bold text-intelligence-primary">{((event.successMetrics?.socialImpressions || 0) / 1000).toFixed(0)}K</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-intelligence-primary w-[75%]" />
                            </div>

                            <div className="flex justify-between items-end pt-2">
                                <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Attendance Accuracy</span>
                                <span className="text-2xl font-serif font-bold text-intelligence-accent">{event.successMetrics?.attendanceVsExpected}%</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-intelligence-accent w-[90%]" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Market Gaps Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-6 rounded-3xl glass-dark border border-orange-500/20 bg-orange-500/5 space-y-4"
                    >
                        <h4 className="font-bold flex items-center gap-2 text-orange-500">
                            <AlertTriangle className="w-5 h-5" />
                            Exploitable Gaps
                        </h4>
                        <p className="text-sm text-black font-bold leading-relaxed italic">
                            {event.autopsyReport.split('🎯 LESSONS FOR MY EVENT:')[0].split('⚠️ MARKET GAPS THIS EVENT LEFT OPEN:')[1]}
                        </p>
                    </motion.div>

                    {/* Viral Moments */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-6 rounded-3xl glass-dark border border-white/5"
                    >
                        <h4 className="font-bold flex items-center gap-2 text-intelligence-accent mb-3">
                            <Zap className="w-5 h-5" />
                            Viral Velocity
                        </h4>
                        <p className="text-sm text-black font-medium leading-relaxed">
                            {event.successMetrics?.viralMoments || "No localized virality detected for this intelligence cycle."}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Lessons Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-8 rounded-3xl glass-premium border border-intelligence-primary/20 bg-intelligence-primary/5"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-intelligence-primary text-black">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold">The Coach's Strategy Lessons</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* We'll parse the lessons specifically if possible, otherwise render raw */}
                    <div className="lg:col-span-4 text-black text-sm leading-relaxed whitespace-pre-line border-l-2 border-intelligence-primary pl-6 py-2 font-medium">
                        {event.autopsyReport.split('📊 SPONSOR BEHAVIOR PATTERNS:')[0].split('🎯 LESSONS FOR MY EVENT:')[1]}
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="text-xs">
                            <p className="text-muted-foreground uppercase font-bold tracking-widest mb-1">Coach Sentiment</p>
                            <p className="text-white font-medium">Opportunities for market dominance are HIGH in this category.</p>
                        </div>
                    </div>
                    <Button variant="outline" className="gap-2 border-intelligence-primary/50 text-intelligence-primary hover:bg-intelligence-primary/10">
                        Apply to Strategy Builder <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default EventAutopsyReport;
