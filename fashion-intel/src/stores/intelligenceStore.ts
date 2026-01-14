import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
    Event,
    Sponsor,
    MyEvent,
    Activity,
    FilterState,
} from "@/types/intelligence";
import {
    mockEvents,
    mockSponsors,
} from "@/lib/mockData";

interface IntelligenceState {
    // Data
    events: Event[];
    sponsors: Sponsor[];
    myEvents: MyEvent[];
    activities: Activity[];

    // Filter States
    eventFilters: FilterState;
    sponsorFilters: Partial<FilterState>;
    messages: Array<{ id: string; role: 'user' | 'assistant'; content: string; timestamp: Date }>;

    // UI State
    selectedEvents: string[];
    viewMode: "grid" | "list";

    // Actions
    setEventFilters: (filters: Partial<FilterState>) => void;
    setSponsorFilters: (filters: Partial<FilterState>) => void;
    resetEventFilters: () => void;
    resetSponsorFilters: () => void;
    toggleEventSelection: (eventId: string) => void;
    clearEventSelection: () => void;
    setViewMode: (mode: "grid" | "list") => void;

    // CRUD Actions
    addEvent: (event: Omit<Event, "id" | "created_at" | "created_by">) => void;
    updateEvent: (id: string, event: Partial<Event>) => void;
    deleteEvent: (id: string) => void;
    addSponsor: (sponsor: Omit<Sponsor, "id" | "activeSince">) => void;
    updateSponsor: (id: string, sponsor: Partial<Sponsor>) => void;
    deleteSponsor: (id: string) => void;

    // MyEvent Actions
    addMyEvent: (event: Omit<MyEvent, "id" | "created_at" | "status"> & { id?: string }) => void;
    updateMyEvent: (id: string, event: Partial<MyEvent>) => void;
    deleteMyEvent: (id: string) => void;

    // Intelligence Actions
    generateAutopsy: (eventId: string) => Promise<void>;
    generateStrategy: (myEventId: string) => Promise<void>;
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

const createActivity = (type: Activity["type"], entityType: Activity["entityType"], entityName: string): Activity => ({
    id: crypto.randomUUID(),
    type,
    entityType,
    entityName,
    timestamp: new Date(),
    userId: "user",
});

export const useIntelligenceStore = create<IntelligenceState>()(
    persist(
        (set, get) => ({
            // Initial Data
            events: mockEvents,
            sponsors: mockSponsors,
            myEvents: [],
            activities: [],
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

            // CRUD Actions
            addEvent: (eventData) => {
                const newEvent: Event = {
                    ...eventData,
                    id: crypto.randomUUID(),
                    created_at: new Date(),
                    created_by: "user",
                };
                set((state) => ({
                    events: [newEvent, ...state.events],
                    activities: [createActivity("create", "event", newEvent.name), ...state.activities].slice(0, 50),
                }));
            },

            updateEvent: (id, eventUpdate) => {
                set((state) => {
                    const event = state.events.find(e => e.id === id);
                    if (!event) return state;
                    return {
                        events: state.events.map(e => e.id === id ? { ...e, ...eventUpdate } : e),
                        activities: [createActivity("update", "event", event.name), ...state.activities].slice(0, 50),
                    };
                });
            },

            deleteEvent: (id) => {
                set((state) => {
                    const event = state.events.find(e => e.id === id);
                    if (!event) return state;
                    return {
                        events: state.events.filter(e => e.id !== id),
                        activities: [createActivity("delete", "event", event.name), ...state.activities].slice(0, 50),
                    };
                });
            },

            addSponsor: (sponsorData) => {
                const newSponsor: Sponsor = {
                    ...sponsorData,
                    id: crypto.randomUUID(),
                    activeSince: new Date(),
                };
                set((state) => ({
                    sponsors: [newSponsor, ...state.sponsors],
                    activities: [createActivity("create", "sponsor", newSponsor.name), ...state.activities].slice(0, 50),
                }));
            },

            updateSponsor: (id, sponsorUpdate) => {
                set((state) => {
                    const sponsor = state.sponsors.find(s => s.id === id);
                    if (!sponsor) return state;
                    return {
                        sponsors: state.sponsors.map(s => s.id === id ? { ...s, ...sponsorUpdate } : s),
                        activities: [createActivity("update", "sponsor", sponsor.name), ...state.activities].slice(0, 50),
                    };
                });
            },

            deleteSponsor: (id) => {
                set((state) => {
                    const sponsor = state.sponsors.find(s => s.id === id);
                    if (!sponsor) return state;
                    return {
                        sponsors: state.sponsors.filter(s => s.id !== id),
                        activities: [createActivity("delete", "sponsor", sponsor.name), ...state.activities].slice(0, 50),
                    };
                });
            },

            // MyEvent Actions
            addMyEvent: (eventData) => {
                const newEvent: MyEvent = {
                    ...eventData,
                    id: eventData.id || crypto.randomUUID(),
                    status: "draft",
                    created_at: new Date(),
                };
                set((state) => ({
                    myEvents: [newEvent, ...state.myEvents],
                    activities: [createActivity("create", "event", newEvent.name), ...state.activities].slice(0, 50),
                }));
            },

            updateMyEvent: (id, eventUpdate) => {
                set((state) => ({
                    myEvents: state.myEvents.map(e => e.id === id ? { ...e, ...eventUpdate } : e),
                }));
            },

            deleteMyEvent: (id) => {
                set((state) => ({
                    myEvents: state.myEvents.filter(e => e.id !== id),
                }));
            },

            // Intelligence Actions (Rules-Based for Offline usage)
            generateAutopsy: async (eventId) => {
                const event = get().events.find(e => e.id === eventId);
                if (!event) return;

                // Simulate AI Delay
                await new Promise(r => setTimeout(r, 1500));

                const autopsy = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EVENT AUTOPSY: ${event.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 SPONSOR SUCCESS FACTORS:
${(event.intelSponsors || []).map(s => {
                    const sponsor = get().sponsors.find(sp => sp.id === s.sponsorId);
                    return `✅ ${sponsor?.name || 'Unknown'} (${s.tier}, ₦${(s.dealAmount / 1000000).toFixed(1)}M)
   What they got: ${s.deliverables}
   Why they likely invested: Strategic placement for ${sponsor?.industry} targeting young demographics.
   ROI estimate: ${s.dealAmount < 5000000 ? 'High' : 'Medium'}
   Key insight: Strong focus on ${sponsor?.industry} alignment.`;
                }).join('\n\n')}

⚠️ MARKET GAPS THIS EVENT LEFT OPEN:
❌ Underserved Demographics: ${event.estimatedAttendance < 2000 ? 'Scale opportunity' : 'Niche segment'} missed.
❌ Digital Integration: Minimal interaction points for remote participants.
❌ Brand Narrative: Need for deeper sustainable fashion storytelling.

🎯 LESSONS FOR MY EVENT:
1. Prioritize ${event.type} elements that worked: ${event.analysis?.whatWorked}.
2. Avoid known pitfalls: ${event.analysis?.whatFlopped}.
3. Sponsor Preference: ${event.intelSponsors?.[0]?.tier} tiers show strongest ROI potential.

📊 SPONSOR BEHAVIOR PATTERNS:
- Multi-brand loyalty: Sponsors like ${event.intelSponsors?.[0]?.sponsorId} often cross-pollinate with ${event.type}.
- Average deal size: ₦${(event.budget.max / 1000000).toFixed(1)}M.`;

                get().updateEvent(eventId, { autopsyReport: autopsy });
            },

            generateStrategy: async (myEventId) => {
                const myEvent = get().myEvents.find(e => e.id === myEventId);
                if (!myEvent) return;

                await new Promise(r => setTimeout(r, 2000));

                const recommendations = {
                    marketGaps: [
                        {
                            title: "Sustainable Fashion Focus",
                            description: "Only 15% of studied events cover eco-themes.",
                            potentialSponsors: ["MTN", "Unilever"]
                        },
                        {
                            title: "Tech-Fashion Fusion",
                            description: "No current events utilize Web3 elements.",
                            potentialSponsors: ["Flutterwave", "Paystack"]
                        }
                    ],
                    sponsorMatches: [
                        {
                            sponsorId: "s-1", // Access Access Bank
                            probability: 85,
                            pitchAngle: "Empowering the next generation of creative leaders.",
                            strategy: "Position as lead digital partner.",
                            reason: "Focus on Gen-Z creative empowerment aligns with their CSR.",
                            fitScore: 92
                        }
                    ]
                };

                get().updateMyEvent(myEventId, { aiRecommendations: recommendations });
            },

            sendMessage: async (content) => {
                const userMsg = { id: crypto.randomUUID(), role: 'user' as const, content, timestamp: new Date() };
                set(state => ({ messages: [...state.messages, userMsg] }));

                // Simulate AI Thinking
                await new Promise(r => setTimeout(r, 1000));

                const events = get().events;
                const sponsors = get().sponsors;
                const query = content.toLowerCase();

                let response = "";

                if (query.includes("lfw") || query.includes("lagos fashion week")) {
                    response = "Lagos Fashion Week 2025 was a major success with Heineken as title sponsor. The biggest gap identified was the lack of direct B2B tech integration for independent designers.";
                } else if (query.includes("gtco") || query.includes("gtbank")) {
                    response = "GTCO Fashion Weekend is the king of mass-market retail. If you're building a consumer-focused event, studying their SME empowerment model is key.";
                } else if (query.includes("sponsor") || query.includes("match")) {
                    response = "Based on recent data, Moët & Chandon and Heineken are actively seeking premium lifestyle placements. Streetwear enthusiasts are best captured by brands like Nike and Jameson.";
                } else if (query.includes("gap") || query.includes("opportunity")) {
                    response = "The most significant exploitable gap right now is Sustainable Fashion. Only 15% of Lagos events focus on eco-themes, yet sponsor interest in ESG is at an all-time high.";
                } else {
                    response = "That's an interesting question. My database shows that currently, high-engagement events in Lagos are shifting towards 'experiential luxury'. Would you like me to analyze a specific sponsor's behavior for you?";
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
                    const query = eventFilters.searchQuery.toLowerCase();
                    filtered = filtered.filter(
                        (event) =>
                            event.name.toLowerCase().includes(query) ||
                            event.organizer.toLowerCase().includes(query) ||
                            event.location.toLowerCase().includes(query)
                    );
                }

                if (eventFilters.dateRange.start) {
                    filtered = filtered.filter(
                        (event) => new Date(event.date) >= eventFilters.dateRange.start!
                    );
                }
                if (eventFilters.dateRange.end) {
                    filtered = filtered.filter(
                        (event) => new Date(event.date) <= eventFilters.dateRange.end!
                    );
                }

                if (eventFilters.eventTypes.length > 0) {
                    filtered = filtered.filter((event) =>
                        eventFilters.eventTypes.includes(event.type)
                    );
                }

                return filtered;
            },

            getFilteredSponsors: () => {
                const { sponsors, sponsorFilters } = get();
                let filtered = [...sponsors];

                if (sponsorFilters.searchQuery) {
                    const query = sponsorFilters.searchQuery.toLowerCase();
                    filtered = filtered.filter(
                        (sponsor) =>
                            sponsor.name.toLowerCase().includes(query) ||
                            sponsor.description.toLowerCase().includes(query)
                    );
                }

                if (sponsorFilters.industries && sponsorFilters.industries.length > 0) {
                    filtered = filtered.filter((sponsor) =>
                        sponsorFilters.industries!.includes(sponsor.industry)
                    );
                }

                return filtered;
            },

            getEventById: (id) => {
                return get().events.find((event) => event.id === id);
            },

            getSponsorById: (id) => {
                return get().sponsors.find((sponsor) => sponsor.id === id);
            },

            getMyEventById: (id) => {
                return get().myEvents.find((event) => event.id === id);
            },
        }),
        {
            name: "intelligence-storage",
            partialize: (state) => ({
                events: state.events,
                sponsors: state.sponsors,
                myEvents: state.myEvents,
                activities: state.activities,
                selectedEvents: state.selectedEvents,
                viewMode: state.viewMode,
                eventFilters: state.eventFilters,
                sponsorFilters: state.sponsorFilters,
            }),
        }
    )
);
