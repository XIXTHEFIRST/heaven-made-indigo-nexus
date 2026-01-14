import React, { useState } from "react";
import { Navigation } from "@/components/Navigation";
import {
    Plus,
    Calendar,
    Building2,
    TrendingUp,
    History,
    ArrowUpRight,
    Edit3,
    Trash2,
    Search,
    Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useIntelligenceStore } from "@/stores/intelligenceStore";
import AddEventForm from "@/components/research/AddEventForm";
import AddSponsorForm from "@/components/research/AddSponsorForm";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ResearchDashboard = () => {
    const {
        events,
        sponsors,
        activities,
        deleteEvent,
        deleteSponsor
    } = useIntelligenceStore();

    const [searchQuery, setSearchQuery] = useState("");
    const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
    const [isSponsorDialogOpen, setIsSponsorDialogOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<any>(null);
    const [editingSponsor, setEditingSponsor] = useState<any>(null);

    // Stats calculation
    const totalDealsLogged = sponsors.reduce((acc, s) => acc + s.totalSponsorship, 0);
    const formattedDeals = totalDealsLogged >= 1000000
        ? `₦${(totalDealsLogged / 1000000).toFixed(1)}M`
        : `₦${totalDealsLogged.toLocaleString()}`;

    const filteredEvents = events.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 10);
    const filteredSponsors = sponsors.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 10);

    const handleEditEvent = (event: any) => {
        setEditingEvent(event);
        setIsEventDialogOpen(true);
    };

    const handleEditSponsor = (sponsor: any) => {
        setEditingSponsor(sponsor);
        setIsSponsorDialogOpen(true);
    };

    const handleCloseEventDialog = (open: boolean) => {
        setIsEventDialogOpen(open);
        if (!open) setEditingEvent(null);
    };

    const handleCloseSponsorDialog = (open: boolean) => {
        setIsSponsorDialogOpen(open);
        if (!open) setEditingSponsor(null);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="pt-24 pb-12 transition-all duration-500">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                        >
                            <h1 className="text-4xl font-serif font-bold text-white mb-2">Research Dashboard</h1>
                            <p className="text-muted-foreground">Strategic oversight and data management for Lagos Fashion Intelligence</p>
                        </motion.div>

                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="flex gap-4 w-full md:w-auto"
                        >
                            <Dialog open={isEventDialogOpen} onOpenChange={handleCloseEventDialog}>
                                <DialogTrigger asChild>
                                    <Button className="bg-intelligence-primary hover:bg-intelligence-primary-dark gap-2 shadow-lg shadow-intelligence-primary/20 flex-1 md:flex-none">
                                        <Plus className="w-4 h-4" />
                                        Add Event
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl p-0 overflow-hidden glass-dark border-white/10">
                                    <AddEventForm
                                        initialData={editingEvent}
                                        onClose={() => handleCloseEventDialog(false)}
                                    />
                                </DialogContent>
                            </Dialog>

                            <Dialog open={isSponsorDialogOpen} onOpenChange={handleCloseSponsorDialog}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="border-white/10 hover:bg-white/5 gap-2 flex-1 md:flex-none">
                                        <Plus className="w-4 h-4" />
                                        Add Sponsor
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl p-0 overflow-hidden glass-dark border-white/10">
                                    <AddSponsorForm
                                        initialData={editingSponsor}
                                        onClose={() => handleCloseSponsorDialog(false)}
                                    />
                                </DialogContent>
                            </Dialog>
                        </motion.div>
                    </div>

                    {/* Stats Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
                    >
                        <motion.div variants={itemVariants}>
                            <Card className="glass-premium border-white/10 hover:border-intelligence-primary/30 transition-all duration-500 group">
                                <CardContent className="pt-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-1">Events Logged</p>
                                            <h3 className="text-3xl font-bold text-white">{events.length}</h3>
                                        </div>
                                        <div className="p-2 bg-intelligence-primary/10 rounded-lg group-hover:bg-intelligence-primary/20 transition-colors">
                                            <Calendar className="w-5 h-5 text-intelligence-primary" />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center text-xs text-green-400">
                                        <TrendingUp className="w-3 h-3 mr-1" />
                                        <span>+2 this month</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Card className="glass-premium border-white/10 hover:border-intelligence-primary/30 transition-all duration-500 group">
                                <CardContent className="pt-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-1">Active Sponsors</p>
                                            <h3 className="text-3xl font-bold text-white">{sponsors.length}</h3>
                                        </div>
                                        <div className="p-2 bg-intelligence-primary/10 rounded-lg group-hover:bg-intelligence-primary/20 transition-colors">
                                            <Building2 className="w-5 h-5 text-intelligence-primary" />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center text-xs text-muted-foreground">
                                        <span>8 sectors represented</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Card className="glass-premium border-white/10 hover:border-intelligence-primary/30 transition-all duration-500 group">
                                <CardContent className="pt-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-1">Total Verified Deals</p>
                                            <h3 className="text-3xl font-bold text-white">{formattedDeals}</h3>
                                        </div>
                                        <div className="p-2 bg-intelligence-primary/10 rounded-lg group-hover:bg-intelligence-primary/20 transition-colors">
                                            <ArrowUpRight className="w-5 h-5 text-intelligence-primary" />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center text-xs text-green-400">
                                        <span>Market value verified</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content Areas */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-2 space-y-8"
                        >
                            <Card className="glass-dark border-white/10">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle className="text-xl font-serif">Research Data Management</CardTitle>
                                        <CardDescription>Search and manage existing records</CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="relative w-64 hidden md:block">
                                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="Search records..."
                                                className="pl-9 glass-dark border-white/10"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Tabs defaultValue="events">
                                        <TabsList className="bg-white/5 p-1 border border-white/10 mb-6">
                                            <TabsTrigger value="events" className="data-[state=active]:bg-intelligence-primary">Events Feed</TabsTrigger>
                                            <TabsTrigger value="sponsors" className="data-[state=active]:bg-intelligence-primary">Sponsor Database</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="events" className="space-y-4">
                                            {filteredEvents.length === 0 ? (
                                                <div className="py-12 text-center border-2 border-dashed border-white/5 rounded-xl">
                                                    <p className="text-muted-foreground">No matching events found in active research</p>
                                                </div>
                                            ) : filteredEvents.map(event => (
                                                <div key={event.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                                                            {event.imageUrl || event.bannerImage ? (
                                                                <img src={event.imageUrl || event.bannerImage} alt={event.name} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="flex items-center justify-center h-full text-xs font-bold bg-intelligence-primary/20">EVENT</div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-white">{event.name}</h4>
                                                            <p className="text-xs text-muted-foreground">{event.venue} • {new Date(event.date).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-muted-foreground hover:text-white"
                                                            onClick={() => handleEditEvent(event)}
                                                        >
                                                            <Edit3 className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-muted-foreground hover:text-red-400"
                                                            onClick={() => {
                                                                if (confirm("Confirm deletion from intelligence database?")) {
                                                                    deleteEvent(event.id);
                                                                    toast.success("Event permanently deleted");
                                                                }
                                                            }}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                            {events.length > 5 && (
                                                <Button variant="link" className="text-intelligence-primary w-full mt-4">View All Events</Button>
                                            )}
                                        </TabsContent>

                                        <TabsContent value="sponsors" className="space-y-4">
                                            {filteredSponsors.length === 0 ? (
                                                <div className="py-12 text-center border-2 border-dashed border-white/5 rounded-xl">
                                                    <p className="text-muted-foreground">No matching sponsors in database</p>
                                                </div>
                                            ) : filteredSponsors.map(sponsor => (
                                                <div key={sponsor.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-muted border border-white/10">
                                                            {sponsor.logo ? (
                                                                <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="flex items-center justify-center h-full text-[10px] font-bold">LOGO</div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-white">{sponsor.name}</h4>
                                                            <div className="flex gap-2 items-center">
                                                                <Badge variant="outline" className="text-[10px] h-4 border-white/10 bg-white/5">{sponsor.industry}</Badge>
                                                                <span className="text-[10px] text-muted-foreground">Budget: ₦{(sponsor.totalInvestmentBudget / 1000000).toFixed(1)}M</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-muted-foreground hover:text-white"
                                                            onClick={() => handleEditSponsor(sponsor)}
                                                        >
                                                            <Edit3 className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-muted-foreground hover:text-red-400"
                                                            onClick={() => {
                                                                if (confirm("Permanently remove sponsor profile?")) {
                                                                    deleteSponsor(sponsor.id);
                                                                    toast.success("Sponsor removed");
                                                                }
                                                            }}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                            {sponsors.length > 5 && (
                                                <Button variant="link" className="text-intelligence-primary w-full mt-4">View All Sponsors</Button>
                                            )}
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Activity Side Feed */}
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Card className="glass-dark border-white/10 h-full">
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <History className="w-5 h-5 text-intelligence-primary" />
                                        <CardTitle className="text-lg">Recent Activity</CardTitle>
                                    </div>
                                    <CardDescription>Last 50 modifications</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-0 before:w-px before:bg-white/10">
                                        {activities.length === 0 ? (
                                            <p className="text-sm text-muted-foreground text-center py-10 italic">No activity logged yet</p>
                                        ) : activities.map((activity, idx) => (
                                            <div key={activity.id} className="relative pl-8">
                                                <div className={cn(
                                                    "absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-background z-10",
                                                    activity.type === "create" ? "bg-green-500" : activity.type === "update" ? "bg-intelligence-primary" : "bg-red-500"
                                                )} />
                                                <div className="text-xs uppercase font-bold tracking-widest text-muted-foreground mb-1">
                                                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                                                </div>
                                                <p className="text-sm text-white">
                                                    <span className="capitalize font-medium">{activity.type}d</span> {activity.entityType}{" "}
                                                    <span className="text-intelligence-accent">"{activity.entityName}"</span>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <Button variant="outline" className="w-full mt-8 border-white/10 hover:bg-white/5 text-xs">Clear Activity Log</Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ResearchDashboard;
