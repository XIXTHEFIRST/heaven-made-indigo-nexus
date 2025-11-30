import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const navLinks = [
  { name: "Collections", href: "#collections" },
  { name: "Atelier", href: "#atelier" },
  { name: "Lookbook", href: "#lookbook" },
  { name: "Story", href: "#story" },
];

export const ExperimentalNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-8 right-8 z-50 font-sans text-xs tracking-[0.3em] uppercase hover:text-orange-vibrant transition-colors duration-300"
      >
        Menu
      </button>

      {/* Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-black-rich"
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-ivory hover:text-orange-vibrant transition-colors duration-300"
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
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group block"
                    >
                      <motion.h2
                        className="font-serif text-6xl md:text-8xl text-ivory relative overflow-hidden"
                        whileHover={{ x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {link.name}
                        <motion.span
                          className="absolute bottom-0 left-0 w-full h-1 bg-orange-vibrant origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.4 }}
                        />
                      </motion.h2>
                    </a>
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
              className="absolute top-1/4 right-1/4 w-64 h-64 bg-orange-vibrant/10 rounded-full blur-3xl"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-deep/10 rounded-full blur-3xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
