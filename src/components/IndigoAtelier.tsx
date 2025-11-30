import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import indigoAtelierFlyer from "@/assets/indigo-atelier-flyer.png";

export const IndigoAtelier = () => {
  return (
    <section id="atelier" className="py-16 md:py-20 lg:py-32">
      {/* Flyer Image Section */}
      <div className="container mx-auto px-4 md:px-6 lg:px-12 mb-12 md:mb-16">
        <div className="max-w-4xl mx-auto">
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            src={indigoAtelierFlyer}
            alt="INDIGO ATELIER POP UP RAVE"
            className="w-full h-auto object-contain rounded-lg shadow-2xl"
            loading="lazy"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-6 lg:px-12 max-w-4xl text-center">
        <div className="space-y-6 md:space-y-8 lg:space-y-10 animate-fade-in-up">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-4 md:px-6 py-2 md:py-3 border border-accent/30"
          >
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent font-light">
              Coming Soon
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight leading-[0.95]"
          >
            INDIGO
            <br />
            <span className="italic">ATELIER</span>
          </motion.h2>

          {/* Date */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-2xl md:text-3xl lg:text-4xl text-accent italic font-light"
          >
            December 2025
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-sans text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light px-4"
          >
            A multi-sensory immersive experience where fashion transcends into
            art. An evening of culture, creativity, and community.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-4 md:pt-6"
          >
            <Button
              variant="luxury"
              size="lg"
              className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase px-8 md:px-14 py-5 md:py-7 h-auto touch-manipulation"
            >
              Reserve Your Spot
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
