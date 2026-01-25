// Type definitions for Fashion Intelligence System

export enum EventType {
    RUNWAY_SHOW = "Runway Show",
    POP_UP = "Pop-up Store",
    EXHIBITION = "Exhibition",
    PRODUCT_LAUNCH = "Product Launch",
    FASHION_TALK = "Fashion Talk",
    NETWORKING = "Networking Mixer",
    FASHION_WEEK = "Fashion Week",
    GALA = "Gala",
}

export enum Currency {
    NGN = "₦",
    USD = "$",
    GBP = "£",
    EUR = "€"
}

export enum VerificationStatus {
    VERIFIED = "verified",           // ✓ Confirmed by organizer/sponsor
    COMMUNITY_VERIFIED = "community", // ~ Verified by multiple users
    ESTIMATED = "estimated",          // ~ Estimated from industry sources
    UNVERIFIED = "unverified"        // No verification
}

export enum SponsorshipTier {
    TITLE = "Title/Presenting",
    GOLD = "Gold",
    SILVER = "Silver",
    BRONZE = "Bronze",
    PLATINUM = "Platinum",
    IN_KIND = "In-Kind"
}

export enum Industry {
    BANKING = "Banking & Finance",
    TELECOM = "Telecommunications",
    BEVERAGE = "Beverages & Alcohol",
    BEAUTY = "Beauty & Cosmetics",
    AUTOMOTIVE = "Automotive",
    RETAIL = "Fashion Retail",
    TECH = "Technology",
    REAL_ESTATE = "Real Estate",
    FASHION = "Fashion & Apparel",
    OTHER = "Other",
}

export interface Demographics {
    ageRange: string;
    genderSplit: {
        male: number;
        female: number;
        other: number;
    };
    incomeLevel: string;
    interests: string[];
}

export interface MediaMetrics {
    socialReach: number;
    pressArticles: number;
    instagramPosts: number;
    twitterMentions: number;
    engagement: number;
}

export interface VerificationInfo {
    status: VerificationStatus;
    verifiedBy?: string;
    verifiedAt?: Date;
    source?: string;
    confidence?: number;
}

export interface BudgetRange {
    min: number;
    max: number;
    currency: string;
}

export interface EventSponsor {
    sponsorId: string;
    tier: SponsorshipTier;
    dealAmount: number;
    deliverables: string;
}

export interface EventSuccessMetrics {
    socialImpressions: number;
    mediaCoverage: string;
    attendanceVsExpected: number;
    viralMoments: string;
}

export interface EventCriticalAnalysis {
    whatWorked: string;
    whatFlopped: string;
    sponsorFeedback?: string;
}

export interface Event {
    id: string;
    name: string;
    date: Date;
    endDate?: Date;
    location: string;
    venue: string;
    type: EventType;
    status: "upcoming" | "completed" | "cancelled";
    estimatedAttendance: number;
    actualAttendance?: number;
    demographics: Demographics;
    sponsors: string[]; // Legacy ID array
    intelSponsors?: EventSponsor[]; // New detailed sponsor info
    successMetrics?: EventSuccessMetrics;
    analysis?: EventCriticalAnalysis;
    autopsyReport?: string;
    budget: BudgetRange;
    mediaMetrics: MediaMetrics;
    tags: string[];
    description: string;
    organizer: string;
    imageUrl?: string;
    bannerImage?: string;
    recurring: boolean;
    previousEditions?: number;
    verification: VerificationInfo;
    created_at: Date;
    created_by: string;
}

export interface MyEvent {
    id: string;
    name: string;
    type: string;
    targetAudience: string[];
    budgetGoal: number;
    currency: string | Currency;
    uniqueAngle: string;
    assets?: string[];
    status: "draft" | "planned" | "active";
    aiRecommendations?: {
        marketGaps: Array<{
            title: string;
            description: string;
            potentialSponsors: string[];
        }>;
        sponsorMatches: Array<{
            sponsorId: string;
            probability: number;
            pitchAngle: string;
            strategy: string;
            reason?: string;
            fitScore?: number;
        }>;
    };
    created_at: Date;
}

export interface SponsorIntel {
    winningStrategy: string;
    careabouts: string[];
    trends: string;
    redFlags: string[];
}

export interface Sponsor {
    id: string;
    name: string;
    industry: Industry;
    logo?: string;
    description: string;
    website?: string;
    contactEmail?: string;
    contactPhone?: string;
    eventsSponsored: string[]; // Event IDs
    totalSponsorship: number;
    totalInvestmentBudget: number;
    averageROI: number;
    preferredTiers: SponsorshipTier[];
    targetDemographics: Demographics;
    activeSince: Date;
    internalNotes?: string;
    intel?: SponsorIntel;
}

export interface Activity {
    id: string;
    type: "create" | "update" | "delete";
    entityType: "event" | "sponsor";
    entityName: string;
    timestamp: Date;
    userId: string;
}

export enum GapType {
    GEOGRAPHIC = "Geographic",
    DEMOGRAPHIC = "Demographic",
    EVENT_TYPE = "Event Type",
    SEASONAL = "Seasonal",
    BUDGET = "Budget Range",
}

export interface MarketGap {
    id: string;
    type: GapType;
    title: string;
    description: string;
    severity: number; // 1-10
    opportunity: number; // 1-10
    affectedArea: string;
    recommendations: string[];
    potentialRevenue?: number;
    identifiedDate: Date;
}

export enum InsightType {
    TREND = "Trend",
    PREDICTION = "Prediction",
    RECOMMENDATION = "Recommendation",
    ALERT = "Alert",
    ANALYSIS = "Analysis",
}

export interface AIInsight {
    id: string;
    type: InsightType;
    title: string;
    content: string;
    confidence: number; // 0-100
    supportingData: string[];
    actionable: boolean;
    priority: "low" | "medium" | "high";
    createdAt: Date;
    tags: string[];
}

export interface SponsorshipDeal {
    id: string;
    sponsorId: string;
    eventId: string;
    tier: SponsorshipTier;
    amount: number;
    activationStrategy: string[];
    roi: {
        mediaValue: number;
        impressions: number;
        engagement: number;
        leadGeneration: number;
        brandAwareness: number;
        overallScore: number;
    };
    startDate: Date;
    endDate: Date;
    renewalProbability: number;
    verification: VerificationInfo;
}

export interface SponsorEventMatch {
    sponsorId: string;
    eventId: string;
    fitScore: number; // 0-100
    reasoning: string[];
    estimatedROI: number;
    recommendedTier: SponsorshipTier;
}

export interface FilterState {
    searchQuery: string;
    dateRange: {
        start: Date | null;
        end: Date | null;
    };
    eventTypes: EventType[];
    locations: string[];
    attendanceRange: {
        min: number;
        max: number;
    };
    budgetRange: {
        min: number;
        max: number;
    };
    industries: Industry[];
    tiers: SponsorshipTier[];
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'todo' | 'in-progress' | 'review' | 'done';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: 'research' | 'outreach' | 'logistics' | 'content' | 'other';
    dueDate?: Date;
    assignedTo?: string;
    createdBy: string;
    entityType?: 'event' | 'sponsor';
    entityId?: string;
    createdAt: Date;
    assignee?: {
        full_name: string;
        avatar_url?: string;
    };
    creator?: {
        full_name: string;
        avatar_url?: string;
    };
}
