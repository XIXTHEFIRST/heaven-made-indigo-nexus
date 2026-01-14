# Lagos Fashion Intelligence System - Master Build Prompt

## Project Overview
A production-ready web application serving as a comprehensive intelligence database for Lagos fashion events and sponsors. The platform enables event organizers, marketing professionals, sponsors, and fashion stakeholders to research events, analyze sponsorship dynamics, uncover market gaps, and generate AI-powered competitive intelligence.

## Tech Stack
- **Frontend Framework**: React 18.3+ with TypeScript
- **Build Tool**: Vite 5.4+
- **Routing**: React Router DOM v6
- **UI Components**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Data Fetching**: TanStack Query (React Query)
- **Animations**: Framer Motion
- **Charts/Visualization**: Recharts
- **Date Handling**: date-fns

## Deployment Targets
- **Primary**: Google Cloud Run (containerized, scalable)
- **Alternative**: Vercel (serverless, edge-optimized)
- **Requirements**: Production-grade, secure, scalable

## Core Features & Modules

### 1. Event Research Module
**Purpose**: Comprehensive database and search for Lagos fashion events

**Features**:
- Event discovery and filtering (date, location, type, size)
- Event details (organizers, attendees, budget estimates, past sponsors)
- Historical event data and trends
- Event comparison tools
- Calendar view and timeline visualization

**Data Points**:
- Event name, date, location, venue
- Event type (runway show, pop-up, exhibition, gala, etc.)
- Estimated attendance and demographics
- Past sponsors and partnership details
- Media coverage and social metrics
- Budget ranges and sponsorship tiers

### 2. Sponsorship Analysis Module
**Purpose**: Deep insights into sponsorship relationships and ROI

**Features**:
- Sponsor-event relationship mapping
- Sponsorship tier analysis (platinum, gold, silver, etc.)
- ROI metrics and performance tracking
- Sponsor portfolio analysis
- Brand-event fit scoring
- Sponsorship trend analysis over time

**Data Points**:
- Sponsor company profiles
- Sponsorship amounts and tiers
- Activation strategies used
- Media value and impressions
- Engagement metrics
- Contract durations and renewal rates

### 3. Market Gap Analysis Module
**Purpose**: Identify untapped opportunities in the Lagos fashion ecosystem

**Features**:
- Underserved event categories identification
- Geographic gap analysis (areas lacking events)
- Demographic gap analysis (underserved audiences)
- Seasonal opportunity mapping
- Emerging trend detection
- White space visualization

**Insights Generated**:
- Event type saturation levels
- Underrepresented fashion segments
- Optimal timing for new events
- Location recommendations
- Target audience opportunities

### 4. AI Competitive Intelligence Module
**Purpose**: AI-powered insights and recommendations

**Features**:
- Automated competitor analysis
- Sponsorship opportunity matching (AI suggests best sponsor-event fits)
- Predictive analytics for event success
- Natural language queries for data exploration
- Automated report generation
- Trend forecasting
- Sentiment analysis from social media

**AI Capabilities**:
- Event success prediction models
- Sponsor recommendation engine
- Market trend analysis
- Anomaly detection (unusual patterns)
- Natural language search interface

## User Personas

### 1. Event Organizers
**Needs**: Find sponsors, understand market positioning, optimize event timing
**Use Cases**: Research successful events, identify potential sponsors, analyze competition

### 2. Marketing Professionals
**Needs**: Evaluate sponsorship opportunities, track ROI, competitive intelligence
**Use Cases**: Compare sponsorship options, analyze brand fit, track campaign performance

### 3. Sponsors/Brands
**Needs**: Discover relevant events, evaluate ROI, portfolio management
**Use Cases**: Find events matching brand values, analyze past sponsorship performance

### 4. Fashion Stakeholders
**Needs**: Market insights, trend analysis, ecosystem understanding
**Use Cases**: Research market gaps, identify opportunities, track industry trends

## Application Architecture

### Page Structure
```
/                          → Landing/Dashboard
/events                    → Event Research Module
/events/:id                → Event Detail Page
/sponsors                  → Sponsorship Analysis Module
/sponsors/:id              → Sponsor Profile Page
/market-gaps               → Market Gap Analysis Module
/ai-intelligence           → AI Competitive Intelligence Module
/research                  → Research Data Management (existing)
```

### Component Hierarchy
```
App
├── Navigation (global)
├── Dashboard
│   ├── StatsOverview
│   ├── RecentEvents
│   ├── TrendingSponsors
│   └── QuickInsights
├── EventResearch
│   ├── EventFilters
│   ├── EventGrid/List
│   ├── EventMap
│   └── EventComparison
├── SponsorshipAnalysis
│   ├── SponsorFilters
│   ├── SponsorGrid
│   ├── RelationshipGraph
│   └── ROICharts
├── MarketGaps
│   ├── GapVisualization
│   ├── OpportunityCards
│   └── TrendCharts
└── AIIntelligence
    ├── NaturalLanguageSearch
    ├── InsightsDashboard
    ├── RecommendationEngine
    └── ReportGenerator
```

## Design System Requirements

### Visual Identity
- **Aesthetic**: Premium, modern, data-rich, professional
- **Color Palette**: 
  - Primary: Deep purple/indigo (fashion-forward)
  - Accent: Gold/amber (luxury, premium)
  - Neutrals: Sophisticated grays, off-white backgrounds
  - Data visualization: Vibrant, distinguishable color set
- **Typography**: 
  - Headers: Serif font (elegance, fashion)
  - Body: Sans-serif (readability, modern)
- **Style**: Glassmorphism, subtle gradients, smooth animations

### UI Patterns
- Dashboard cards with hover effects
- Interactive data visualizations (charts, graphs, maps)
- Advanced filtering with multi-select
- Search with autocomplete
- Responsive tables with sorting/pagination
- Modal dialogs for detailed views
- Toast notifications for actions
- Loading states and skeletons

## Data Management

### State Management Strategy
- **Global State (Zustand)**: User preferences, auth state, filters
- **Server State (React Query)**: API data, caching, background updates
- **Local State**: Form inputs, UI toggles, temporary data

### Data Storage Options
1. **Phase 1 (MVP)**: LocalStorage + Zustand (client-side)
2. **Phase 2**: Firebase/Supabase (real-time, scalable)
3. **Phase 3**: Custom backend API + PostgreSQL

### Sample Data Structure
```typescript
interface Event {
  id: string;
  name: string;
  date: Date;
  location: string;
  venue: string;
  type: EventType;
  estimatedAttendance: number;
  demographics: Demographics;
  sponsors: Sponsor[];
  budget: BudgetRange;
  mediaMetrics: MediaMetrics;
  tags: string[];
}

interface Sponsor {
  id: string;
  name: string;
  industry: string;
  tier: SponsorshipTier;
  amount?: number;
  events: Event[];
  roi: ROIMetrics;
}
```

## Implementation Phases

### Phase 1: Foundation (MVP)
- [ ] Setup project structure and routing
- [ ] Implement design system and core components
- [ ] Create dashboard with mock data
- [ ] Build Event Research module (basic)
- [ ] Build Sponsorship Analysis module (basic)
- [ ] Implement responsive navigation

### Phase 2: Core Features
- [ ] Complete all four modules with full functionality
- [ ] Add advanced filtering and search
- [ ] Implement data visualization (charts, graphs)
- [ ] Add data export capabilities
- [ ] Create detailed view pages

### Phase 3: AI & Intelligence
- [ ] Integrate AI-powered search
- [ ] Build recommendation engine
- [ ] Add predictive analytics
- [ ] Implement automated insights

### Phase 4: Production Ready
- [ ] Backend API integration
- [ ] Authentication and authorization
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Analytics integration
- [ ] Deployment to Cloud Run/Vercel

## Development Guidelines

### Code Quality
- TypeScript strict mode enabled
- ESLint + Prettier for code formatting
- Component-driven development
- Reusable utility functions
- Proper error handling
- Loading and empty states

### Performance
- Code splitting by route
- Lazy loading for heavy components
- Image optimization
- Memoization for expensive computations
- Virtual scrolling for large lists

### Accessibility
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Color contrast compliance
- Focus management

### Security
- Input validation and sanitization
- XSS prevention
- CSRF protection (when backend added)
- Secure API calls
- Environment variable management

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Next Steps for AI Assistant

When building this system, follow this sequence:

1. **Review existing code**: Check current Navigation, Research page, and App structure
2. **Create implementation plan**: Detail all components and pages needed
3. **Setup routing**: Add all new routes to App.tsx
4. **Build design system**: Extend existing Tailwind config with fashion-specific tokens
5. **Create shared components**: Filters, cards, charts, search bars
6. **Implement modules sequentially**: Dashboard → Events → Sponsors → Market Gaps → AI
7. **Add mock data**: Create realistic sample data for all modules
8. **Polish and optimize**: Animations, responsive design, performance
9. **Create walkthrough**: Document all features with screenshots

## Success Criteria

- ✅ All four modules fully functional
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Fast performance (< 3s initial load)
- ✅ Intuitive UX (clear navigation, helpful tooltips)
- ✅ Premium aesthetic (wow factor on first impression)
- ✅ Production-ready code (no console errors, proper error handling)
- ✅ Deployment-ready (can deploy to Cloud Run or Vercel)

---

**Note**: This is a comprehensive intelligence platform. Focus on creating a premium, data-rich experience that provides real value to Lagos fashion industry stakeholders.
