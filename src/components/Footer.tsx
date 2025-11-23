import { Instagram, Twitter, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-4">About</h3>
            <ul className="font-inter space-y-2 text-muted-foreground">
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

          {/* Shop */}
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-4">Shop</h3>
            <ul className="font-inter space-y-2 text-muted-foreground">
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

          {/* Contact */}
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
            </div>
            <p className="font-inter text-muted-foreground">Lagos, Nigeria</p>
            <a
              href="mailto:hello@heavenmade.com"
              className="font-inter text-muted-foreground hover:text-foreground transition-colors"
            >
              hello@heavenmade.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-playfair text-2xl font-bold">HEAVEN MADE</p>
            <p className="font-inter text-sm text-muted-foreground">
              © 2025 Heaven Made. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
