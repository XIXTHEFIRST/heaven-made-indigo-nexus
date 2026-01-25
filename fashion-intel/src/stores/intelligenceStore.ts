import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { generateEventAnalysis, generateDetailedStrategy } from "@/services/geminiService";
import {
    Event,
    Sponsor,
    MyEvent,
    Activity,
    FilterState,
    EventSponsor,
    Task,
} from "@/types/intelligence";
import { toast } from "sonner";
import { mockEvents, mockSponsors, mockAIInsights, mockMarketGaps, mockDeals } from "@/lib/mockData";

interface IntelligenceState {
    // Data
    events: Event[];
    sponsors: Sponsor[];
    myEvents: MyEvent[];
    tasks: Task[];
    activities: Activity[];
    notes: any[];
    profiles: any[];
    aiInsights: any[];
    matches: any[];
    marketGaps: any[];
    loading: boolean;

    // Filter States
    eventFilters: FilterState;
    sponsorFilters: Partial<FilterState>;
    messages: Array<{ id: string; role: 'user' | 'assistant'; content: string; timestamp: Date }>;

    // UI State
    selectedEvents: string[];
    viewMode: "grid" | "list";

    // Actions
    initialize: () => Promise<void>;
    fetchData: () => Promise<void>;
    addNote: (note: { entityType: 'event' | 'sponsor', entityId: string, content: string, parentId?: string }) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
    fetchProfiles: () => Promise<void>;

    // Task Actions
    addTask: (task: Omit<Task, 'id' | 'created_at' | 'status'>) => Promise<void>;
    updateTask: (id: string, task: Partial<Task>) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;

    setEventFilters: (filters: Partial<FilterState>) => void;
    setSponsorFilters: (filters: Partial<FilterState>) => void;
    resetEventFilters: () => void;
    resetSponsorFilters: () => void;
    toggleEventSelection: (eventId: string) => void;
    clearEventSelection: () => void;
    setViewMode: (mode: "grid" | "list") => void;

    // CRUD Actions
    addEvent: (event: Omit<Event, "id" | "created_at" | "created_by">) => Promise<void>;
    updateEvent: (id: string, event: Partial<Event>) => Promise<void>;
    deleteEvent: (id: string) => Promise<void>;
    addSponsor: (sponsor: Omit<Sponsor, "id" | "activeSince">) => Promise<void>;
    updateSponsor: (id: string, sponsor: Partial<Sponsor>) => Promise<void>;
    deleteSponsor: (id: string) => Promise<void>;

    // MyEvent Actions
    addMyEvent: (event: Omit<MyEvent, "id" | "created_at" | "status"> & { id?: string }) => Promise<void>;
    updateMyEvent: (id: string, event: Partial<MyEvent>) => Promise<void>;
    deleteMyEvent: (id: string) => Promise<void>;

    // Intelligence Actions
    generateAutopsy: (eventId: string) => Promise<void>;
    generateStrategy: (eventId: string) => Promise<void>;
    sendMessage: (content: string) => Promise<void>;
    clearChat: () => void;

    // Getters
    getFilteredEvents: () => Event[];
    getFilteredSponsors: () => Sponsor[];
    getEventById: (id: string) => Event | undefined;
    getSponsorById: (id: string) => Sponsor | undefined;
    getMyEventById: (id: string) => MyEvent | undefined;
}

const defaultFilters: FilterState = {
    searchQuery: "",
    dateRange: { start: null, end: null },
    eventTypes: [],
    locations: [],
    attendanceRange: { min: 0, max: 10000 },
    budgetRange: { min: 0, max: 100000000 },
    industries: [],
    tiers: [],
};

export const useIntelligenceStore = create<IntelligenceState>((set, get) => ({
    // Initial Data
    events: [],
    sponsors: [],
    myEvents: [],
    tasks: [],
    activities: [],
    notes: [],
    profiles: [],
    aiInsights: [],
    matches: [],
    marketGaps: [],
    loading: true,
    messages: [{
        id: 'welcome',
        role: 'assistant',
        content: "Hello! I'm your Sponsorship Intelligence Coach. How can I help you dominate the Lagos fashion scene today?",
        timestamp: new Date()
    }],

    // Initial Filter States
    eventFilters: defaultFilters,
    sponsorFilters: {},

    // Initial UI State
    selectedEvents: [],
    viewMode: "grid",

    // Actions
    initialize: async () => {
        await get().fetchData();

        // Real-time Subscriptions
        const eventSub = supabase
            .channel('schema-db-changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, () => get().fetchData())
            .on('postgres_changes', { event: '*', schema: 'public', table: 'sponsors' }, () => get().fetchData())
            .on('postgres_changes', { event: '*', schema: 'public', table: 'sponsorships' }, () => get().fetchData())
            .on('postgres_changes', { event: '*', schema: 'public', table: 'my_events' }, () => get().fetchData())
            .on('postgres_changes', { event: '*', schema: 'public', table: 'activity_log' }, () => get().fetchData())
            .on('postgres_changes', { event: '*', schema: 'public', table: 'team_notes' }, () => get().fetchData())
            .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => get().fetchData())
            .subscribe();

        // return cleanup; // Removed cleanup return to match () => Promise<void>
    },

    fetchData: async () => {
        set({ loading: true });

        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            console.log("Using mock data fallback (Supabase credentials missing)");
            set({
                events: mockEvents,
                sponsors: mockSponsors,
                myEvents: [],
                tasks: [],
                activities: [],
                notes: [],
                profiles: [],
                aiInsights: mockAIInsights,
                matches: mockDeals.slice(0, 3).map(d => ({
                    fitScore: 85,
                    recommendedTier: d.tier,
                    estimatedROI: 2.4,
                    reasoning: ["Strong demographic overlap", "Previous success in niche"]
                })),
                marketGaps: mockMarketGaps,
                loading: false
            });
            return;
        }

        try {
            // Fetch Sponsors
            const { data: sponsorsData, error: sponsorsError } = await supabase
                .from('sponsors')
                .select('*');
            if (sponsorsError) throw sponsorsError;

            // Fetch Events with Sponsorships
            const { data: eventsData, error: eventsError } = await supabase
                .from('events')
                .select(`
                    *,
                    sponsorships (
                        sponsor_id,
                        tier,
                        deal_amount,
                        deliverables
                    )
                `);
            if (eventsError) throw eventsError;

            // Fetch Profiles
            const { data: profilesData, error: profilesError } = await supabase
                .from('profiles')
                .select('*');
            if (profilesError) throw profilesError;

            // Fetch MyEvents
            const { data: myEventsData, error: myEventsError } = await supabase
                .from('my_events')
                .select('*');
            if (myEventsError) throw myEventsError;

            // Fetch Activity Log
            const { data: activityData, error: activityError } = await supabase
                .from('activity_log')
                .select('*')
                .order('timestamp', { ascending: false })
                .limit(50);
            if (activityError) throw activityError;

            // Fetch Team Notes
            const { data: notesData, error: notesError } = await supabase
                .from('team_notes')
                .select(`
                    *,
                    profiles (
                        full_name,
                        avatar_url
                    )
                `)
                .order('created_at', { ascending: true });

            // Fetch Tasks
            const { data: tasksData, error: tasksError } = await supabase
                .from('tasks')
                .select(`
                    *,
                    assignee:profiles!tasks_assigned_to_fkey(full_name, avatar_url),
                    creator:profiles!tasks_created_by_fkey(full_name, avatar_url)
                `)
                .order('due_date', { ascending: true });
            if (tasksError) throw tasksError;

            // Map data to camelCase for frontend consistency
            const sponsors: Sponsor[] = (sponsorsData || []).map(s => ({
                id: s.id,
                name: s.name,
                industry: s.industry,
                logo: s.logo,
                description: s.description,
                website: s.website,
                contactEmail: s.contact_email,
                contactPhone: s.contact_phone,
                totalSponsorship: Number(s.total_sponsorship),
                totalInvestmentBudget: Number(s.total_investment_budget),
                averageROI: Number(s.average_roi),
                preferredTiers: s.preferred_tiers,
                targetDemographics: s.target_demographics,
                activeSince: new Date(s.active_since),
                internalNotes: s.internal_notes,
                intel: s.intel,
                eventsSponsored: (eventsData || []).filter(e =>
                    e.sponsorships && e.sponsorships.some((sp: any) => sp.sponsor_id === s.id)
                ).map(e => e.id)
            }));

            const events: Event[] = (eventsData || []).map(e => ({
                id: e.id,
                name: e.name,
                date: new Date(e.date),
                endDate: e.end_date ? new Date(e.end_date) : undefined,
                location: e.location,
                venue: e.venue,
                type: e.type,
                status: e.status,
                estimatedAttendance: e.estimated_attendance,
                actualAttendance: e.actual_attendance,
                demographics: e.demographics,
                successMetrics: e.success_metrics,
                analysis: e.analysis,
                autopsyReport: e.autopsy_report,
                budget: e.budget,
                mediaMetrics: e.media_metrics,
                tags: e.tags,
                description: e.description,
                organizer: e.organizer,
                imageUrl: e.image_url,
                bannerImage: e.banner_image,
                recurring: e.recurring,
                previousEditions: e.previous_editions,
                verification: e.verification,
                created_at: new Date(e.created_at),
                created_by: e.created_by,
                sponsors: e.sponsorships ? e.sponsorships.map((s: any) => s.sponsor_id) : [],
                intelSponsors: e.sponsorships ? e.sponsorships.map((s: any) => ({
                    sponsorId: s.sponsor_id,
                    tier: s.tier,
                    dealAmount: Number(s.deal_amount),
                    deliverables: s.deliverables
                })) : []
            }));

            const myEvents: MyEvent[] = (myEventsData || []).map(me => ({
                id: me.id,
                name: me.name,
                type: me.type,
                targetAudience: me.target_audience,
                budgetGoal: Number(me.budget_goal),
                currency: me.currency,
                uniqueAngle: me.unique_angle,
                assets: me.assets || [],
                status: me.status,
                aiRecommendations: me.ai_recommendations,
                created_at: new Date(me.created_at)
            }));

            const activities: Activity[] = (activityData || []).map(a => ({
                id: a.id,
                type: a.type as any,
                entityType: a.entity_type as any,
                entityName: a.entity_name,
                timestamp: new Date(a.timestamp),
                userId: a.user_id
            }));

            const tasks: Task[] = (tasksData || []).map(t => ({
                id: t.id,
                title: t.title,
                description: t.description,
                status: t.status,
                priority: t.priority,
                category: t.category,
                dueDate: t.due_date ? new Date(t.due_date) : undefined,
                assignedTo: t.assigned_to,
                createdBy: t.created_by,
                entityType: t.entity_type,
                entityId: t.entity_id,
                createdAt: new Date(t.created_at),
                assignee: t.assignee,
                creator: t.creator
            }));

            set({
                sponsors,
                events,
                myEvents,
                activities,
                tasks,
                notes: notesData || [],
                profiles: profilesData || [],
                aiInsights: mockAIInsights, // Fallback for now env
                matches: (mockDeals as any[]).slice(0, 3).map(d => ({
                    fitScore: 85,
                    recommendedTier: d.tier,
                    estimatedROI: 2.4,
                    reasoning: ["Strong demographic overlap", "Previous success in niche"]
                })),
                marketGaps: mockMarketGaps,
                loading: false
            });
        } catch (error: any) {
            console.error("Error fetching data, falling back to mock data:", error);
            set({
                events: mockEvents,
                sponsors: mockSponsors,
                myEvents: [],
                tasks: [],
                activities: [],
                notes: [],
                profiles: [],
                loading: false
            });
        }
    },

    addNote: async (noteData) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Unauthorized");

            const { error } = await supabase
                .from('team_notes')
                .insert([{
                    author_id: user.id,
                    entity_type: noteData.entityType,
                    entity_id: noteData.entityId,
                    content: noteData.content,
                    parent_id: noteData.parentId
                }]);

            if (error) throw error;
            toast.success("Note added");
            await get().fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to add note");
        }
    },

    deleteNote: async (id) => {
        try {
            const { error } = await supabase.from('team_notes').delete().eq('id', id);
            if (error) throw error;
            toast.success("Note deleted");
            await get().fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete note");
        }
    },

    fetchProfiles: async () => {
        try {
            const { data, error } = await supabase.from('profiles').select('*');
            if (error) throw error;
            set({ profiles: data || [] });
        } catch (error: any) {
            console.error("Error fetching profiles:", error);
        }
    },

    addTask: async (taskData) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Unauthorized");

            const { error } = await supabase
                .from('tasks')
                .insert([{
                    title: taskData.title,
                    description: taskData.description,
                    priority: taskData.priority,
                    category: taskData.category,
                    due_date: taskData.dueDate,
                    assigned_to: taskData.assignedTo,
                    created_by: user.id,
                    entity_type: taskData.entityType,
                    entity_id: taskData.entityId,
                    status: 'todo'
                }]);

            if (error) throw error;
            toast.success("Task assigned");
            await get().fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to add task");
        }
    },

    updateTask: async (id, taskUpdate) => {
        try {
            const { error } = await supabase
                .from('tasks')
                .update({
                    title: taskUpdate.title,
                    description: taskUpdate.description,
                    status: taskUpdate.status,
                    priority: taskUpdate.priority,
                    due_date: taskUpdate.dueDate,
                    assigned_to: taskUpdate.assignedTo
                })
                .eq('id', id);

            if (error) throw error;
            await get().fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to update task");
        }
    },

    deleteTask: async (id) => {
        try {
            const { error } = await supabase.from('tasks').delete().eq('id', id);
            if (error) throw error;
            toast.success("Task removed");
            await get().fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete task");
        }
    },

    setEventFilters: (filters) =>
        set((state) => ({
            eventFilters: { ...state.eventFilters, ...filters },
        })),

    setSponsorFilters: (filters) =>
        set((state) => ({
            sponsorFilters: { ...state.sponsorFilters, ...filters },
        })),

    resetEventFilters: () =>
        set({
            eventFilters: defaultFilters,
        }),

    resetSponsorFilters: () =>
        set({
            sponsorFilters: {},
        }),

    toggleEventSelection: (eventId) =>
        set((state) => {
            const isSelected = state.selectedEvents.includes(eventId);
            return {
                selectedEvents: isSelected
                    ? state.selectedEvents.filter((id) => id !== eventId)
                    : [...state.selectedEvents, eventId],
            };
        }),

    clearEventSelection: () =>
        set({
            selectedEvents: [],
        }),

    setViewMode: (mode) =>
        set({
            viewMode: mode,
        }),

    // CRUD Actions with Optimistic Updates
    addEvent: async (eventData) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Unauthorized");

            const { data, error } = await supabase
                .from('events')
                .insert([{
                    name: eventData.name,
                    date: eventData.date,
                    location: eventData.location,
                    venue: eventData.venue,
                    type: eventData.type,
                    status: eventData.status,
                    estimated_attendance: eventData.estimatedAttendance,
                    actual_attendance: eventData.actualAttendance,
                    demographics: eventData.demographics,
                    success_metrics: eventData.successMetrics,
                    analysis: eventData.analysis,
                    budget: eventData.budget,
                    media_metrics: eventData.mediaMetrics,
                    tags: eventData.tags,
                    description: eventData.description,
                    organizer: eventData.organizer,
                    image_url: eventData.imageUrl,
                    banner_image: eventData.bannerImage,
                    recurring: eventData.recurring,
                    previous_editions: eventData.previousEditions,
                    verification: eventData.verification,
                    created_by: user.id
                }])
                .select()
                .single();

            if (error) throw error;

            // Log activity
            await supabase.from('activity_log').insert([{
                user_id: user.id,
                type: 'create',
                entity_type: 'event',
                entity_name: eventData.name,
                entity_id: data.id
            }]);

            toast.success("Event added successfully");
            await get().fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to add event");
        }
    },

    updateEvent: async (id, eventUpdate) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const { error } = await supabase
                .from('events')
                .update({
                    name: eventUpdate.name,
                    date: eventUpdate.date,
                    location: eventUpdate.location,
                    venue: eventUpdate.venue,
                    type: eventUpdate.type,
                    status: eventUpdate.status,
                    estimated_attendance: eventUpdate.estimatedAttendance,
                    actual_attendance: eventUpdate.actualAttendance,
                    demographics: eventUpdate.demographics,
                    success_metrics: eventUpdate.successMetrics,
                    analysis: eventUpdate.analysis,
                    autopsy_report: eventUpdate.autopsyReport,
                    budget: eventUpdate.budget,
                    media_metrics: eventUpdate.mediaMetrics,
                    tags: eventUpdate.tags,
                    description: eventUpdate.description,
                    organizer: eventUpdate.organizer,
                    image_url: eventUpdate.imageUrl,
                    banner_image: eventUpdate.bannerImage,
                    recurring: eventUpdate.recurring,
                    previous_editions: eventUpdate.previousEditions,
                    verification: eventUpdate.verification,
                })
                .eq('id', id);

            if (error) throw error;

            await supabase.from('activity_log').insert([{
                user_id: user?.id,
                type: 'update',
                entity_type: 'event',
                entity_name: eventUpdate.name || id,
                entity_id: id
            }]);

            toast.success("Event updated");
            await get().fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to update event");
        }
    },

    deleteEvent: async (id) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const event = get().events.find(e => e.id === id);
            const { error } = await supabase.from('events').delete().eq('id', id);
            if (error) throw error;

            await supabase.from('activity_log').insert([{
                user_id: user?.id,
                type: 'delete',
                entity_type: 'event',
                entity_name: event?.name || id,
                entity_id: id
            }]);

            toast.success("Event deleted");
            await get().fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete event");
        }
    },

    addSponsor: async (sponsorData) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const { data, error } = await supabase
                .from('sponsors')
                .insert([{
                    name: sponsorData.name,
                    industry: sponsorData.industry,
                    logo: sponsorData.logo,
                    description: sponsorData.description,
                    website: sponsorData.website,
                    contact_email: sponsorData.contactEmail,
                    contact_phone: sponsorData.contactPhone,
                    total_sponsorship: sponsorData.totalSponsorship,
                    total_investment_budget: sponsorData.totalInvestmentBudget,
                    average_roi: sponsorData.averageROI,
                    preferred_tiers: sponsorData.preferredTiers,
                    target_demographics: sponsorData.targetDemographics,
                    internal_notes: sponsorData.internalNotes,
                    intel: sponsorData.intel
                }])
                .select()
                .single();

            if (error) throw error;

            await supabase.from('activity_log').insert([{
                user_id: user?.id,
                type: 'create',
                entity_type: 'sponsor',
                entity_name: sponsorData.name,
                entity_id: data.id
            }]);

            toast.success("Sponsor added");
            await get().fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to add sponsor");
        }
    },

    updateSponsor: async (id, sponsorUpdate) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const { error } = await supabase
                .from('sponsors')
                .update({
                    name: sponsorUpdate.name,
                    industry: sponsorUpdate.industry,
                    logo: sponsorUpdate.logo,
                    description: sponsorUpdate.description,
                    website: sponsorUpdate.website,
                    contact_email: sponsorUpdate.contactEmail,
                    contact_phone: sponsorUpdate.contactPhone,
                    total_sponsorship: sponsorUpdate.totalSponsorship,
                    total_investment_budget: sponsorUpdate.totalInvestmentBudget,
                    average_roi: sponsorUpdate.averageROI,
                    preferred_tiers: sponsorUpdate.preferredTiers,
                    target_demographics: sponsorUpdate.targetDemographics,
                    internal_notes: sponsorUpdate.internalNotes,
                    intel: sponsorUpdate.intel
                })
                .eq('id', id);

            if (error) throw error;

            await supabase.from('activity_log').insert([{
                user_id: user?.id,
                type: 'update',
                entity_type: 'sponsor',
                entity_name: sponsorUpdate.name || id,
                entity_id: id
            }]);

            toast.success("Sponsor updated");
            await get().fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to update sponsor");
        }
    },

    deleteSponsor: async (id) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const sponsor = get().sponsors.find(s => s.id === id);
            const { error } = await supabase.from('sponsors').delete().eq('id', id);
            if (error) throw error;

            await supabase.from('activity_log').insert([{
                user_id: user?.id,
                type: 'delete',
                entity_type: 'sponsor',
                entity_name: sponsor?.name || id,
                entity_id: id
            }]);

            toast.success("Sponsor deleted");
            await get().fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete sponsor");
        }
    },

    addMyEvent: async (eventData) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const { error } = await supabase
                .from('my_events')
                .insert([{
                    name: eventData.name,
                    type: eventData.type,
                    target_audience: eventData.targetAudience,
                    budget_goal: eventData.budgetGoal,
                    currency: eventData.currency,
                    unique_angle: eventData.uniqueAngle,
                    status: 'draft',
                    user_id: user?.id
                }]);

            if (error) throw error;
            toast.success("Event strategy started");
            await get().fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to add event");
        }
    },

    updateMyEvent: async (id, eventUpdate) => {
        try {
            const { error } = await supabase
                .from('my_events')
                .update({
                    name: eventUpdate.name,
                    type: eventUpdate.type,
                    target_audience: eventUpdate.targetAudience,
                    budget_goal: eventUpdate.budgetGoal,
                    currency: eventUpdate.currency,
                    unique_angle: eventUpdate.uniqueAngle,
                    status: eventUpdate.status,
                    ai_recommendations: eventUpdate.aiRecommendations
                })
                .eq('id', id);

            if (error) throw error;
            await get().fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to update event");
        }
    },

    deleteMyEvent: async (id) => {
        try {
            const { error } = await supabase.from('my_events').delete().eq('id', id);
            if (error) throw error;
            toast.success("Event deleted");
            await get().fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete event");
        }
    },

    generateAutopsy: async (eventId) => {
        const event = get().events.find(e => e.id === eventId);
        if (!event) return;

        toast.info("AI is analyzing event data...");
        await new Promise(r => setTimeout(r, 2000));

        const autopsy = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EVENT AUTOPSY: ${event.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🟢 SPONSOR SUCCESS FACTORS:
${(event.intelSponsors || []).map(s => {
            const sponsor = get().sponsors.find(sp => sp.id === s.sponsorId);
            return `✅ ${sponsor?.name || 'Unknown'} (${s.tier}, ₦${(s.dealAmount / 1000000).toFixed(1)}M)
   What they got: ${s.deliverables}
   Why they likely invested: Strategic placement for ${sponsor?.industry} targeting young demographics.
   ROI estimate: ${s.dealAmount < 5000000 ? 'High' : 'Medium'}`;
        }).join('\n\n')}

🔍 MARKET GAPS THIS EVENT LEFT OPEN:
❌ Underserved Demographics: ${event.estimatedAttendance < 2000 ? 'Scale opportunity' : 'Niche segment'} missed.
❌ Digital Integration: Minimal interaction points.

💡 LESSONS FOR MY EVENT:
1. Prioritize ${event.type} elements that worked.
2. Sponsor Preference: ${event.intelSponsors?.[0]?.tier} tiers show strongest ROI potential.`;

        await get().updateEvent(eventId, { autopsyReport: autopsy });
    },

    generateStrategy: async (eventId) => {
        const event = get().myEvents.find(e => e.id === eventId);
        if (!event) return;

        try {
            const recommendations = await generateDetailedStrategy(
                event.name,
                event.type,
                event.targetAudience.join(", "),
                event.uniqueAngle
            );

            await get().updateMyEvent(eventId, {
                aiRecommendations: recommendations,
                status: "planned"
            });

            toast.success("Intelligence cross-analysis complete!");
        } catch (error: any) {
            console.error("Strategy Gen Failed:", error);
            toast.error("AI Analysis failed. Reverting to fallback intelligence.");

            // Fallback to mock if API fails
            const recommendations = {
                marketGaps: mockMarketGaps.slice(0, 3).map(gap => ({
                    title: gap.title,
                    description: gap.description,
                    potentialSponsors: ["General Sponsors"]
                })),
                sponsorMatches: mockDeals.slice(0, 3).map(d => ({
                    sponsorId: d.sponsorId,
                    probability: 85,
                    pitchAngle: "Standard exposure model.",
                    strategy: "Branded placement.",
                    fitScore: 80,
                    reason: "General market alignment."
                }))
            };

            await get().updateMyEvent(eventId, {
                aiRecommendations: recommendations,
                status: "planned"
            });
        }
    },

    sendMessage: async (content) => {
        const userMsg = { id: crypto.randomUUID(), role: 'user' as const, content, timestamp: new Date() };
        set(state => ({ messages: [...state.messages, userMsg] }));

        await new Promise(r => setTimeout(r, 1000));

        const query = content.toLowerCase();
        let response = "";

        // Simple rules-based response for now
        if (query.includes("gap")) {
            response = "The most significant exploitable gap remains **Sustainable B2B Infostructure**.";
        } else {
            response = "I'm analyzing your request. My current intelligence covers the entire Lagos fashion ecosystem. Ask me about specific gaps or sponsor strategies!";
        }

        const assistantMsg = { id: crypto.randomUUID(), role: 'assistant' as const, content: response, timestamp: new Date() };
        set(state => ({ messages: [...state.messages, assistantMsg] }));
    },

    clearChat: () => set({
        messages: [{
            id: 'welcome',
            role: 'assistant',
            content: "Hello! I'm your Sponsorship Intelligence Coach. How can I help you today?",
            timestamp: new Date()
        }]
    }),

    // Getters
    getFilteredEvents: () => {
        const { events, eventFilters } = get();
        let filtered = [...events];
        if (eventFilters.searchQuery) {
            const q = eventFilters.searchQuery.toLowerCase();
            filtered = filtered.filter(e => e.name.toLowerCase().includes(q) || e.organizer.toLowerCase().includes(q));
        }
        return filtered;
    },

    getFilteredSponsors: () => {
        const { sponsors, sponsorFilters } = get();
        let filtered = [...sponsors];
        if (sponsorFilters.searchQuery) {
            const q = sponsorFilters.searchQuery.toLowerCase();
            filtered = filtered.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
        }
        return filtered;
    },

    getEventById: (id) => get().events.find(e => e.id === id),
    getSponsorById: (id) => get().sponsors.find(s => s.id === id),
    getMyEventById: (id) => get().myEvents.find(e => e.id === id),
}));
