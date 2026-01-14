import {
    Event,
    Sponsor,
    SponsorshipDeal,
    MarketGap,
    AIInsight,
    SponsorEventMatch,
    EventType,
    SponsorshipTier,
    Industry,
    GapType,
    InsightType,
    VerificationStatus,
} from "@/types/intelligence";

// Mock Events Data
export const mockEvents: Event[] = [
    {
        id: "evt-lfw-2025",
        name: "Lagos Fashion Week 2025",
        date: new Date("2025-10-29"),
        endDate: new Date("2025-11-02"),
        location: "Victoria Island, Lagos",
        venue: "Federal Palace Hotel",
        type: EventType.FASHION_WEEK,
        status: "completed",
        estimatedAttendance: 15000,
        actualAttendance: 14500,
        demographics: {
            ageRange: "18-45",
            genderSplit: { male: 35, female: 62, other: 3 },
            incomeLevel: "High",
            interests: ["Fashion", "Sustainability", "Streetwear", "Luxury"],
        },
        sponsors: ["spn-heineken", "spn-moet", "spn-meta", "spn-lush"],
        intelSponsors: [
            { sponsorId: "spn-heineken", tier: SponsorshipTier.TITLE, dealAmount: 50000000, deliverables: "Title naming rights, main stage branding, VIP lounge" },
            { sponsorId: "spn-moet", tier: SponsorshipTier.GOLD, dealAmount: 15000000, deliverables: "Official opening party sponsor, VIP champagne service" }
        ],
        budget: { min: 80000000, max: 120000000, currency: "NGN" },
        mediaMetrics: {
            socialReach: 15000000,
            pressArticles: 120,
            instagramPosts: 45000,
            twitterMentions: 28000,
            engagement: 1200000,
        },
        tags: ["In Full Bloom", "Sustainability", "Pan-African", "StreetSouk"],
        description: "Celebrating 15 years of African fashion brilliance under the theme 'In Full Bloom'.",
        organizer: "Lagos Fashion Week Ltd",
        imageUrl: "/images/events/lfw2025.jpg",
        recurring: true,
        previousEditions: 15,
        verification: {
            status: VerificationStatus.VERIFIED,
            verifiedBy: "organizer",
            verifiedAt: new Date("2025-11-10"),
            source: "Official LFW Post-Event Report",
            confidence: 100,
        },
        created_at: new Date("2025-01-01"),
        created_by: "system"
    },
    {
        id: "evt-gtco-2025",
        name: "GTCO Fashion Weekend 2025",
        date: new Date("2025-11-08"),
        endDate: new Date("2025-11-09"),
        location: "Oniru, Lagos",
        venue: "GTCentre",
        type: EventType.FASHION_WEEK,
        status: "completed",
        estimatedAttendance: 250000,
        demographics: {
            ageRange: "16-60",
            genderSplit: { male: 42, female: 55, other: 3 },
            incomeLevel: "All",
            interests: ["Retail", "Fashion", "Beauty", "Masterclasses"],
        },
        sponsors: ["spn-gtbank"],
        intelSponsors: [
            { sponsorId: "spn-gtbank", tier: SponsorshipTier.TITLE, dealAmount: 120000000, deliverables: "Full event ownership, retail space branding, bank product integration" }
        ],
        budget: { min: 150000000, max: 200000000, currency: "NGN" },
        mediaMetrics: {
            socialReach: 25000000,
            pressArticles: 200,
            instagramPosts: 80000,
            twitterMentions: 45000,
            engagement: 3500000,
        },
        tags: ["Consumer-Focused", "Masterclasses", "Retail", "Free-to-Attend"],
        description: "A consumer-focused fashion exhibition and runway show promoting indigenous African brands.",
        organizer: "GTBank",
        recurring: true,
        previousEditions: 8,
        verification: {
            status: VerificationStatus.VERIFIED,
            verifiedBy: "organizer",
            verifiedAt: new Date("2025-11-15"),
            source: "GTCO Official Press Release",
            confidence: 100,
        },
        created_at: new Date("2025-01-01"),
        created_by: "system"
    },
    {
        id: "evt-souk-2025",
        name: "Street Souk Lagos 2025",
        date: new Date("2025-12-18"),
        location: "Victoria Island, Lagos",
        venue: "Harbour Point",
        type: EventType.EXHIBITION,
        status: "completed",
        estimatedAttendance: 10000,
        demographics: {
            ageRange: "16-30",
            genderSplit: { male: 55, female: 42, other: 3 },
            incomeLevel: "Medium",
            interests: ["Streetwear", "Youth Culture", "Music", "Skating"],
        },
        sponsors: ["spn-nike", "spn-jameson"],
        intelSponsors: [
            { sponsorId: "spn-nike", tier: SponsorshipTier.GOLD, dealAmount: 20000000, deliverables: "Custom activation zone, limited edition merch collaboration" }
        ],
        budget: { min: 20000000, max: 35000000, currency: "NGN" },
        mediaMetrics: {
            socialReach: 5000000,
            pressArticles: 40,
            instagramPosts: 15000,
            twitterMentions: 12000,
            engagement: 850000,
        },
        tags: ["Youth Culture", "Streetwear", "Convention", "Urban"],
        description: "Africa's premier streetwear convention celebrating the vibrant youth culture in Lagos.",
        organizer: "Street Souk",
        recurring: true,
        previousEditions: 6,
        verification: {
            status: VerificationStatus.VERIFIED,
            verifiedBy: "organizer",
            verifiedAt: new Date("2026-01-05"),
            source: "Street Souk Wrap Report",
            confidence: 100,
        },
        created_at: new Date("2025-01-01"),
        created_by: "system"
    },
    {
        id: "evt-lff-2025",
        name: "Lagos Fashion Fair 2025",
        date: new Date("2025-09-10"),
        endDate: new Date("2025-09-11"),
        location: "Victoria Island, Lagos",
        venue: "Eko Convention Center",
        type: EventType.EXHIBITION,
        status: "completed",
        estimatedAttendance: 5000,
        demographics: {
            ageRange: "25-55",
            genderSplit: { male: 30, female: 65, other: 5 },
            incomeLevel: "Medium-High",
            interests: ["B2B", "Sourcing", "Garment Production", "Wholesale"],
        },
        sponsors: [],
        budget: { min: 10000000, max: 20000000, currency: "NGN" },
        mediaMetrics: {
            socialReach: 1000000,
            pressArticles: 25,
            instagramPosts: 5000,
            twitterMentions: 3000,
            engagement: 150000,
        },
        tags: ["B2B", "Exhibition", "Sourcing", "Industry"],
        description: "Nigeria's largest international ready-to-wear garments, textiles and accessories exhibition.",
        organizer: "Atlantic Exhibition",
        recurring: true,
        previousEditions: 12,
        verification: {
            status: VerificationStatus.VERIFIED,
            source: "LFF Official Website",
            confidence: 100,
        },
        created_at: new Date("2025-01-01"),
        created_by: "system"
    },
];

// Mock Sponsors Data
export const mockSponsors: Sponsor[] = [
    {
        id: "spn-gtbank",
        name: "GTBank",
        industry: Industry.BANKING,
        description: "Leading Nigerian bank supporting fashion and creative industries through GTCO Fashion Weekend.",
        website: "https://www.gtbank.com",
        eventsSponsored: ["evt-gtco-2025"],
        totalSponsorship: 150000000,
        totalInvestmentBudget: 500000000,
        averageROI: 9.5,
        preferredTiers: [SponsorshipTier.TITLE],
        targetDemographics: {
            ageRange: "18-60",
            genderSplit: { male: 45, female: 52, other: 3 },
            incomeLevel: "All",
            interests: ["Fashion", "Business", "Retail", "Entrepreneurship"],
        },
        activeSince: new Date("2016-01-01"),
        intel: {
            winningStrategy: "Focus on SME growth and retail empowerment. They value mass-market activation and educational masterclasses.",
            careabouts: ["Brand visibility", "Digital adoption", "SME development"],
            trends: "Moving towards integrated lifestyle experiences rather than just banking.",
            redFlags: ["Disorganized retail spaces", "Low tech integration"],
        }
    },
    {
        id: "spn-heineken",
        name: "Heineken",
        industry: Industry.BEVERAGE,
        description: "International premium beer brand, title sponsor of Lagos Fashion Week.",
        website: "https://www.heineken.com",
        eventsSponsored: ["evt-lfw-2025"],
        totalSponsorship: 85000000,
        totalInvestmentBudget: 300000000,
        averageROI: 8.2,
        preferredTiers: [SponsorshipTier.TITLE, SponsorshipTier.GOLD],
        targetDemographics: {
            ageRange: "21-45",
            genderSplit: { male: 50, female: 47, other: 3 },
            incomeLevel: "High",
            interests: ["Lifestyle", "Sustainability", "International Fashion"],
        },
        activeSince: new Date("2015-01-01"),
        intel: {
            winningStrategy: "Sustainability and innovation. They love high-concept runway shows and tech-driven activations.",
            careabouts: ["Sustainability", "Premium positioning", "Global standards"],
            trends: "Focus on eco-friendly fashion and circular economy.",
            redFlags: ["Wasteful event practices", "Low-quality production"],
        }
    },
    {
        id: "spn-moet",
        name: "Moët & Chandon",
        industry: Industry.BEVERAGE,
        description: "Premium champagne house known for hosting exclusive fashion parties.",
        website: "https://www.moet.com",
        eventsSponsored: ["evt-lfw-2025"],
        totalSponsorship: 45000000,
        totalInvestmentBudget: 200000000,
        averageROI: 7.5,
        preferredTiers: [SponsorshipTier.GOLD],
        targetDemographics: {
            ageRange: "25-50",
            genderSplit: { male: 40, female: 58, other: 2 },
            incomeLevel: "Very High",
            interests: ["Luxury", "Celebration", "Gala"],
        },
        activeSince: new Date("2018-01-01"),
        intel: {
            winningStrategy: "Exclusivity and luxury. They value VIP guest lists and high-quality photo opportunities.",
            careabouts: ["Prestige", "VIP access", "Aesthetics"],
            trends: "Shift towards curated, intimate luxury experiences.",
            redFlags: ["Mass-market feel", "Poor aesthetic control"],
        }
    },
    {
        id: "spn-meta",
        name: "Meta",
        industry: Industry.TECH,
        description: "Global tech giant supporting the digitization of African fashion.",
        website: "https://about.meta.com",
        eventsSponsored: ["evt-lfw-2025"],
        totalSponsorship: 60000000,
        totalInvestmentBudget: 500000000,
        averageROI: 8.8,
        preferredTiers: [SponsorshipTier.GOLD],
        targetDemographics: {
            ageRange: "18-35",
            genderSplit: { male: 48, female: 50, other: 2 },
            incomeLevel: "Medium-High",
            interests: ["Technology", "Social Media", "Content Creation"],
        },
        activeSince: new Date("2021-01-01"),
    },
    {
        id: "spn-nike",
        name: "Nike",
        industry: Industry.FASHION,
        description: "Global sports and lifestyle brand deeply involved in Lagos streetwear.",
        eventsSponsored: ["evt-souk-2025"],
        totalSponsorship: 40000000,
        totalInvestmentBudget: 250000000,
        averageROI: 9.1,
        preferredTiers: [SponsorshipTier.GOLD, SponsorshipTier.SILVER],
        targetDemographics: {
            ageRange: "16-30",
            genderSplit: { male: 60, female: 38, other: 2 },
            incomeLevel: "Medium-High",
            interests: ["Streetwear", "Culture", "Sports"],
        },
        activeSince: new Date("2019-01-01"),
    },
];

// Mock Sponsorship Deals
export const mockDeals: SponsorshipDeal[] = [
    {
        id: "deal-001",
        sponsorId: "spn-001",
        eventId: "evt-001",
        tier: SponsorshipTier.PLATINUM,
        amount: 25000000,
        activationStrategy: ["VIP Lounge", "Brand Activation Zone", "Social Media Campaign"],
        roi: {
            mediaValue: 180000000,
            impressions: 2200000,
            engagement: 320000,
            leadGeneration: 1500,
            brandAwareness: 85,
            overallScore: 8.8,
        },
        startDate: new Date("2026-03-15"),
        endDate: new Date("2026-03-18"),
        renewalProbability: 92,
        verification: {
            status: VerificationStatus.VERIFIED,
            verifiedBy: "organizer",
            verifiedAt: new Date("2026-01-05"),
            source: "Official sponsorship agreement",
            confidence: 100,
        },
    },
    {
        id: "deal-002",
        sponsorId: "spn-002",
        eventId: "evt-001",
        tier: SponsorshipTier.GOLD,
        amount: 15000000,
        activationStrategy: ["Beverage Service", "Branded Photo Booth", "After Party"],
        roi: {
            mediaValue: 95000000,
            impressions: 1500000,
            engagement: 180000,
            leadGeneration: 850,
            brandAwareness: 78,
            overallScore: 7.9,
        },
        startDate: new Date("2026-03-15"),
        endDate: new Date("2026-03-18"),
        renewalProbability: 85,
        verification: {
            status: VerificationStatus.ESTIMATED,
            source: "Industry estimates based on previous sponsorships",
            confidence: 80,
        },
    },
];

// Mock Market Gaps
export const mockMarketGaps: MarketGap[] = [
    {
        id: "gap-001",
        type: GapType.GEOGRAPHIC,
        title: "Mainland Fashion Events Underserved",
        description: "Only 15% of major fashion events occur on the mainland despite 60% of target demographic residing there.",
        severity: 8,
        opportunity: 9,
        affectedArea: "Ikeja, Surulere, Yaba (Mainland Lagos)",
        recommendations: [
            "Organize mid-tier fashion events in Ikeja GRA",
            "Partner with mainland venues for pop-up events",
            "Target emerging designers with lower overhead costs",
        ],
        potentialRevenue: 45000000,
        identifiedDate: new Date("2026-01-10"),
    },
    {
        id: "gap-002",
        type: GapType.DEMOGRAPHIC,
        title: "Male Fashion Events Gap",
        description: "Less than 10% of events specifically target male fashion enthusiasts despite growing market.",
        severity: 7,
        opportunity: 8,
        affectedArea: "All Lagos",
        recommendations: [
            "Create menswear-focused runway shows",
            "Partner with male grooming brands",
            "Organize tailoring and bespoke fashion workshops",
        ],
        potentialRevenue: 32000000,
        identifiedDate: new Date("2026-01-15"),
    },
    {
        id: "gap-003",
        type: GapType.SEASONAL,
        title: "Q3 Event Drought",
        description: "July-September shows 40% fewer events compared to other quarters.",
        severity: 6,
        opportunity: 7,
        affectedArea: "All Lagos",
        recommendations: [
            "Launch back-to-work fashion campaigns in September",
            "Organize indoor events during rainy season",
            "Create seasonal collection showcases",
        ],
        potentialRevenue: 28000000,
        identifiedDate: new Date("2026-01-08"),
    },
    {
        id: "gap-004",
        type: GapType.EVENT_TYPE,
        title: "Limited Fashion Workshops",
        description: "Educational fashion events represent only 5% of total events despite high demand.",
        severity: 5,
        opportunity: 8,
        affectedArea: "All Lagos",
        recommendations: [
            "Partner with fashion schools for workshop series",
            "Create masterclasses with established designers",
            "Organize fashion business and marketing workshops",
        ],
        potentialRevenue: 18000000,
        identifiedDate: new Date("2026-01-12"),
    },
];

// Mock AI Insights
export const mockAIInsights: AIInsight[] = [
    {
        id: "insight-001",
        type: InsightType.TREND,
        title: "Sustainable Fashion Gaining 45% YoY Growth",
        content: "Analysis of event attendance and social media engagement shows sustainable fashion events experiencing 45% year-over-year growth. Eco-conscious brands seeing higher sponsorship ROI.",
        confidence: 87,
        supportingData: [
            "3 new sustainable fashion events launched in 2025",
            "Average attendance up 38% for eco-fashion events",
            "Social media engagement 52% higher for sustainability content",
        ],
        actionable: true,
        priority: "high",
        createdAt: new Date("2026-01-11"),
        tags: ["Sustainability", "Growth", "Opportunity"],
    },
    {
        id: "insight-002",
        type: InsightType.PREDICTION,
        title: "Bridal Fashion Market to Expand 30% in 2026",
        content: "Predictive models indicate bridal fashion events will see 30% market expansion driven by post-pandemic wedding boom and increased luxury spending.",
        confidence: 82,
        supportingData: [
            "Wedding industry growth rate: 28%",
            "Bridal event attendance trending upward",
            "Luxury spending in bridal segment up 35%",
        ],
        actionable: true,
        priority: "high",
        createdAt: new Date("2026-01-10"),
        tags: ["Bridal", "Prediction", "Growth"],
    },
    {
        id: "insight-003",
        type: InsightType.RECOMMENDATION,
        title: "Tech Companies Should Enter Fashion Sponsorship",
        content: "Analysis shows tech companies have 85% lower presence in fashion sponsorship despite target demographic overlap. Recommended entry point: streetwear and youth-focused events.",
        confidence: 79,
        supportingData: [
            "Tech demographic matches 78% with fashion event attendees",
            "Competitor analysis shows untapped market",
            "Youth events show highest tech brand affinity",
        ],
        actionable: true,
        priority: "medium",
        createdAt: new Date("2026-01-09"),
        tags: ["Tech", "Sponsorship", "Opportunity"],
    },
    {
        id: "insight-004",
        type: InsightType.ALERT,
        title: "Q2 Event Saturation Risk",
        content: "Warning: 12 major events scheduled for April-May 2026 may lead to audience fatigue and reduced attendance. Consider rescheduling or differentiation strategies.",
        confidence: 91,
        supportingData: [
            "Historical data shows 25% attendance drop during saturation",
            "Sponsor budget dilution across multiple events",
            "Media coverage fragmentation",
        ],
        actionable: true,
        priority: "high",
        createdAt: new Date("2026-01-12"),
        tags: ["Alert", "Scheduling", "Risk"],
    },
];

// Mock Sponsor-Event Matches
export const mockMatches: SponsorEventMatch[] = [
    {
        sponsorId: "spn-003",
        eventId: "evt-004",
        fitScore: 92,
        reasoning: [
            "Target demographic alignment: 95% match",
            "Brand values align with youth culture and innovation",
            "Geographic presence in Yaba area",
            "Previous success with similar urban events",
        ],
        estimatedROI: 8.7,
        recommendedTier: SponsorshipTier.GOLD,
    },
    {
        sponsorId: "spn-005",
        eventId: "evt-006",
        fitScore: 89,
        reasoning: [
            "Perfect demographic match: bridal/beauty audience",
            "Premium positioning aligns with luxury bridal market",
            "High female attendance (83%)",
            "Opportunity for product demonstrations",
        ],
        estimatedROI: 8.4,
        recommendedTier: SponsorshipTier.GOLD,
    },
];

// Helper function to get event by ID
export const getEventById = (id: string): Event | undefined => {
    return mockEvents.find((event) => event.id === id);
};

// Helper function to get sponsor by ID
export const getSponsorById = (id: string): Sponsor | undefined => {
    return mockSponsors.find((sponsor) => sponsor.id === id);
};

// Helper function to get events by sponsor
export const getEventsBySponsor = (sponsorId: string): Event[] => {
    const sponsor = getSponsorById(sponsorId);
    if (!sponsor) return [];
    return mockEvents.filter((event) => sponsor.eventsSponsored.includes(event.id));
};

// Helper function to get sponsors by event
export const getSponsorsByEvent = (eventId: string): Sponsor[] => {
    const event = getEventById(eventId);
    if (!event) return [];
    return mockSponsors.filter((sponsor) => event.sponsors.includes(sponsor.id));
};
