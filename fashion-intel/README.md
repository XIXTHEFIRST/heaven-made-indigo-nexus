# Lagos Fashion Intelligence System

A comprehensive intelligence database for Lagos fashion events and sponsors. This platform enables event organizers, marketing professionals, sponsors, and fashion stakeholders to research events, analyze sponsorship dynamics, uncover market gaps, and generate AI-powered competitive intelligence.

## Features

### 4 Core Modules

1. **Dashboard** - Overview with stats, charts, upcoming events, top sponsors
2. **Event Research** - Searchable event database with filtering and analytics
3. **Sponsorship Analysis** - Sponsor profiles with ROI tracking and portfolio management
4. **Market Gap Analysis** - Opportunity identification with severity/opportunity scoring
5. **AI Intelligence** - Natural language search, insights feed, sponsor-event matching

## Tech Stack

- React 18.3 + TypeScript
- Vite
- Tailwind CSS (custom intelligence theme)
- Radix UI + shadcn/ui
- React Router DOM
- Zustand (state management with LocalStorage persistence)
- Recharts (data visualization)

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
fashion-intel/
├── src/
│   ├── components/
│   │   ├── events/         # Event-specific components
│   │   ├── sponsors/       # Sponsor-specific components
│   │   ├── intelligence/   # Shared intelligence components
│   │   └── ui/             # shadcn/ui components
│   ├── pages/              # Route pages (Dashboard, Events, Sponsors, etc.)
│   ├── stores/             # Zustand stores (intelligenceStore, researchStore)
│   ├── types/              # TypeScript type definitions
│   ├── lib/                # Utilities and mock data
│   └── App.tsx             # Main app with routes
├── public/                 # Static assets
└── BUILD_PROMPT.md         # Master build documentation
```

## Routes

- `/` - Landing page
- `/dashboard` - Main intelligence dashboard
- `/events` - Event research listing
- `/events/:id` - Event detail page
- `/sponsors` - Sponsorship analysis listing
- `/sponsors/:id` - Sponsor profile page
- `/market-gaps` - Market gap analysis
- `/ai-intelligence` - AI competitive intelligence
- `/research` - Research data management

## Data

The system uses mock data stored in `src/lib/mockData.ts` with:
- 6 Lagos fashion events
- 5 sponsors
- 4 market gaps
- 4 AI insights
- Sponsor-event matches

State is persisted to LocalStorage via Zustand middleware.

## Deployment

Ready for deployment to:
- **Google Cloud Run** (containerized)
- **Vercel** (serverless)

See `BUILD_PROMPT.md` for complete system documentation.
