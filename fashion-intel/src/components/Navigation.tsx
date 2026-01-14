import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "@/components/NavLink";

export const Navigation = () => {
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
                    <a
                        href="/"
                        className="font-serif text-2xl lg:text-3xl font-bold tracking-tight hover:text-intelligence-primary transition-colors flex items-center gap-2"
                    >
                        <span className="text-intelligence-primary">LAGOS</span> FASHION INTEL
                    </a>
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
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-border/50 animate-fade-in">
                    <div className="container mx-auto px-6 py-8 space-y-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block font-sans text-lg tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};
