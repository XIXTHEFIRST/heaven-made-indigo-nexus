import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIntelligenceStore } from "@/stores/intelligenceStore";
import {
    Sparkles,
    TrendingUp,
    AlertCircle,
    Lightbulb,
    Search,
    ArrowRight,
    Target,
    BarChart3,
    BrainCircuit,
} from "lucide-react";
import { InsightType } from "@/types/intelligence";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const AIIntelligence = () => {
    const { aiInsights, matches } = useIntelligenceStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState<InsightType | "all">("all");

    const exampleQueries = [
        "Which events have the highest ROI?",
        "Find sponsors for sustainable fashion events",
        "What are the emerging trends in Lagos fashion?",
        "Predict attendance for upcoming events",
    ];

    const filteredInsights = aiInsights.filter((insight) => {
        const matchesType = selectedType === "all" || insight.type === selectedType;
        const matchesSearch =
            !searchQuery ||
            insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            insight.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    const getInsightIcon = (type: InsightType) => {
        switch (type) {
            case InsightType.TREND: return TrendingUp;
            case InsightType.PREDICTION: return BarChart3;
            case InsightType.RECOMMENDATION: return Lightbulb;
            case InsightType.ALERT: return AlertCircle;
            default: return Sparkles;
        }
    };

    const getInsightColor = (type: InsightType) => {
        switch (type) {
            case InsightType.TREND: return "text-emerald-600";
            case InsightType.PREDICTION: return "text-emerald-800";
            case InsightType.RECOMMENDATION: return "text-emerald-500";
            case InsightType.ALERT: return "text-red-500";
            default: return "text-emerald-700";
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high": return "bg-red-100 text-red-900 border-red-200";
            case "medium": return "bg-emerald-100 text-emerald-900 border-emerald-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />

            <main className="pt-24 pb-12">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-serif font-bold text-emerald-950">AI Competitive Intelligence</h1>
                                <p className="text-muted-foreground italic">Neural insights for the Lagos fashion ecosystem</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Search Interface */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="mb-12 glass-premium border-emerald-100 shadow-xl overflow-hidden">
                            <CardHeader className="bg-emerald-50/50 pb-6">
                                <CardTitle className="flex items-center gap-3 text-2xl text-emerald-950">
                                    <BrainCircuit className="w-6 h-6 text-emerald-700" />
                                    Cognitive Search
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-8 space-y-6">
                                <div className="flex gap-3">
                                    <div className="relative flex-1 group">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-emerald-700 transition-colors" />
                                        <Input
                                            placeholder="Ask a question about events, sponsors, or market trends..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-12 h-14 bg-white/50 border-emerald-100 text-lg rounded-2xl focus:ring-emerald-700/10 focus:border-emerald-700/30 transition-all font-medium"
                                        />
                                    </div>
                                    <Button className="h-14 px-10 bg-emerald-700 hover:bg-emerald-800 rounded-2xl shadow-lg shadow-emerald-700/20 text-lg font-bold text-white">
                                        Query AI
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-3 items-center">
                                    <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground opacity-70">Popular Queries:</span>
                                    {exampleQueries.map((query) => (
                                        <Badge
                                            key={query}
                                            variant="secondary"
                                            className="cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 transition-all py-1.5 px-3 rounded-lg border border-emerald-50 bg-emerald-50/30 text-emerald-800"
                                            onClick={() => setSearchQuery(query)}
                                        >
                                            {query}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Type Filters */}
                    <div className="flex flex-wrap gap-2 mb-8 items-center bg-muted/30 p-2 rounded-2xl max-w-fit">
                        <Button
                            variant={selectedType === "all" ? "default" : "ghost"}
                            className={cn(
                                "rounded-xl h-9 px-6 font-semibold transition-all",
                                selectedType === "all" ? "bg-emerald-700 text-white" : "hover:bg-emerald-50 text-emerald-800"
                            )}
                            onClick={() => setSelectedType("all")}
                        >
                            Complete Feed
                        </Button>
                        {Object.values(InsightType).map((type) => (
                            <Button
                                key={type}
                                variant={selectedType === type ? "default" : "ghost"}
                                className="rounded-xl h-9 px-6 font-semibold transition-all"
                                onClick={() => setSelectedType(type)}
                            >
                                {type}
                            </Button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* AI Insights Feed */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-2xl font-bold">Intelligence Feed</h2>
                                <span className="text-sm text-muted-foreground font-medium">{filteredInsights.length} insights found</span>
                            </div>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-6"
                            >
                                <AnimatePresence mode="popLayout">
                                    {filteredInsights.map((insight) => {
                                        const Icon = getInsightIcon(insight.type);
                                        const iconColor = getInsightColor(insight.type);

                                        return (
                                            <motion.div
                                                layout
                                                key={insight.id}
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit={{ opacity: 0, scale: 0.95 }}
                                            >
                                                <Card className="hover:shadow-xl border-emerald-100 transition-all duration-300 group overflow-hidden bg-white shadow-sm">
                                                    <CardHeader className="pb-4">
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex items-start gap-4 flex-1">
                                                                <div className={`p-3 rounded-2xl bg-muted/50 group-hover:bg-background transition-colors shadow-inner`}>
                                                                    <Icon className={`w-6 h-6 ${iconColor}`} />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2 mb-3">
                                                                        <Badge variant="outline" className="border-emerald-100 bg-emerald-50/50 text-emerald-700 font-bold uppercase tracking-tighter text-[10px]">{insight.type}</Badge>
                                                                        <Badge variant="outline" className={cn(getPriorityColor(insight.priority), "text-[10px] uppercase font-bold")}>
                                                                            {insight.priority} Priority
                                                                        </Badge>
                                                                    </div>
                                                                    <CardTitle className="text-2xl mb-1 group-hover:text-emerald-700 transition-colors font-serif italic text-emerald-950">{insight.title}</CardTitle>
                                                                    <p className="text-sm text-muted-foreground font-medium">
                                                                        Analyzed on {format(new Date(insight.createdAt), "MMMM dd, yyyy")}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent className="space-y-6 pt-0">
                                                        <p className="text-muted-foreground leading-relaxed text-lg">{insight.content}</p>

                                                        <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <span className="text-sm font-bold uppercase tracking-widest text-emerald-900/60">Insight Confidence</span>
                                                                <span className="text-lg font-black text-emerald-700">{insight.confidence}%</span>
                                                            </div>
                                                            <div className="h-3 bg-muted rounded-full overflow-hidden shadow-inner">
                                                                <motion.div
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${insight.confidence}%` }}
                                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                                    className="h-full bg-emerald-600 rounded-full"
                                                                />
                                                            </div>
                                                        </div>

                                                        {insight.supportingData.length > 0 && (
                                                            <div className="space-y-3">
                                                                <p className="text-sm font-black uppercase tracking-widest text-muted-foreground pt-2">Evidence & Correlation:</p>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                    {insight.supportingData.map((data, idx) => (
                                                                        <div key={idx} className="text-sm p-3 bg-white rounded-xl border border-emerald-100 flex items-center gap-3">
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500" />
                                                                            <span className="font-medium text-emerald-900">{data}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Card className="glass-premium border-emerald-100 shadow-xl overflow-hidden">
                                    <CardHeader className="bg-emerald-700/5 border-b border-emerald-100">
                                        <CardTitle className="flex items-center gap-3 text-emerald-950">
                                            <Target className="w-6 h-6 text-emerald-700" />
                                            Predicted Matches
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="divide-y divide-emerald-100">
                                            {matches.map((match, idx) => (
                                                <div key={idx} className="p-6 hover:bg-emerald-50/50 transition-all">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Strategic Fit</span>
                                                        <Badge className="bg-emerald-700 text-white font-black text-sm px-3 py-1 rounded-full">{match.fitScore}%</Badge>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div className="flex justify-between items-center text-sm">
                                                            <span className="text-muted-foreground font-medium">Recommended Tier</span>
                                                            <span className="font-bold text-emerald-800">{match.recommendedTier}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center text-sm">
                                                            <span className="text-muted-foreground font-medium">Estimated ROI</span>
                                                            <span className="font-bold text-emerald-600 italic">{match.estimatedROI.toFixed(1)}x Multiple</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-5 space-y-2">
                                                        {match.reasoning.slice(0, 2).map((reason, ridx) => (
                                                            <div key={ridx} className="text-xs p-2 bg-emerald-50 rounded-lg text-emerald-900 flex items-start gap-2 border border-emerald-100">
                                                                <ArrowRight className="w-3 h-3 mt-0.5 text-emerald-700 shrink-0" />
                                                                <span>{reason}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-6 bg-emerald-50/50">
                                            <Button variant="outline" className="w-full border-emerald-200 hover:bg-emerald-700 hover:text-white transition-colors font-bold text-emerald-800">
                                                Analyze Deep Correlation
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Card className="border-border/40 shadow-luxury bg-background/40 backdrop-blur-md">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-bold italic font-serif">Deep Analysis Tools</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <Button variant="outline" className="w-full justify-between h-12 rounded-xl group hover:border-emerald-500 transition-all font-semibold text-emerald-900">
                                            System Intelligence Audit
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-emerald-600" />
                                        </Button>
                                        <Button variant="outline" className="w-full justify-between h-12 rounded-xl group hover:border-emerald-500 transition-all font-semibold text-emerald-900">
                                            Export Neural Insights
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-emerald-600" />
                                        </Button>
                                        <Button variant="outline" className="w-full justify-between h-12 rounded-xl group hover:border-emerald-500 transition-all font-semibold text-emerald-900">
                                            Real-time Trend Synthesis
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-emerald-600" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AIIntelligence;
