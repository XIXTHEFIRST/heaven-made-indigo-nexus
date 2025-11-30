import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Story", href: "/#story" },
  { name: "Shop", href: "/#shop" },
  { name: "Collections", href: "/#collections" },
  { name: "Lookbook", href: "/#lookbook" },
  { name: "Contact", href: "/#contact" },
];

export const ExperimentalNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Menu and Cart Buttons */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <CartDrawer />
        <button
          onClick={() => setIsOpen(true)}
          className="font-light tracking-wider uppercase text-sm bg-background/80 backdrop-blur-sm px-4 py-2 rounded-md hover:bg-background/90 transition-colors"
        >
          Menu
        </button>
      </div>

      {/* Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-background"
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-foreground hover:text-primary transition-colors duration-300"
            >
              <X size={32} />
            </motion.button>

            {/* Navigation Links */}
            <div className="h-full flex items-center justify-center">
              <nav className="space-y-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{
                      delay: 0.1 + index * 0.1,
                      duration: 0.6,
                      ease: [0.43, 0.13, 0.23, 0.96],
                    }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group block"
                    >
                      <motion.h2
                        className="text-6xl md:text-8xl font-light tracking-tight hover:text-primary transition-colors duration-300 relative"
                        whileHover={{ x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {link.name}
                        <motion.span
                          className="absolute bottom-2 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500"
                          whileHover={{ width: "100%" }}
                        />
                      </motion.h2>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
