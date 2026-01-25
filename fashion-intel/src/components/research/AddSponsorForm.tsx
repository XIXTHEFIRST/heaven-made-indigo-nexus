import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2,
    Mail,
    Phone,
    Globe,
    FileText,
    Plus,
    BadgeInfo,
    X,
    Check,
    Loader2,
    DollarSign,
    Zap,
    ImageIcon
} from "lucide-react";
import FileUploader from "@/components/common/FileUploader";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Industry, SponsorshipTier, Sponsor } from "@/types/intelligence";
import { useIntelligenceStore } from "@/stores/intelligenceStore";
import { toast } from "sonner";

// Nigerian Phone Validation
const phoneRegex = /^\+234\d{10}$/;

const sponsorSchema = z.object({
    name: z.string().min(2, "Company name must be at least 2 characters"),
    industry: z.nativeEnum(Industry),
    totalInvestmentBudget: z.number().min(0),
    contactEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
    contactPhone: z.string().regex(phoneRegex, "Must be in format +2348012345678").optional().or(z.literal("")),
    description: z.string().min(10, "Provide a brief description of the sponsor's focus"),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
    logo: z.string().optional(),
    internalNotes: z.string().optional(),
});

type SponsorFormValues = z.infer<typeof sponsorSchema>;

interface AddSponsorFormProps {
    onClose: () => void;
    onSuccess?: () => void;
    initialData?: Partial<SponsorFormValues> & { id: string };
}

const AddSponsorForm: React.FC<AddSponsorFormProps> = ({ onClose, onSuccess, initialData }) => {
    const isEditing = !!initialData;
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.logo || null);
    const [isQuickAdd, setIsQuickAdd] = useState(false);
    const { addSponsor, updateSponsor, sponsors } = useIntelligenceStore();

    const form = useForm<SponsorFormValues>({
        resolver: zodResolver(sponsorSchema),
        defaultValues: initialData || {
            name: "",
            industry: Industry.BANKING,
            totalInvestmentBudget: 0,
            contactEmail: "",
            contactPhone: "+234",
            description: "",
            website: "",
            internalNotes: "",
        },
    });

    const formatCurrency = (val: number) => {
        if (val >= 1000000000) return `₦${(val / 1000000000).toFixed(1)}B`;
        if (val >= 1000000) return `₦${(val / 1000000).toFixed(1)}M`;
        if (val >= 1000) return `₦${(val / 1000).toFixed(1)}K`;
        return `₦${val}`;
    };

    const handleLogoUpload = (url: string) => {
        setPreviewUrl(url);
        form.setValue("logo", url);
    };

    const onSubmit = (values: SponsorFormValues) => {
        if (!isEditing) {
            // Duplicate detection only for new sponsors
            const exists = sponsors.find(s => s.name.toLowerCase() === values.name.toLowerCase());
            if (exists) {
                toast.error("A sponsor with this name already exists in the intelligence database.");
                return;
            }
        }

        try {
            if (isEditing) {
                updateSponsor(initialData.id, values as Partial<Sponsor>);
                toast.success("Sponsor profile updated!");
            } else {
                const sponsorData = {
                    ...values,
                    eventsSponsored: [],
                    totalSponsorship: 0,
                    averageROI: 0,
                    preferredTiers: [SponsorshipTier.GOLD],
                    targetDemographics: {
                        ageRange: "18-45",
                        genderSplit: { male: 50, female: 50, other: 0 },
                        incomeLevel: "All",
                        interests: ["General"]
                    }
                };
                const { logo, ...rest } = values; // Just to make it cleaner
                addSponsor(sponsorData as Omit<Sponsor, 'id' | 'activeSince'>);
                toast.success("Sponsor profile created!");
            }

            if (onSuccess) onSuccess();
            onClose();
        } catch (error) {
            toast.error("Fixed some issues and try again.");
        }
    };

    return (
        <div className="flex flex-col h-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-border/50 bg-background/50 backdrop-blur-xl">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-serif font-bold tracking-tight">Register New Sponsor</h2>
                        <p className="text-sm text-muted-foreground">Market Participant Intelligence</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="quick-add"
                                checked={isQuickAdd}
                                onCheckedChange={setIsQuickAdd}
                            />
                            <Label htmlFor="quick-add" className="text-xs font-bold uppercase tracking-tighter cursor-pointer">Quick Add</Label>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Logo Column */}
                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative group">
                                    <div className={cn(
                                        "w-32 h-32 rounded-3xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all bg-white/5 hover:bg-white/10",
                                        previewUrl ? "border-intelligence-primary shadow-lg shadow-intelligence-primary/20" : "border-white/10"
                                    )}>
                                        {previewUrl ? (
                                            <img src={previewUrl} alt="Logo" className="w-full h-full object-contain p-2" />
                                        ) : (
                                            <Building2 className="w-12 h-12 text-muted-foreground opacity-20" />
                                        )}
                                    </div>
                                    <div className="mt-4 w-full">
                                        <FileUploader
                                            bucket="sponsor-logos"
                                            path="logos"
                                            onUploadComplete={handleLogoUpload}
                                            label={previewUrl ? "Change Logo" : "Upload Logo"}
                                        />
                                    </div>
                                    {previewUrl && (
                                        <button
                                            onClick={() => {
                                                setPreviewUrl(null);
                                                form.setValue("logo", "");
                                            }}
                                            className="absolute -top-2 -right-2 p-1.5 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-all border border-red-500/50"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Company Brand Identity</p>
                            </div>

                            {/* Info Column */}
                            <div className="md:col-span-2 space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter registered name" {...field} className="glass-dark border-white/10" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="industry"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Vertical Sector</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="glass-dark border-white/10">
                                                            <SelectValue placeholder="Select industry" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {Object.values(Industry).map(ind => (
                                                            <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="totalInvestmentBudget"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex justify-between">
                                                    Annual Capacity
                                                    <span className="text-intelligence-primary text-xs font-mono">
                                                        {formatCurrency(field.value)}
                                                    </span>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-2.5 text-muted-foreground">₦</span>
                                                        <Input
                                                            type="number"
                                                            className="pl-7 glass-dark border-white/10"
                                                            {...field}
                                                            onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        {!isQuickAdd && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-6 pt-4"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="contactEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <Mail className="w-4 h-4 text-intelligence-accent" />
                                                    Strategic Contact Email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder="intelligence@company.com" {...field} className="glass-dark border-white/10" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="contactPhone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4 text-intelligence-accent" />
                                                    Direct Hotline
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+2348012345678" {...field} className="glass-dark border-white/10" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="website"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Globe className="w-4 h-4 text-intelligence-accent" />
                                                Digital HQ (Website)
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://..." {...field} className="glass-dark border-white/10" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <BadgeInfo className="w-4 h-4 text-intelligence-accent" />
                                                Sponsorship Objectives
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Identify key marketing goals and historical sponsorship focus..."
                                                    className="h-24 glass-dark border-white/10"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="internalNotes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-intelligence-accent" />
                                                Confidential Research Notes
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Internal memos, negotiating leverage, and private observations..."
                                                    className="h-20 glass-dark border-white/10 bg-yellow-500/5"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>
                        )}
                    </form>
                </Form>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border/50 bg-background/50 backdrop-blur-xl flex justify-end gap-3">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button
                    disabled={form.formState.isSubmitting}
                    onClick={form.handleSubmit(onSubmit)}
                    className="bg-intelligence-primary hover:bg-intelligence-primary-dark gap-2 shadow-lg shadow-intelligence-primary/20"
                >
                    {form.formState.isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Zap className="w-4 h-4" />
                    )}
                    Commit to Database
                </Button>
            </div>
        </div>
    );
};

export default AddSponsorForm;
