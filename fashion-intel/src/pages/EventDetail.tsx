import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartCard } from "@/components/intelligence/ChartCard";
import { useIntelligenceStore } from "@/stores/intelligenceStore";
import { Calendar, MapPin, Users, DollarSign, ArrowLeft, Building2, TrendingUp, BrainCircuit, Sparkles, Loader2, Target } from "lucide-react";
import { format } from "date-fns";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import EventAutopsyReport from "@/components/events/EventAutopsyReport";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const EventDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { getEventById, getSponsorById, events, generateAutopsy } = useIntelligenceStore();
    const [isGenerating, setIsGenerating] = React.useState(false);

    const event = getEventById(id!);

    if (!event) {
        return (
            <div className="min-h-screen bg-background">
                <Navigation />
                <div className="pt-24 pb-12">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-3xl font-bold mb-4 text-white">Event Not Found</h1>
                        <Link to="/events">
                            <Button className="bg-intelligence-primary text-black font-bold">Back to Events</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const sponsors = (event.intelSponsors || []).map((s) => ({
        ...s,
        sponsor: getSponsorById(s.sponsorId)
    })).filter(s => s.sponsor);

    // Similar events (same type)
    const similarEvents = events
        .filter((e) => e.type === event.type && e.id !== event.id)
        .slice(0, 3);

    // Demographics data for chart
    const genderData = [
        { name: "Male", value: event.demographics.genderSplit.male },
        { name: "Female", value: event.demographics.genderSplit.female },
        { name: "Other", value: event.demographics.genderSplit.other },
    ];

    const COLORS = ["hsl(var(--intelligence-primary))", "hsl(var(--intelligence-accent))", "hsl(var(--data-purple))"];

    const handleGenerateAutopsy = async () => {
        setIsGenerating(true);
        await generateAutopsy(event.id);
        setIsGenerating(false);
    };

    return (
        <div className="min-h-screen bg-background text-white">
            <Navigation />

            <div className="pt-24 pb-12">
                <div className="container mx-auto px-6">
                    {/* Back Button */}
                    <Link to="/events">
                        <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-white hover:bg-white/5">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Intelligence Hub
                        </Button>
                    </Link>

                    {/* Event Header */}
                    <div className="mb-12 p-10 rounded-[2rem] bg-gradient-to-br from-intelligence-primary/10 via-background to-intelligence-accent/5 border border-white/5 relative overflow-hidden">
                        {/* Abstract background elements */}
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-intelligence-primary/10 to-transparent opacity-20" />

                        <div className="relative z-10 flex flex-col md:flex-row items-start justify-between gap-8">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-4">
                                    <Badge variant="outline" className="border-intelligence-primary/50 text-intelligence-primary uppercase tracking-widest text-[10px]">{event.type}</Badge>
                                    <Badge variant="outline" className="border-white/20 text-muted-foreground uppercase tracking-widest text-[10px]">{event.location}</Badge>
                                </div>
                                <h1 className="text-5xl font-serif font-bold mb-4 tracking-tight">{event.name}</h1>
                                <p className="text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed">{event.description}</p>
                                <div className="flex items-center gap-3 text-sm font-medium">
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                        <Building2 className="w-4 h-4 text-intelligence-primary" />
                                    </div>
                                    <span className="text-muted-foreground italic">Organized by <span className="text-white not-italic font-bold">{event.organizer}</span></span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                {!event.autopsyReport ? (
                                    <Button
                                        onClick={handleGenerateAutopsy}
                                        disabled={isGenerating}
                                        className="bg-intelligence-primary hover:bg-intelligence-primary-dark text-black font-bold h-12 px-6 rounded-xl group shadow-lg shadow-intelligence-primary/20"
                                    >
                                        {isGenerating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <BrainCircuit className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />}
                                        Generate AI Autopsy
                                    </Button>
                                ) : (
                                    <Badge className="bg-intelligence-primary/20 text-intelligence-primary border-intelligence-primary/50 px-4 py-2 text-xs font-bold uppercase tracking-widest">
                                        Intel Ready
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Historical Date</p>
                                <p className="text-lg font-bold">{format(new Date(event.date), "MMMM dd, yyyy")}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Verification</p>
                                <p className="text-lg font-bold text-green-500 uppercase flex items-center gap-1">
                                    <Sparkles className="w-4 h-4" /> Verified
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Crowd Density</p>
                                <p className="text-lg font-bold">{event.estimatedAttendance.toLocaleString()}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Est. Capital</p>
                                <p className="text-lg font-bold">₦{(event.budget.min / 1000000).toFixed(0)}M-{(event.budget.max / 1000000).toFixed(0)}M</p>
                            </div>
                        </div>
                    </div>

                    {/* AI Intelligence Report Section */}
                    {event.autopsyReport && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-12"
                        >
                            <EventAutopsyReport event={event} />
                        </motion.div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Sponsors Intelligence */}
                            <Card className="glass-dark border-white/5 overflow-hidden">
                                <CardHeader className="border-b border-white/5 pb-6">
                                    <div className="flex items-center gap-3">
                                        <Target className="w-6 h-6 text-intelligence-primary" />
                                        <div>
                                            <CardTitle className="text-2xl font-serif">Sponsor Behavior Analysis</CardTitle>
                                            <CardDescription>How brands interacted with this specific event format</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-white/5">
                                        {sponsors.length > 0 ? sponsors.map((s, i) => (
                                            <div key={i} className="p-6 flex flex-col md:flex-row justify-between gap-6 hover:bg-white/[0.02] transition-colors">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h4 className="text-lg font-bold text-white">{s.sponsor?.name}</h4>
                                                        <Badge variant="outline" className="text-[9px] border-intelligence-primary/30 text-intelligence-primary uppercase">{s.tier}</Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground leading-relaxed italic">"Deliverables: {s.deliverables}"</p>
                                                </div>
                                                <div className="md:text-right">
                                                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1">Deal Intelligence</p>
                                                    <p className="text-xl font-bold">₦{(s.dealAmount / 1000000).toFixed(1)}M</p>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="p-12 text-center text-muted-foreground italic">
                                                No specific sponsor intel recorded for this profile.
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <ChartCard title="Target Demographics" description="Audience skew for this segment" className="border-white/5 bg-transparent p-0">
                                    <div className="h-[250px] mt-6">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={genderData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={90}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {genderData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#141414', border: '1px solid #ffffff10', borderRadius: '12px' }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="flex justify-center gap-6 pb-6">
                                        {genderData.map((d, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                                <span className="text-[10px] uppercase font-bold text-muted-foreground">{d.name} {d.value}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </ChartCard>

                                <Card className="glass-dark border-white/5">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Critical Tags</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {event.tags.map((tag) => (
                                                <Badge key={tag} className="bg-white/5 hover:bg-white/10 text-white border-white/10 px-3 py-1 text-xs">#{tag}</Badge>
                                            ))}
                                        </div>
                                        <div className="mt-8 p-4 rounded-2xl bg-intelligence-primary/5 border border-intelligence-primary/10">
                                            <p className="text-[10px] text-intelligence-primary uppercase font-bold mb-1">Coach Note</p>
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                Events tagged with <span className="text-white">#Streetwear</span> currently see 2x social conversion rates in the Ikeja district.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <Card className="glass-premium border-white/10 bg-gradient-to-br from-intelligence-primary/10 to-transparent">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-intelligence-primary" />
                                        Viral Velocity
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1">Social Footprint</p>
                                        <p className="text-3xl font-serif font-bold">{(event.mediaMetrics.socialReach / 1000000).toFixed(1)}M+</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1">Direct Engagement</p>
                                        <p className="text-3xl font-serif font-bold">{(event.mediaMetrics.engagement / 1000).toFixed(0)}K</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1">Press Dominance</p>
                                        <p className="text-3xl font-serif font-bold">{event.mediaMetrics.pressArticles} Articles</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Similar Patterns */}
                            {similarEvents.length > 0 && (
                                <Card className="glass-dark border-white/5">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Patterns & Models</CardTitle>
                                        <CardDescription>Similar event architectures</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {similarEvents.map((e) => (
                                            <Link key={e.id} to={`/events/${e.id}`}>
                                                <div className="p-4 rounded-xl border border-white/5 hover:bg-white/[0.02] hover:border-intelligence-primary/20 transition-all group">
                                                    <h4 className="font-bold text-sm mb-1 group-hover:text-intelligence-primary transition-colors">{e.name}</h4>
                                                    <p className="text-[10px] text-muted-foreground uppercase">{format(new Date(e.date), "MMM yyyy")}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
