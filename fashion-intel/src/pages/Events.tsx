import { useState } from "react";
import { Grid, List, ArrowUpDown, Download, Plus } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { FilterBar } from "@/components/intelligence/FilterBar";
import { EventCard } from "@/components/events/EventCard";
import { ComparisonModal } from "@/components/events/ComparisonModal";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useIntelligenceStore } from "@/stores/intelligenceStore";
import { EventType, Event } from "@/types/intelligence";
import { motion, AnimatePresence } from "framer-motion";
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
import AddEventForm from "@/components/research/AddEventForm";

const Events = () => {
    const {
        getFilteredEvents,
        eventFilters,
        setEventFilters,
        resetEventFilters,
        selectedEvents,
        toggleEventSelection,
        clearEventSelection,
        viewMode,
        setViewMode,
        getEventById,
    } = useIntelligenceStore();

    const [sortBy, setSortBy] = useState<"date" | "attendance" | "budget">("date");
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    const filteredEvents = getFilteredEvents();

    // Sort events
    const sortedEvents = [...filteredEvents].sort((a, b) => {
        switch (sortBy) {
            case "date":
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            case "attendance":
                return b.estimatedAttendance - a.estimatedAttendance;
            case "budget":
                return b.budget.max - a.budget.max;
            default:
                return 0;
        }
    });

    const handleEventTypeToggle = (type: EventType) => {
        const currentTypes = eventFilters.eventTypes;
        const newTypes = currentTypes.includes(type)
            ? currentTypes.filter((t) => t !== type)
            : [...currentTypes, type];
        setEventFilters({ eventTypes: newTypes });
    };

    const handleEditEvent = (event: Event) => {
        setEditingEvent(event);
        setIsAddDialogOpen(true);
    };

    const handleCloseDialog = (open: boolean) => {
        setIsAddDialogOpen(open);
        if (!open) setEditingEvent(null);
    };

    const selectedEventObjects = selectedEvents
        .map((id) => getEventById(id))
        .filter((e): e is Event => e !== undefined);

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
                            <h1 className="text-4xl font-serif font-bold mb-2 text-black">Event Research</h1>
                            <p className="text-lg text-muted-foreground">
                                Explore and analyze Lagos fashion events
                            </p>
                        </div>

                        <Dialog open={isAddDialogOpen} onOpenChange={handleCloseDialog}>
                            <DialogTrigger asChild>
                                <Button className="bg-emerald-700 hover:bg-emerald-800 text-white gap-2 shadow-lg shadow-emerald-700/20">
                                    <Plus className="w-4 h-4" />
                                    Add New Event
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl p-0 overflow-hidden glass-dark border-white/10">
                                <AddEventForm
                                    initialData={editingEvent}
                                    onClose={() => handleCloseDialog(false)}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Filters */}
                    <div className="mb-6 space-y-4 text-foreground">
                        <FilterBar
                            searchQuery={eventFilters.searchQuery}
                            onSearchChange={(query) => setEventFilters({ searchQuery: query })}
                            onReset={resetEventFilters}
                            placeholder="Search events by name, organizer, or location..."
                        >
                            <Select value={sortBy} onValueChange={(value: "date" | "attendance" | "budget") => setSortBy(value)}>
                                <SelectTrigger className="w-[180px] bg-background border-border">
                                    <ArrowUpDown className="w-4 h-4 mr-2" />
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent className="bg-background border-border">
                                    <SelectItem value="date">Date</SelectItem>
                                    <SelectItem value="attendance">Attendance</SelectItem>
                                    <SelectItem value="budget">Budget</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="flex gap-2">
                                <Button
                                    variant={viewMode === "grid" ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setViewMode("grid")}
                                    className={viewMode === "grid" ? "bg-emerald-700 hover:bg-emerald-800" : "border-emerald-100 text-emerald-900"}
                                >
                                    <Grid className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setViewMode("list")}
                                    className={viewMode === "list" ? "bg-emerald-700 hover:bg-emerald-800" : "border-emerald-100 text-emerald-900"}
                                >
                                    <List className="w-4 h-4" />
                                </Button>
                            </div>
                        </FilterBar>

                        {/* Event Type Filters */}
                        <div className="flex flex-wrap gap-2">
                            <span className="text-sm text-muted-foreground self-center">Filter by type:</span>
                            {Object.values(EventType).map((type) => (
                                <Badge
                                    key={type}
                                    variant={eventFilters.eventTypes.includes(type) ? "default" : "outline"}
                                    className={cn(
                                        "cursor-pointer transition-colors",
                                        eventFilters.eventTypes.includes(type)
                                            ? "bg-emerald-700 hover:bg-emerald-800"
                                            : "border-emerald-100 hover:bg-emerald-50 text-emerald-800"
                                    )}
                                    onClick={() => handleEventTypeToggle(type)}
                                >
                                    {type}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Selection Info */}
                    <AnimatePresence>
                        {selectedEvents.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                className="p-4 bg-intelligence-primary/10 rounded-lg flex items-center justify-between border border-intelligence-primary/20"
                            >
                                <span className="text-sm font-medium">
                                    {selectedEvents.length} event{selectedEvents.length > 1 ? "s" : ""} selected
                                </span>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={clearEventSelection} className="border-emerald-200 text-emerald-800 hover:bg-emerald-100">
                                        Clear Selection
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="bg-emerald-700 hover:bg-emerald-800 shadow-md shadow-emerald-700/10"
                                        onClick={() => setIsCompareModalOpen(true)}
                                    >
                                        Compare Events
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Results Count and Export */}
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing {sortedEvents.length} of {filteredEvents.length} events
                        </p>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2 border-emerald-100 text-emerald-900 hover:bg-emerald-50">
                                    <Download className="w-4 h-4" />
                                    Export
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-background border-border text-foreground">
                                <DropdownMenuItem onClick={() => exportToJSON(sortedEvents, "lagos_events_export")} className="hover:bg-emerald-50 text-emerald-900">
                                    Export as JSON
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => exportToCSV(sortedEvents.map(e => ({ name: e.name, date: e.date, type: e.type, location: e.location, attendance: e.estimatedAttendance, budget: `${e.budget.min}-${e.budget.max} ${e.budget.currency}` })), "lagos_events_export")} className="hover:bg-emerald-50 text-emerald-900">
                                    Export as CSV
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Events Grid/List */}
                    {sortedEvents.length === 0 ? (
                        <div className="text-center py-20 bg-background/50 rounded-xl border-2 border-dashed border-border">
                            <p className="text-lg text-muted-foreground">No events found matching your filters.</p>
                            <Button variant="outline" onClick={resetEventFilters} className="mt-4 border-emerald-700 text-emerald-700 hover:bg-emerald-50">
                                Reset Filters
                            </Button>
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className={
                                viewMode === "grid"
                                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                    : "space-y-4"
                            }
                        >
                            {sortedEvents.map((event) => (
                                <motion.div
                                    key={event.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <EventCard
                                        event={event}
                                        isSelected={selectedEvents.includes(event.id)}
                                        onToggleSelect={toggleEventSelection}
                                        onEdit={handleEditEvent}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>
            </div>

            <ComparisonModal
                isOpen={isCompareModalOpen}
                onClose={() => setIsCompareModalOpen(false)}
                events={selectedEventObjects}
            />
        </div>
    );
};

// Helper for cn from "@/lib/utils" which I forgot to import correctly
import { cn } from "@/lib/utils";

export default Events;
