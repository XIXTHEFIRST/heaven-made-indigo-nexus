import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar as CalendarIcon,
    MapPin,
    Users,
    Type,
    FileText,
    Image as ImageIcon,
    Check,
    ChevronRight,
    ChevronLeft,
    Upload,
    X,
    Loader2,
    Plus,
    Trash2,
    DollarSign,
    Zap,
    MessageSquare,
    AlertCircle
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Scale } from "lucide-react";
import { EventType, SponsorshipTier } from "@/types/intelligence";
import { useIntelligenceStore } from "@/stores/intelligenceStore";
import { toast } from "sonner";

const LAGOS_VENUES = [
    "Eko Hotel & Suites",
    "Federal Palace Hotel",
    "Terra Kulture",
    "Freedom Park Lagos",
    "Landmark Event Centre",
    "Oriental Hotel",
    "The Civic Centre",
    "Nike Art Gallery",
    "Red Door Gallery",
    "Victoria Island",
    "Ikoyi",
    "Lekki Phase 1"
];

const eventSchema = z.object({
    name: z.string().min(2, "Event name must be at least 2 characters"),
    date: z.date({
        required_error: "A date is required.",
    }),
    venue: z.string().min(1, "Venue is required"),
    location: z.string().min(1, "Location is required"),
    type: z.nativeEnum(EventType),
    estimatedAttendance: z.number().min(1, "Attendance is required"),
    description: z.string().max(1000, "Description must be less than 1000 characters"),
    bannerImage: z.string().optional(),
    status: z.enum(["upcoming", "completed", "cancelled"]).default("completed"),

    // NEW Intelligence Fields
    intelSponsors: z.array(z.object({
        sponsorId: z.string().min(1, "Select a sponsor"),
        tier: z.nativeEnum(SponsorshipTier),
        dealAmount: z.number().min(0),
        deliverables: z.string().min(1, "Deliverables required")
    })),

    successMetrics: z.object({
        socialImpressions: z.number().min(0).default(0),
        mediaCoverage: z.string().default(""),
        attendanceVsExpected: z.number().min(0).max(200).default(100),
        viralMoments: z.string().default("")
    }),

    analysis: z.object({
        whatWorked: z.string().min(1, "Tell us what went well"),
        whatFlopped: z.string().min(1, "Tell us what could be improved"),
        sponsorFeedback: z.string().optional()
    })
});

type EventFormValues = z.infer<typeof eventSchema>;

interface AddEventFormProps {
    onClose: () => void;
    onSuccess?: () => void;
    initialData?: any;
}

const AddEventForm: React.FC<AddEventFormProps> = ({ onClose, onSuccess, initialData }) => {
    const isEditing = !!initialData;
    const [step, setStep] = useState(1);
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.bannerImage || null);
    const [isVenuesOpen, setIsVenuesOpen] = useState(false);
    const { addEvent, updateEvent, sponsors, generateAutopsy } = useIntelligenceStore();

    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventSchema),
        defaultValues: initialData || {
            name: "",
            venue: "",
            location: "Lagos, Nigeria",
            type: EventType.RUNWAY_SHOW,
            estimatedAttendance: 500,
            description: "",
            status: "completed",
            intelSponsors: [],
            successMetrics: {
                socialImpressions: 0,
                mediaCoverage: "",
                attendanceVsExpected: 100,
                viralMoments: ""
            },
            analysis: {
                whatWorked: "",
                whatFlopped: "",
                sponsorFeedback: ""
            }
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "intelSponsors"
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setPreviewUrl(base64);
                form.setValue("bannerImage", base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (values: EventFormValues) => {
        try {
            const finalData = {
                ...values,
                organizer: "Industry Research",
                sponsors: values.intelSponsors.map(s => s.sponsorId),
                budget: {
                    min: Math.min(...values.intelSponsors.map(s => s.dealAmount)),
                    max: values.intelSponsors.reduce((acc, s) => acc + s.dealAmount, 0),
                    currency: "₦"
                },
                mediaMetrics: {
                    socialReach: values.successMetrics.socialImpressions,
                    pressArticles: values.successMetrics.mediaCoverage.split(',').length,
                    instagramPosts: 0,
                    twitterMentions: 0,
                    engagement: 0
                },
                recurring: false,
                verification: { status: "estimated", confidence: 85 }
            };

            if (isEditing) {
                updateEvent(initialData.id, finalData as any);
                toast.success("Intelligence updated!");
            } else {
                addEvent(finalData as any);
                // Trigger Autopsy Generation after slight delay
                const newId = useIntelligenceStore.getState().events[0].id;
                setTimeout(() => generateAutopsy(newId), 500);
                toast.success("Event analyzed & stored!");
            }

            if (onSuccess) onSuccess();
            onClose();
        } catch (error) {
            toast.error("Please fill all required intelligence fields.");
        }
    };

    const nextStep = async () => {
        let fieldsToValidate: any[] = [];
        if (step === 1) fieldsToValidate = ["name", "date", "venue", "location"];
        if (step === 2) fieldsToValidate = ["type", "estimatedAttendance", "description"];
        if (step === 3) fieldsToValidate = ["intelSponsors", "successMetrics"];

        const isValid = await form.trigger(fieldsToValidate);
        if (isValid) setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    return (
        <div className="flex flex-col h-full max-h-[95vh] overflow-hidden bg-background">
            {/* Header */}
            <div className="p-6 border-b border-border/50 bg-background/80 backdrop-blur-xl">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-serif font-bold tracking-tight text-glow">
                            {isEditing ? "Refine Event Intelligence" : "Study New Event Intelligence"}
                        </h2>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Lagos Fashion Scene Autopsy</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/10">
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Progress Bar */}
                <div className="relative h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-intelligence-primary to-intelligence-accent"
                        initial={{ width: "25%" }}
                        animate={{ width: `${(step / 4) * 100}%` }}
                    />
                </div>
                <div className="flex justify-between mt-2 px-1">
                    {["Basics", "Context", "Sponsors", "Autopsy"].map((label, i) => (
                        <span key={label} className={cn(
                            "text-[10px] uppercase tracking-widest font-bold transition-colors",
                            step > i ? "text-intelligence-primary" : "text-muted-foreground"
                        )}>
                            {label}
                        </span>
                    ))}
                </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <Type className="w-4 h-4 text-intelligence-accent" />
                                                    Event Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. Lagos Fashion Week 2024" {...field} className="glass-dark border-white/10" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="date"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel className="flex items-center gap-2">
                                                        <CalendarIcon className="w-4 h-4 text-intelligence-accent" />
                                                        Past Event Date
                                                    </FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button variant="outline" className="w-full pl-3 text-left font-normal glass-dark border-white/10">
                                                                    {field.value ? format(field.value, "PPP") : <span>Pick date</span>}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="venue"
                                            render={({ field }) => (
                                                <FormItem className="relative">
                                                    <FormLabel className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-intelligence-accent" />
                                                        Venue
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input placeholder="Search Lagos Venues..." {...field} onFocus={() => setIsVenuesOpen(true)} className="glass-dark border-white/10" />
                                                            {isVenuesOpen && (
                                                                <div className="absolute z-50 w-full mt-1 glass-premium border border-white/10 rounded-lg shadow-2xl max-h-40 overflow-y-auto">
                                                                    {LAGOS_VENUES.filter(v => v.toLowerCase().includes(field.value.toLowerCase())).map(venue => (
                                                                        <button key={venue} type="button" className="w-full px-4 py-2 text-left text-sm hover:bg-intelligence-primary/20 transition-colors" onClick={() => { field.onChange(venue); setIsVenuesOpen(false); }}>{venue}</button>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField control={form.control} name="location" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Geo-Location</FormLabel>
                                            <FormControl><Input placeholder="Lagos, Nigeria" {...field} className="glass-dark border-white/10" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Event Category</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl><SelectTrigger className="glass-dark border-white/10"><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                                                        <SelectContent>{Object.values(EventType).map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="estimatedAttendance"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-2">
                                                        <Users className="w-4 h-4 text-intelligence-accent" />
                                                        Actual Attendance
                                                    </FormLabel>
                                                    <FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} className="glass-dark border-white/10" /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField control={form.control} name="description" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Overview & Vision</FormLabel>
                                            <FormControl><Textarea className="h-32 glass-dark border-white/10" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <div className="relative h-40 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center overflow-hidden bg-muted/20">
                                        {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" /> : <div className="text-center"><Upload className="w-8 h-8 mx-auto text-muted-foreground" /><p className="text-xs mt-2">Upload Banner</p></div>}
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} />
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <FormLabel className="text-lg font-bold flex items-center gap-2">
                                                <DollarSign className="w-5 h-5 text-green-500" />
                                                Sponsor Tracking
                                            </FormLabel>
                                            <Button type="button" variant="outline" size="sm" onClick={() => append({ sponsorId: "", tier: SponsorshipTier.GOLD, dealAmount: 0, deliverables: "" })} className="gap-2 border-intelligence-primary/50 text-intelligence-primary hover:bg-intelligence-primary/10">
                                                <Plus className="w-4 h-4" /> Add Sponsor
                                            </Button>
                                        </div>

                                        <div className="space-y-4">
                                            {fields.map((field, index) => (
                                                <div key={field.id} className="p-4 rounded-xl glass-dark border border-white/10 space-y-4">
                                                    <div className="flex justify-between items-start">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 mr-4">
                                                            <FormField control={form.control} name={`intelSponsors.${index}.sponsorId`} render={({ field }) => (
                                                                <FormItem>
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <FormControl><SelectTrigger className="bg-transparent"><SelectValue placeholder="Sponsor Name" /></SelectTrigger></FormControl>
                                                                        <SelectContent>{sponsors.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent>
                                                                    </Select>
                                                                </FormItem>
                                                            )} />
                                                            <FormField control={form.control} name={`intelSponsors.${index}.tier`} render={({ field }) => (
                                                                <FormItem>
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <FormControl><SelectTrigger className="bg-transparent"><SelectValue placeholder="Tier" /></SelectTrigger></FormControl>
                                                                        <SelectContent>{Object.values(SponsorshipTier).map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                                                    </Select>
                                                                </FormItem>
                                                            )} />
                                                        </div>
                                                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></Button>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <FormField control={form.control} name={`intelSponsors.${index}.dealAmount`} render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl><Input type="number" placeholder="Deal Amount (₦)" {...field} onChange={e => field.onChange(parseInt(e.target.value))} className="bg-transparent" /></FormControl>
                                                            </FormItem>
                                                        )} />
                                                        <FormField control={form.control} name={`intelSponsors.${index}.deliverables`} render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl><Input placeholder="Key Deliverables (e.g. Naming rights)" {...field} className="bg-transparent" /></FormControl>
                                                            </FormItem>
                                                        )} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <FormLabel className="text-lg font-bold flex items-center gap-2">
                                            <Zap className="w-5 h-5 text-yellow-500" />
                                            Success Metrics
                                        </FormLabel>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormField control={form.control} name="successMetrics.socialImpressions" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs">Social Impressions</FormLabel>
                                                    <FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} className="glass-dark" /></FormControl>
                                                </FormItem>
                                            )} />
                                            <FormField control={form.control} name="successMetrics.attendanceVsExpected" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs">Attendance vs Expected (%)</FormLabel>
                                                    <FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} className="glass-dark" /></FormControl>
                                                </FormItem>
                                            )} />
                                        </div>
                                        <FormField control={form.control} name="successMetrics.mediaCoverage" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs text-muted-foreground italic">Media Coverage (Publications, TV segments)</FormLabel>
                                                <FormControl><Textarea className="glass-dark h-20" {...field} /></FormControl>
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="successMetrics.viralMoments" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs text-muted-foreground italic">Viral Moments (Key viral events/content)</FormLabel>
                                                <FormControl><Textarea className="glass-dark h-20" {...field} /></FormControl>
                                            </FormItem>
                                        )} />
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <div className="p-4 rounded-xl bg-intelligence-accent/10 border border-intelligence-accent/20 flex gap-4">
                                        <AlertCircle className="w-6 h-6 text-intelligence-accent shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-intelligence-accent">Intelligence Autopsy</h4>
                                            <p className="text-xs text-muted-foreground mt-1">Provide critical feedback to unlock AI market gap analysis and lesson generation.</p>
                                        </div>
                                    </div>

                                    <FormField control={form.control} name="analysis.whatWorked" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-green-500" />
                                                What Went Well? (Success Factors)
                                            </FormLabel>
                                            <FormControl><Textarea placeholder="e.g. Lighting, seating arrangement, VIP lounge activation..." className="glass-dark h-24" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="analysis.whatFlopped" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <X className="w-4 h-4 text-red-500" />
                                                What Flopped? (Exploitable Weaknesses)
                                            </FormLabel>
                                            <FormControl><Textarea placeholder="e.g. Slow credentialing, heat in the main hall, poor sound..." className="glass-dark h-24" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="analysis.sponsorFeedback" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <MessageSquare className="w-4 h-4 text-blue-500" />
                                                Sponsor Rumors/Feedback (Optional)
                                            </FormLabel>
                                            <FormControl><Textarea placeholder="What did sponsors say behind the scenes?" className="glass-dark h-20" {...field} /></FormControl>
                                        </FormItem>
                                    )} />

                                    <div className="flex items-center gap-4 p-4 rounded-xl glass-premium border border-white/10">
                                        <Scale className="w-8 h-8 text-intelligence-primary" />
                                        <div className="text-xs">
                                            <p className="font-bold uppercase tracking-tight">Intelligence Ready</p>
                                            <p className="text-muted-foreground">Submitting this data will automatically trigger an AI-generated Event Autopsy Report in your library.</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </Form>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border/50 bg-background/80 backdrop-blur-xl flex justify-between items-center">
                <Button variant="ghost" onClick={onClose}>Cancel Research</Button>
                <div className="flex gap-3">
                    {step > 1 && <Button variant="outline" onClick={prevStep} className="gap-2"><ChevronLeft className="w-4 h-4" /> Back</Button>}
                    {step < 4 ? (
                        <Button type="button" onClick={nextStep} className="bg-intelligence-primary hover:bg-intelligence-primary-dark shadow-lg shadow-intelligence-primary/20 gap-2 font-bold">
                            Continue <ChevronRight className="w-4 h-4" />
                        </Button>
                    ) : (
                        <Button disabled={form.formState.isSubmitting} onClick={form.handleSubmit(onSubmit)} className="bg-gradient-to-r from-intelligence-primary to-intelligence-accent hover:opacity-90 shadow-lg shadow-intelligence-primary/40 font-bold px-8">
                            {form.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
                            Store & Analyze
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddEventForm;
