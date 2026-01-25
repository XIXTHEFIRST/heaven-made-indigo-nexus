import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";

export const Navigation = () => {
    const { user } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Intelligence Dashboard", href: "/dashboard" },
        { name: "Event Research", href: "/events" },
        { name: "Sponsor Intel", href: "/sponsors" },
        { name: "My Strategy", href: "/my-strategy" },
        { name: "Research Hub", href: "/dashboard/research" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-background/95 backdrop-blur-md border-b border-border/50"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between h-20 lg:h-24">
                    {/* Logo */}
                    <Link
                        to={user ? "/dashboard" : "/"}
                        className="font-serif text-2xl lg:text-3xl font-bold tracking-tight hover:text-emerald-700 transition-colors flex items-center gap-2"
                    >
                        <span className="text-emerald-700 font-serif">LAGOS</span> FASHION INTEL
                        <Badge variant="outline" className="hidden sm:flex ml-2 border-emerald-500/30 text-emerald-600 bg-emerald-50/50 text-[8px] uppercase tracking-tighter">DEAL FLOW READY</Badge>
                    </Link>
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-12">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.href}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-foreground hover:text-accent transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-border/50 shadow-2xl"
                    >
                        <div className="container mx-auto px-6 py-8 space-y-4">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <Link
                                        to={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block font-sans text-lg tracking-wider uppercase text-muted-foreground hover:text-emerald-700 transition-colors py-2"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
