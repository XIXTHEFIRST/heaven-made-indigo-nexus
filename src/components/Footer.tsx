import { Instagram, Twitter, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-charcoal-deep border-t border-border/30 py-24 px-6 lg:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="md:col-span-5 space-y-6">
            <h3 className="font-serif text-4xl font-bold tracking-tight">HEAVEN MADE</h3>
            <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed max-w-md">
              A Lagos-bred fashion and art house designing from the soul, where
              street culture meets futuristic vision.
            </p>
            <div className="flex gap-5 pt-4">
              <a
                href="https://instagram.com/heaven.made"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={22} strokeWidth={1.5} />
              </a>
              <a
                href="https://x.com/madeinheav3n1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={22} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            {/* Shop */}
            <div>
              <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-accent mb-6 font-medium">
                Shop
              </h4>
              <ul className="font-sans space-y-3 text-sm text-muted-foreground font-light">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Collections
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Lookbook
                  </a>
                </li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-accent mb-6 font-medium">
                About
              </h4>
              <ul className="font-sans space-y-3 text-sm text-muted-foreground font-light">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Philosophy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Sustainability
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-accent mb-6 font-medium">
                Contact
              </h4>
              <ul className="font-sans space-y-3 text-sm text-muted-foreground font-light">
                <li>Lagos, Nigeria</li>
                <li>
                  <a
                    href="tel:+2349019273154"
                    className="hover:text-foreground transition-colors"
                  >
                    +234 901 927 3154
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@heavenmade.com"
                    className="hover:text-foreground transition-colors"
                  >
                    hello@heavenmade.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-xs tracking-wider text-muted-foreground/80">
              © 2025 Heaven Made. All rights reserved.
            </p>
            <div className="flex gap-6 font-sans text-xs text-muted-foreground/80">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
