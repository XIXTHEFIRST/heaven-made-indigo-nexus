import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useIntelligenceStore } from "./stores/intelligenceStore";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useToast } from "./hooks/use-toast";
import { useOnlineStatus } from "./hooks/useOnlineStatus";
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
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import LandingPage from "./pages/LandingPage";

const queryClient = new QueryClient();

const App = () => {
    const initializeStore = useIntelligenceStore(state => state.initialize);
    const { toast } = useToast();
    const isOnline = useOnlineStatus();

    useEffect(() => {
        initializeStore();
    }, [initializeStore]);

    useEffect(() => {
        if (!isOnline) {
            toast({
                title: "You are offline",
                description: "Market intelligence data may not be up to date.",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Back online",
                description: "Your connection has been restored.",
            });
        }
    }, [isOnline, toast]);

    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <AuthProvider>
                    <BrowserRouter>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                            <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
                            <Route path="/events/:id" element={<ProtectedRoute><EventDetail /></ProtectedRoute>} />
                            <Route path="/sponsors" element={<ProtectedRoute><Sponsors /></ProtectedRoute>} />
                            <Route path="/sponsors/:id" element={<ProtectedRoute><SponsorDetail /></ProtectedRoute>} />
                            <Route path="/sponsor-intelligence" element={<ProtectedRoute><SponsorIntelligence /></ProtectedRoute>} />
                            <Route path="/my-strategy" element={<ProtectedRoute><MyStrategy /></ProtectedRoute>} />
                            <Route path="/my-strategy/build" element={<ProtectedRoute><BuildMyEvent /></ProtectedRoute>} />
                            <Route path="/market-gaps" element={<ProtectedRoute><MarketGaps /></ProtectedRoute>} />
                            <Route path="/ai-intelligence" element={<ProtectedRoute><AIIntelligence /></ProtectedRoute>} />

                            {/* Protected Routes - Researcher/Admin only */}
                            <Route
                                path="/dashboard/research"
                                element={
                                    <ProtectedRoute requiredRole="Researcher">
                                        <ResearchDashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/research"
                                element={
                                    <ProtectedRoute requiredRole="Researcher">
                                        <Research />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Catch-all */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </AuthProvider>
            </TooltipProvider>
        </QueryClientProvider>
    );
};

export default App;
