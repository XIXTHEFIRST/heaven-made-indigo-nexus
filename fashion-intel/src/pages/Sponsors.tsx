import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { FilterBar } from "@/components/intelligence/FilterBar";
import { SponsorCard } from "@/components/sponsors/SponsorCard";
import { ChartCard } from "@/components/intelligence/ChartCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIntelligenceStore } from "@/stores/intelligenceStore";
import { Industry } from "@/types/intelligence";
import { motion } from "framer-motion";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";
import { Download, Plus } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";
import { exportToJSON, exportToCSV } from "@/lib/exportUtils";
import AddSponsorForm from "@/components/research/AddSponsorForm";
import { cn } from "@/lib/utils";

const Sponsors = () => {
    const {
        getFilteredSponsors,
        sponsorFilters,
        setSponsorFilters,
        resetSponsorFilters,
    } = useIntelligenceStore();

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingSponsor, setEditingSponsor] = useState<any>(null);

    const filteredSponsors = getFilteredSponsors();

    const handleIndustryToggle = (industry: Industry) => {
        const currentIndustries = sponsorFilters.industries || [];
        const newIndustries = currentIndustries.includes(industry)
            ? currentIndustries.filter((i) => i !== industry)
            : [...currentIndustries, industry];
        setSponsorFilters({ industries: newIndustries });
    };

    const handleEditSponsor = (sponsor: any) => {
        setEditingSponsor(sponsor);
        setIsAddDialogOpen(true);
    };

    const handleCloseDialog = (open: boolean) => {
        setIsAddDialogOpen(open);
        if (!open) setEditingSponsor(null);
    };

    // Calculate Industry Distribution
    const industryData = filteredSponsors.reduce((acc, sponsor) => {
        const existing = acc.find((item) => item.name === sponsor.industry);
        if (existing) {
            existing.value += 1;
        } else {
            acc.push({ name: sponsor.industry, value: 1 });
        }
        return acc;
    }, [] as { name: string; value: number }[]);

    // Calculate Investment Data
    const investmentData = [...filteredSponsors]
        .sort((a, b) => b.totalSponsorship - a.totalSponsorship)
        .slice(0, 5)
        .map(s => ({
            name: s.name.split(' ')[0],
            amount: s.totalSponsorship / 1000000
        }));

    const COLORS = ["hsl(var(--data-blue))", "hsl(var(--data-purple))", "hsl(var(--data-teal))", "hsl(var(--data-pink))", "hsl(var(--data-yellow))"];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />

            <div className="pt-24 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="container mx-auto px-6"
                >
                    {/* Header */}
                    <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-4xl font-serif font-bold mb-2">Sponsorship Analysis</h1>
                            <p className="text-lg text-muted-foreground">
                                Explore sponsors and analyze sponsorship dynamics
                            </p>
                        </div>

                        <Dialog open={isAddDialogOpen} onOpenChange={handleCloseDialog}>
                            <DialogTrigger asChild>
                                <Button className="bg-intelligence-primary hover:bg-intelligence-primary-dark gap-2">
                                    <Plus className="w-4 h-4" />
                                    Add New Sponsor
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl p-0 overflow-hidden glass-dark border-white/10">
                                <AddSponsorForm
                                    initialData={editingSponsor}
                                    onClose={() => handleCloseDialog(false)}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                        <ChartCard title="Industry Distribution" description="Sponsors by business sector">
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={industryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, value }) => `${name}: ${value}`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {industryData.map((entry, index) => (
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

                        <ChartCard title="Top Investments" description="Sponsorship amount in Millions (₦)">
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={investmentData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                                    <YAxis stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "hsl(var(--card))",
                                            border: "1px solid hsl(var(--border))",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Bar dataKey="amount" fill="hsl(var(--intelligence-accent))" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartCard>
                    </div>

                    {/* Filters */}
                    <div className="mb-6 space-y-4">
                        <FilterBar
                            searchQuery={sponsorFilters.searchQuery || ""}
                            onSearchChange={(query) => setSponsorFilters({ searchQuery: query })}
                            onReset={resetSponsorFilters}
                            placeholder="Search sponsors by name or description..."
                        />

                        {/* Industry Filters */}
                        <div className="flex flex-wrap gap-2 text-foreground">
                            <span className="text-sm text-muted-foreground self-center">Filter by industry:</span>
                            {Object.values(Industry).map((industry) => (
                                <Badge
                                    key={industry}
                                    variant={(sponsorFilters.industries || []).includes(industry) ? "default" : "outline"}
                                    className={cn(
                                        "cursor-pointer transition-colors",
                                        (sponsorFilters.industries || []).includes(industry)
                                            ? "bg-intelligence-primary hover:bg-intelligence-primary-dark"
                                            : "border-border hover:bg-intelligence-primary/10"
                                    )}
                                    onClick={() => handleIndustryToggle(industry)}
                                >
                                    {industry}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Results Count and Export */}
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing {filteredSponsors.length} sponsors
                        </p>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2 border-border">
                                    <Download className="w-4 h-4" />
                                    Export
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-background border-border text-foreground">
                                <DropdownMenuItem onClick={() => exportToJSON(filteredSponsors, "lagos_sponsors_export")} className="hover:bg-intelligence-primary/10">
                                    Export as JSON
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => exportToCSV(filteredSponsors.map(s => ({ name: s.name, industry: s.industry, totalSponsorship: s.totalSponsorship, averageROI: s.averageROI })), "lagos_sponsors_export")} className="hover:bg-intelligence-primary/10">
                                    Export as CSV
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Sponsors Grid */}
                    {filteredSponsors.length === 0 ? (
                        <div className="text-center py-20 bg-background/50 rounded-xl border-2 border-dashed border-border">
                            <p className="text-lg text-muted-foreground">No sponsors found matching your filters.</p>
                            <Button variant="outline" onClick={resetSponsorFilters} className="mt-4 border-intelligence-primary/50 hover:bg-intelligence-primary/10">
                                Reset Filters
                            </Button>
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredSponsors.map((sponsor) => (
                                <motion.div
                                    key={sponsor.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <SponsorCard
                                        sponsor={sponsor}
                                        onEdit={handleEditSponsor}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Sponsors;
