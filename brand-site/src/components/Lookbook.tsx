import { useRef } from "react";
import { motion } from "framer-motion";
import arcadiaBlack2 from "@/assets/arcadia-black-2.jpg";
import arcadiaGreen2 from "@/assets/arcadia-green-2.jpg";
import arcadiaDuo from "@/assets/arcadia-duo.jpg";

const lookbookImages = [
  { id: 1, src: arcadiaBlack2, alt: "ARCADIA Black Tee - Lagos Streets" },
  { id: 2, src: arcadiaGreen2, alt: "ARCADIA Green Tee - Urban Culture" },
  { id: 3, src: arcadiaDuo, alt: "ARCADIA Collection - Street Luxury" },
];

export const Lookbook = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="lookbook" className="py-32 md:py-48 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-3xl"
        >
          <div className="w-16 h-px bg-accent mb-6" />
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light mb-4">
            Lookbook
          </h2>
          <p className="font-sans text-lg text-muted-foreground font-light tracking-wide">
            Visual stories from Lagos streets, captured in motion
          </p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 lg:gap-12 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-6 lg:-mx-12 px-6 lg:px-12"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {lookbookImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className="flex-none w-[85vw] md:w-[600px] lg:w-[700px] snap-start"
            >
              <div className="aspect-[3/4] overflow-hidden group relative">
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1, filter: "brightness(1.1)" }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
