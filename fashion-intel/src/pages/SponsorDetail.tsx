import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartCard } from "@/components/intelligence/ChartCard";
import { useIntelligenceStore } from "@/stores/intelligenceStore";
import { ArrowLeft, Building2, TrendingUp, Calendar, ExternalLink, Target, PieChart as PieChartIcon } from "lucide-react";
import { format } from "date-fns";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";
import { motion } from "framer-motion";

const SponsorDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { getSponsorById, getEventById } = useIntelligenceStore();

    const sponsor = getSponsorById(id!);

    if (!sponsor) {
        return (
            <div className="min-h-screen bg-background">
                <Navigation />
                <div className="pt-24 pb-12">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-3xl font-bold mb-4">Sponsor Not Found</h1>
                        <Link to="/sponsors">
                            <Button>Back to Sponsors</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const sponsoredEvents = sponsor.eventsSponsored
        .map((eventId) => getEventById(eventId))
        .filter(Boolean);

    // Mock ROI trend data - enhanced
    const roiTrendData = [
        { month: "Jan", roi: 7.2, target: 7.0 },
        { month: "Feb", roi: 7.8, target: 7.0 },
        { month: "Mar", roi: 8.1, target: 7.5 },
        { month: "Apr", roi: 8.5, target: 7.5 },
        { month: "May", roi: 8.3, target: 8.0 },
        { month: "Jun", roi: sponsor.averageROI, target: 8.0 },
    ];

    // Mock ROI breakdown by channel
    const channelRoiData = [
        { name: "Direct Sales", value: 45 },
        { name: "Brand Equity", value: 30 },
        { name: "Lead Gen", value: 15 },
        { name: "Social Media", value: 10 },
    ];

    const COLORS = ["hsl(var(--data-blue))", "hsl(var(--data-purple))", "hsl(var(--data-teal))", "hsl(var(--data-pink))"];

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <div className="pt-24 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="container mx-auto px-6"
                >
                    {/* Back Button */}
                    <Link to="/sponsors">
                        <Button variant="ghost" className="mb-6">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Sponsors
                        </Button>
                    </Link>

                    {/* Sponsor Header */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8 p-8 rounded-lg bg-gradient-to-br from-intelligence-accent/10 to-intelligence-primary/10 border backdrop-blur-sm"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <Building2 className="w-8 h-8 text-intelligence-accent" />
                                    <h1 className="text-4xl font-serif font-bold">{sponsor.name}</h1>
                                </div>
                                <Badge variant="secondary" className="mb-3">{sponsor.industry}</Badge>
                                <p className="text-lg text-muted-foreground mb-4">{sponsor.description}</p>
                                {sponsor.website && (
                                    <a
                                        href={sponsor.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-intelligence-primary hover:underline"
                                    >
                                        Visit Website
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 bg-background/50 rounded-lg border border-intelligence-primary/10">
                                <p className="text-sm text-muted-foreground mb-1">Total Investment</p>
                                <p className="text-2xl font-bold text-intelligence-primary">
                                    ₦{(sponsor.totalSponsorship / 1000000).toFixed(1)}M
                                </p>
                            </div>
                            <div className="p-4 bg-background/50 rounded-lg border border-intelligence-accent/10">
                                <p className="text-sm text-muted-foreground mb-1">Average ROI</p>
                                <p className="text-2xl font-bold text-data-green flex items-center gap-1">
                                    <TrendingUp className="w-5 h-5" />
                                    {sponsor.averageROI.toFixed(1)}x
                                </p>
                            </div>
                            <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                                <p className="text-sm text-muted-foreground mb-1">Events Sponsored</p>
                                <p className="text-2xl font-bold">{sponsor.eventsSponsored.length}</p>
                            </div>
                            <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                                <p className="text-sm text-muted-foreground mb-1">Active Since</p>
                                <p className="text-2xl font-bold flex items-center gap-1">
                                    <Calendar className="w-5 h-5" />
                                    {format(new Date(sponsor.activeSince), "yyyy")}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Charts Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ChartCard title="ROI Performance Trend" description="Return on investment vs targets">
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={roiTrendData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                                            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                                            <YAxis stroke="hsl(var(--muted-foreground))" />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: "hsl(var(--card))",
                                                    border: "1px solid hsl(var(--border))",
                                                    borderRadius: "8px",
                                                }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="roi"
                                                stroke="hsl(var(--data-green))"
                                                strokeWidth={3}
                                                dot={{ fill: "hsl(var(--data-green))", r: 5 }}
                                                activeDot={{ r: 8 }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="target"
                                                stroke="hsl(var(--muted-foreground))"
                                                strokeDasharray="5 5"
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </ChartCard>

                                <ChartCard title="ROI Attribution" description="Value breakdown by channel (%)">
                                    <ResponsiveContainer width="100%" height={250}>
                                        <PieChart>
                                            <Pie
                                                data={channelRoiData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {channelRoiData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: "hsl(var(--card))",
                                                    border: "1px solid hsl(var(--border))",
                                                    borderRadius: "8px",
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </ChartCard>
                            </div>

                            {/* Sponsored Events */}
                            <Card className="overflow-hidden border-border/50">
                                <CardHeader className="bg-muted/30">
                                    <CardTitle>Sponsorship Portfolio</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-border/50">
                                        {sponsoredEvents.map((event, index) => (
                                            <Link key={event!.id} to={`/events/${event!.id}`}>
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                                    className="p-4 hover:bg-intelligence-primary/5 transition-all cursor-pointer group"
                                                >
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <h4 className="font-semibold group-hover:text-intelligence-primary transition-colors">
                                                                {event!.name}
                                                            </h4>
                                                            <p className="text-sm text-muted-foreground">{event!.location}</p>
                                                        </div>
                                                        <Badge variant="secondary">{event!.type}</Badge>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" />
                                                            {format(new Date(event!.date), "MMM dd, yyyy")}
                                                        </span>
                                                        <span>{event!.estimatedAttendance.toLocaleString()} attendees</span>
                                                    </div>
                                                </motion.div>
                                            </Link>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Preferred Tiers */}
                            <Card className="border-border/50">
                                <CardHeader>
                                    <CardTitle className="text-lg">Preferred Tiers</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {sponsor.preferredTiers.map((tier) => (
                                            <Badge key={tier} variant="default" className="bg-intelligence-accent">
                                                {tier}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Target Demographics */}
                            <Card className="border-border/50 bg-gradient-to-br from-background to-intelligence-primary/[0.02]">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Target className="w-5 h-5 text-intelligence-primary" />
                                        Target Demographics
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="p-3 bg-muted/40 rounded-lg">
                                        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-bold">Age Range</p>
                                        <p className="font-semibold">{sponsor.targetDemographics.ageRange}</p>
                                    </div>
                                    <div className="p-3 bg-muted/40 rounded-lg">
                                        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-bold">Income Level</p>
                                        <p className="font-semibold">{sponsor.targetDemographics.incomeLevel}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-2">Key Interests</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {sponsor.targetDemographics.interests.map((interest) => (
                                                <Badge key={interest} variant="outline" className="text-xs border-intelligence-primary/20 bg-intelligence-primary/5">
                                                    {interest}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SponsorDetail;
