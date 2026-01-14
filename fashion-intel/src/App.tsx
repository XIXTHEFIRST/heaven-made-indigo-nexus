import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Research from "./pages/Research";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Sponsors from "./pages/Sponsors";
import SponsorDetail from "./pages/SponsorDetail";
import MarketGaps from "./pages/MarketGaps";
import AIIntelligence from "./pages/AIIntelligence";
import ResearchDashboard from "./pages/ResearchDashboard";
import MyStrategy from "./pages/MyStrategy";
import BuildMyEvent from "./pages/BuildMyEvent";
import SponsorIntelligence from "./pages/SponsorIntelligence";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/:id" element={<EventDetail />} />
                    <Route path="/sponsors" element={<Sponsors />} />
                    <Route path="/sponsors/:id" element={<SponsorDetail />} />
                    <Route path="/sponsor-intelligence" element={<SponsorIntelligence />} />
                    <Route path="/my-strategy" element={<MyStrategy />} />
                    <Route path="/my-strategy/build" element={<BuildMyEvent />} />
                    <Route path="/market-gaps" element={<MarketGaps />} />
                    <Route path="/ai-intelligence" element={<AIIntelligence />} />
                    <Route path="/dashboard/research" element={<ResearchDashboard />} />
                    <Route path="/research" element={<Research />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
