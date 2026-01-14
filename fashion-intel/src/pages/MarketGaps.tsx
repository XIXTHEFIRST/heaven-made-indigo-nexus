import { Navigation } from "@/components/Navigation";
import { StatCard } from "@/components/intelligence/StatCard";
import { ChartCard } from "@/components/intelligence/ChartCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIntelligenceStore } from "@/stores/intelligenceStore";
import {
    Target,
    AlertTriangle,
    Zap,
    TrendingUp,
    MapPin,
    BrainCircuit,
    ArrowRight
} from "lucide-react";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MarketGaps = () => {
    const { marketGaps } = useIntelligenceStore();

    // Stats
    const totalGaps = marketGaps.length;
    const highSeverity = marketGaps.filter(gap => gap.severity >= 8).length;
    const highOpportunity = marketGaps.filter(gap => gap.opportunity >= 8).length;
    const potentialRevenue = marketGaps.reduce((acc, gap) => acc + (gap.potentialRevenue || 0), 0);

    const scatterData = marketGaps.map(gap => ({
        name: gap.title,
        severity: gap.severity,
        opportunity: gap.opportunity,
        revenue: gap.potentialRevenue || 0,
        type: gap.type
    }));

    const COLORS = {
        "Geographic": "hsl(var(--data-purple))",
        "Demographic": "hsl(var(--data-blue))",
        "Seasonal": "hsl(var(--data-teal))",
        "Event Type": "hsl(var(--data-orange))",
        "Budget Range": "hsl(var(--data-pink))"
    };

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
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="pt-24 pb-12">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
                    >
                        <div>
                            <h1 className="text-4xl font-serif font-bold mb-2">Market Gap Analysis</h1>
                            <p className="text-muted-foreground italic">Identifying untapped opportunities in the Lagos fashion ecosystem</p>
                        </div>
                        <Badge variant="outline" className="h-8 px-4 border-intelligence-primary/30 text-intelligence-primary bg-intelligence-primary/5">
                            Last Analysis: Today
                        </Badge>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                    >
                        <motion.div variants={itemVariants}>
                            <StatCard
                                title="Identified Gaps"
                                value={totalGaps.toString()}
                                icon={TrendingUp}
                                className="glass-premium"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <StatCard
                                title="High Severity"
                                value={highSeverity.toString()}
                                icon={AlertTriangle}
                                className="border-destructive/20 bg-destructive/5"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <StatCard
                                title="High Opportunity"
                                value={highOpportunity.toString()}
                                icon={Zap}
                                className="border-intelligence-accent/20 bg-intelligence-accent/5"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <StatCard
                                title="Potential Revenue"
                                value={`₦${(potentialRevenue / 1000000000).toFixed(1)}B`}
                                icon={Target}
                                className="glass-premium"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Visualization */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-12"
                    >
                        <ChartCard
                            title="Severity vs. Opportunity Matrix"
                            description="Visualizing the most actionable market gaps"
                            className="bg-background border-none shadow-luxury"
                        >
                            <ResponsiveContainer width="100%" height={400}>
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis
                                        type="number"
                                        dataKey="severity"
                                        name="Severity"
                                        unit="/10"
                                        domain={[0, 10]}
                                        stroke="hsl(var(--muted-foreground))"
                                    />
                                    <YAxis
                                        type="number"
                                        dataKey="opportunity"
                                        name="Opportunity"
                                        unit="/10"
                                        domain={[0, 10]}
                                        stroke="hsl(var(--muted-foreground))"
                                    />
                                    <ZAxis type="number" dataKey="revenue" range={[100, 1000]} name="Potential Revenue" />
                                    <Tooltip
                                        cursor={{ strokeDasharray: "3 3" }}
                                        contentStyle={{
                                            backgroundColor: "hsl(var(--card))",
                                            border: "1px solid hsl(var(--border))",
                                            borderRadius: "12px",
                                            boxShadow: "var(--shadow-luxury)"
                                        }}
                                    />
                                    <Scatter name="Market Gaps" data={scatterData}>
                                        {scatterData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[entry.type as keyof typeof COLORS] || "hsl(var(--primary))"} />
                                        ))}
                                    </Scatter>
                                </ScatterChart>
                            </ResponsiveContainer>
                            <div className="flex flex-wrap justify-center gap-4 mt-6">
                                {Object.entries(COLORS).map(([type, color]) => (
                                    <div key={type} className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                                        <span className="text-xs text-muted-foreground">{type}</span>
                                    </div>
                                ))}
                            </div>
                        </ChartCard>
                    </motion.div>

                    {/* Gaps List */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {marketGaps.map((gap, index) => (
                            <motion.div
                                key={gap.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                            >
                                <Card className="h-full border-border/50 hover:border-intelligence-primary/50 transition-all duration-300 group overflow-hidden">
                                    <CardHeader className="bg-muted/30 pb-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <Badge className="mb-2 bg-intelligence-primary/10 text-intelligence-primary border-none">
                                                    {gap.type}
                                                </Badge>
                                                <CardTitle className="text-2xl group-hover:text-intelligence-primary transition-colors">
                                                    {gap.title}
                                                </CardTitle>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-1 text-intelligence-accent mb-1">
                                                    <Zap className="w-4 h-4 fill-current" />
                                                    <span className="font-bold">{gap.opportunity}/10</span>
                                                </div>
                                                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Opportunity</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-6">
                                        <p className="text-muted-foreground leading-relaxed">{gap.description}</p>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-3 bg-muted/40 rounded-xl space-y-1">
                                                <p className="text-xs text-muted-foreground uppercase tracking-tight">Affected Area</p>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-intelligence-primary" />
                                                    <span className="font-semibold text-sm">{gap.affectedArea}</span>
                                                </div>
                                            </div>
                                            <div className="p-3 bg-muted/40 rounded-xl space-y-1">
                                                <p className="text-xs text-muted-foreground uppercase tracking-tight">Potential Revenue</p>
                                                <div className="flex items-center gap-2">
                                                    <Target className="w-4 h-4 text-intelligence-accent" />
                                                    <span className="font-bold text-sm text-intelligence-accent">₦{(gap.potentialRevenue! / 1000000).toFixed(1)}M</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <p className="text-sm font-bold flex items-center gap-2">
                                                <BrainCircuit className="w-4 h-4 text-intelligence-primary" />
                                                Strategic Recommendations:
                                            </p>
                                            <ul className="space-y-2">
                                                {gap.recommendations.map((rec, i) => (
                                                    <li key={i} className="text-sm flex items-start gap-2 bg-intelligence-primary/5 p-2 rounded-lg border border-intelligence-primary/10">
                                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-intelligence-primary flex-shrink-0" />
                                                        {rec}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardContent>
                                    <div className="px-6 py-4 bg-muted/20 border-t border-border/50 flex justify-between items-center transition-all group-hover:bg-intelligence-primary/5">
                                        <Link to="/ai-intelligence" className="text-sm font-medium text-intelligence-primary flex items-center gap-1 hover:underline">
                                            Ask AI for Implementation Plan
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MarketGaps;
