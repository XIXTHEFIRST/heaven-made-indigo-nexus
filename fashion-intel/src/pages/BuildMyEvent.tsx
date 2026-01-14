import React, { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    ArrowRight,
    ArrowLeft,
    Zap,
    Target,
    Briefcase,
    Globe,
    Lightbulb,
    CheckCircle2,
    Loader2,
    Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useIntelligenceStore } from "@/stores/intelligenceStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { EventType, Currency } from "@/types/intelligence";

const steps = [
    { id: 1, title: "Mission & Vision", icon: Lightbulb },
    { id: 2, title: "Market Gap Analysis", icon: Target },
    { id: 3, title: "Sponsor Alignment", icon: Briefcase },
    { id: 4, title: "Strategy Finalization", icon: Save }
];

const BuildMyEvent = () => {
    const navigate = useNavigate();
    const { addMyEvent, generateStrategy, getMyEventById } = useIntelligenceStore();

    const [currentStep, setCurrentStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [newId] = useState(crypto.randomUUID());

    const [formData, setFormData] = useState({
        name: "",
        type: "RUNWAY_SHOW" as EventType,
        targetAudience: "",
        budgetGoal: 5000000,
        currency: "NGN" as Currency,
        uniqueAngle: ""
    });

    const currentEvent = getMyEventById(newId);

    const handleNext = async () => {
        if (currentStep === 1) {
            // Validate step 1
            if (!formData.name || !formData.uniqueAngle) {
                toast.error("Please provide a name and a unique angle for your event.");
                return;
            }

            // Create initial draft
            addMyEvent({
                ...formData,
                targetAudience: formData.targetAudience.split(',').map(s => s.trim()),
            });
            setCurrentStep(2);
        } else if (currentStep === 2) {
            setIsGenerating(true);
            await generateStrategy(newId);
            setIsGenerating(false);
            setCurrentStep(3);
        } else if (currentStep === 3) {
            setCurrentStep(4);
        }
    };

    const handleFinish = () => {
        toast.success("Strategy finalized and saved to your hub!");
        navigate("/my-strategy");
    };

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="pt-24 pb-12">
                <div className="container mx-auto px-6 max-w-4xl">
                    {/* Progress Stepper */}
                    <div className="flex justify-between mb-12 relative">
                        <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2 z-0" />
                        {steps.map((step) => {
                            const Icon = step.icon;
                            const isActive = currentStep === step.id;
                            const isCompleted = currentStep > step.id;

                            return (
                                <div key={step.id} className="relative z-10 flex flex-col items-center">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isActive ? "bg-intelligence-primary text-black scale-110 shadow-lg shadow-intelligence-primary/20" :
                                        isCompleted ? "bg-green-500 text-white" : "bg-white/5 text-muted-foreground border border-white/10"
                                        }`}>
                                        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                                    </div>
                                    <span className={`text-[10px] mt-2 uppercase font-bold tracking-widest ${isActive ? "text-intelligence-primary" : "text-muted-foreground"}`}>
                                        {step.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="glass-dark border-white/5 rounded-3xl p-8 md:p-12 overflow-hidden relative"
                        >
                            {/* Visual Background Flair */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-intelligence-primary/5 rounded-full blur-3xl" />

                            {currentStep === 1 && (
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-serif font-bold text-white">The Designer's Vision</h2>
                                        <p className="text-muted-foreground italic">Define the core identity of your upcoming fashion project.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Event Name</Label>
                                            <Input
                                                id="name"
                                                placeholder="e.g. Lagos Streetwear Summit 2026"
                                                className="glass-dark border-white/10 h-12"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="type">Event Format</Label>
                                            <Select
                                                value={formData.type}
                                                onValueChange={(val: EventType) => setFormData({ ...formData, type: val })}
                                            >
                                                <SelectTrigger className="glass-dark border-white/10 h-12">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-charcoal-light border-white/10 text-white">
                                                    <SelectItem value="RUNWAY_SHOW">Runway Show</SelectItem>
                                                    <SelectItem value="FASHION_WEEK">Fashion Week</SelectItem>
                                                    <SelectItem value="POP_UP">Pop-up Shop</SelectItem>
                                                    <SelectItem value="WORKSHOP">Education/Workshop</SelectItem>
                                                    <SelectItem value="EXHIBITION">Exhibition</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="audience">Target Audience Lifestyle</Label>
                                        <Input
                                            id="audience"
                                            placeholder="e.g. Gen-Z Creatives, Tech-forward Lagosians, HNWIs"
                                            className="glass-dark border-white/10 h-12"
                                            value={formData.targetAudience}
                                            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="angle">The "Unique Angle" (Critical for AI Gap Analysis)</Label>
                                        <Textarea
                                            id="angle"
                                            placeholder="What makes this event different? (e.g. focused on sustainable local fabrics, integrating AR showpieces, under-the-bridge venue)"
                                            className="glass-dark border-white/10 min-h-[120px]"
                                            value={formData.uniqueAngle}
                                            onChange={(e) => setFormData({ ...formData, uniqueAngle: e.target.value })}
                                        />
                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Zap className="w-3 h-3 text-intelligence-primary" />
                                            The Coach uses this to compare against 100+ analyzed Lagos fashion events.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-8 text-center py-10">
                                    <div className="w-20 h-20 bg-intelligence-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        {isGenerating ? <Loader2 className="w-10 h-10 text-intelligence-primary animate-spin" /> : <Target className="w-10 h-10 text-intelligence-primary" />}
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-serif font-bold text-white">Identifying Market Gaps</h2>
                                        <p className="text-muted-foreground">We are cross-referencing your project against 42 documented event failures and 15 success patterns in your category.</p>
                                    </div>

                                    {isGenerating ? (
                                        <div className="space-y-4">
                                            <p className="text-sm font-mono text-intelligence-primary uppercase animate-pulse">Running competitive cross-analysis...</p>
                                            <div className="max-w-xs mx-auto h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-intelligence-primary"
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 2 }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mt-8">
                                            {currentEvent?.aiRecommendations?.marketGaps.map((gap, i) => (
                                                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                                                    <div className="flex gap-3">
                                                        <div className="mt-1"><Zap className="w-4 h-4 text-intelligence-accent" /></div>
                                                        <h4 className="text-sm font-bold text-white">{gap.title}</h4>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground ml-7">{gap.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-serif font-bold text-white">Sponsor Target Matrix</h2>
                                        <p className="text-muted-foreground">The Matchmaker identified these brands based on their recent spending behavior and "careabouts".</p>
                                    </div>

                                    <div className="space-y-4">
                                        {currentEvent?.aiRecommendations?.sponsorMatches.map((match, i) => (
                                            <div key={i} className="p-6 rounded-3xl glass-premium border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-full bg-intelligence-primary/20 flex items-center justify-center text-lg font-bold">
                                                        {match.sponsorId.substring(0, 1)}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-lg text-white">Target ID: {match.sponsorId}</h4>
                                                        <p className="text-sm text-muted-foreground">{match.reason}</p>
                                                    </div>
                                                </div>
                                                <div className="text-center md:text-right">
                                                    <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Win Probability</div>
                                                    <div className={`text-2xl font-serif font-bold ${match.fitScore > 80 ? "text-green-500" : "text-intelligence-primary"}`}>
                                                        {match.fitScore}%
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-6 rounded-3xl bg-intelligence-accent/5 border border-intelligence-accent/20">
                                        <p className="text-sm text-intelligence-accent font-medium leading-relaxed italic">
                                            "Pro-Tip: Most sponsors in your match list are currently looking for 'Community Depth' rather than just 'Logo Slapping'. Adjust your pitch accordingly."
                                        </p>
                                    </div>
                                </div>
                            )}

                            {currentStep === 4 && (
                                <div className="space-y-8">
                                    <div className="text-center space-y-2">
                                        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <h2 className="text-3xl font-serif font-bold text-white">Strategy Blueprint Locked</h2>
                                        <p className="text-muted-foreground">Your project architecture is ready for the pitch phase.</p>
                                    </div>

                                    <Card className="glass-premium border-white/10 bg-gradient-to-br from-white/5 to-transparent">
                                        <CardContent className="p-8 space-y-6">
                                            <div className="grid grid-cols-2 gap-8">
                                                <div>
                                                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Project Identity</span>
                                                    <h3 className="text-xl font-bold mt-1">{formData.name}</h3>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Market Class</span>
                                                    <h3 className="text-xl font-bold mt-1 text-intelligence-primary">{formData.type.replace('_', ' ')}</h3>
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t border-white/5">
                                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-2 block">AI Verified Strategy Hook</span>
                                                <p className="text-sm text-white italic leading-relaxed">
                                                    "{formData.uniqueAngle}"
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <div className="flex gap-4">
                                        <Button className="flex-1 bg-white text-black hover:bg-white/90 font-bold h-12">
                                            Download Pitch Primer (PDF)
                                        </Button>
                                        <Button className="flex-1 bg-intelligence-primary hover:bg-intelligence-primary-dark text-black font-bold h-12">
                                            Export to Google Slides
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Footer Navigation */}
                            <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center text-white">
                                <Button
                                    variant="ghost"
                                    onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                                    disabled={currentStep === 1 || isGenerating}
                                    className="gap-2 text-muted-foreground hover:text-white"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Previous
                                </Button>

                                {currentStep < 4 ? (
                                    <Button
                                        onClick={handleNext}
                                        disabled={isGenerating}
                                        className="gap-2 bg-intelligence-primary hover:bg-intelligence-primary-dark text-black px-8 h-12 font-bold"
                                    >
                                        {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : (currentStep === 2 ? "Run Intelligence Cross-Analysis" : "Proceed")}
                                        {!isGenerating && <ArrowRight className="w-4 h-4" />}
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleFinish}
                                        className="gap-2 bg-intelligence-primary hover:bg-intelligence-primary-dark text-black px-8 h-12 font-bold"
                                    >
                                        Seal Strategy Hub <CheckCircle2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Fun Coach Sidebar Note on Desktop */}
                    <div className="hidden lg:block fixed right-10 top-1/2 -translate-y-1/2 w-64 space-y-4">
                        <div className="p-4 rounded-2xl glass-dark border border-white/5 text-xs text-muted-foreground space-y-2 opacity-60">
                            <p className="font-bold text-intelligence-primary uppercase tracking-tighter">Coach Active Context:</p>
                            <p>"I'm currently looking for high-net-worth alignments in the RTW sector based on the Q1 trends from Lagos Fashion Week."</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BuildMyEvent;
