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
    Save,
    FileText,
    X
} from "lucide-react";
import FileUploader from "@/components/common/FileUploader";
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
import { generateStrategyPDF, shareStrategy } from "@/lib/pdfUtils";

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
        uniqueAngle: "",
        assets: [] as string[]
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
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isActive ? "bg-emerald-700 text-white scale-110 shadow-lg shadow-emerald-700/20" :
                                        isCompleted ? "bg-emerald-500 text-white" : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                        }`}>
                                        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                                    </div>
                                    <span className={`text-[10px] mt-2 uppercase font-bold tracking-widest ${isActive ? "text-emerald-700" : "text-muted-foreground"}`}>
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
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50" />

                            {currentStep === 1 && (
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-serif font-bold text-black">The Designer's Vision</h2>
                                        <p className="text-muted-foreground italic">Define the core identity of your upcoming fashion project.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Event Name</Label>
                                            <Input
                                                id="name"
                                                placeholder="e.g. Lagos Streetwear Summit 2026"
                                                className="bg-white border-emerald-100 h-12 text-emerald-950"
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
                                                <SelectTrigger className="bg-white border-emerald-100 h-12 text-emerald-950">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white border-emerald-100 text-emerald-950">
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
                                            className="bg-white border-emerald-100 h-12 text-emerald-950"
                                            value={formData.targetAudience}
                                            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="angle">The "Unique Angle" (Critical for AI Gap Analysis)</Label>
                                        <Textarea
                                            id="angle"
                                            placeholder="What makes this event different? (e.g. focused on sustainable local fabrics, integrating AR showpieces, under-the-bridge venue)"
                                            className="bg-white border-emerald-100 min-h-[120px] text-black"
                                            value={formData.uniqueAngle}
                                            onChange={(e) => setFormData({ ...formData, uniqueAngle: e.target.value })}
                                        />
                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Zap className="w-3 h-3 text-emerald-700" />
                                            The Coach uses this to compare against 100+ analyzed Lagos fashion events.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <Label>Project Assets (Mood Boards, Venue PDFs, Concepts)</Label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {formData.assets.map((asset, i) => (
                                                <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden border border-white/5 bg-white/5 p-2">
                                                    {asset.toLowerCase().endsWith('.pdf') ? (
                                                        <div className="w-full h-full flex flex-col items-center justify-center text-center">
                                                            <FileText className="w-8 h-8 text-intelligence-primary mb-2" />
                                                            <span className="text-[10px] text-muted-foreground truncate w-full px-2">PDF Document</span>
                                                        </div>
                                                    ) : (
                                                        <img src={asset} alt="Asset" className="w-full h-full object-cover rounded-xl" />
                                                    )}
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setFormData({ ...formData, assets: formData.assets.filter((_, idx) => idx !== i) });
                                                        }}
                                                        className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="w-3 h-3 text-white" />
                                                    </button>
                                                </div>
                                            ))}
                                            <div className="col-span-1">
                                                <FileUploader
                                                    bucket="event-assets"
                                                    path={`my-events/${newId}`}
                                                    onUploadComplete={(url) => setFormData({ ...formData, assets: [...formData.assets, url] })}
                                                    label="Add Asset"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-8 text-center py-10">
                                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
                                        {isGenerating ? <Loader2 className="w-10 h-10 text-emerald-700 animate-spin" /> : <Target className="w-10 h-10 text-emerald-700" />}
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-serif font-bold text-black">Identifying Market Gaps</h2>
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
                                                        <div className="mt-1"><Zap className="w-4 h-4 text-emerald-600" /></div>
                                                        <h4 className="text-sm font-bold text-black">{gap.title}</h4>
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
                                        <h2 className="text-3xl font-serif font-bold text-black">Sponsor Target Matrix</h2>
                                        <p className="text-muted-foreground">The Matchmaker identified these brands based on their recent spending behavior and "careabouts".</p>
                                    </div>

                                    <div className="space-y-4">
                                        {currentEvent?.aiRecommendations?.sponsorMatches.map((match, i) => (
                                            <div key={i} className="p-6 rounded-3xl glass-premium border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg font-bold border border-emerald-100">
                                                        {match.sponsorId.substring(0, 1)}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-lg text-black">Target ID: {match.sponsorId}</h4>
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

                                    <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100">
                                        <p className="text-sm text-emerald-700 font-medium leading-relaxed italic">
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
                                        <h2 className="text-3xl font-serif font-bold text-black">Strategy Blueprint Locked</h2>
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
                                                    <h3 className="text-xl font-bold mt-1 text-emerald-700">{formData.type.replace('_', ' ')}</h3>
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
                                        <Button
                                            onClick={() => currentEvent && generateStrategyPDF(currentEvent)}
                                            className="flex-1 bg-white border-slate-200 text-black hover:bg-slate-50 font-bold h-12 shadow-sm"
                                        >
                                            Download Pitch Primer (PDF)
                                        </Button>
                                        <Button
                                            onClick={async () => {
                                                if (currentEvent) {
                                                    const res = await shareStrategy(currentEvent);
                                                    if (res === "copied") toast.success("Strategy summary copied to clipboard!");
                                                }
                                            }}
                                            className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold h-12 shadow-md shadow-emerald-700/10"
                                        >
                                            Share Strategy
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
                                        className="gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-8 h-12 font-bold shadow-lg shadow-emerald-700/20"
                                    >
                                        {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : (currentStep === 2 ? "Run Intelligence Cross-Analysis" : "Proceed")}
                                        {!isGenerating && <ArrowRight className="w-4 h-4" />}
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleFinish}
                                        className="gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-8 h-12 font-bold shadow-lg shadow-emerald-700/20"
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
