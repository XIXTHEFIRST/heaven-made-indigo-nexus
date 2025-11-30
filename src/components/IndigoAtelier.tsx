import { Button } from "@/components/ui/button";
import indigoAtelierFlyer from "@/assets/indigo-atelier-flyer.png";

export const IndigoAtelier = () => {
  return (
    <section id="atelier" className="relative py-40 md:py-56 px-6 lg:px-12 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={indigoAtelierFlyer}
          alt="INDIGO ATELIER POP UP RAVE"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-4xl text-center">
        <div className="space-y-10 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 border border-accent/30 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-accent font-light">
              Coming Soon
            </span>
          </div>

          {/* Title */}
          <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.95]">
            INDIGO
            <br />
            <span className="italic">ATELIER</span>
          </h2>

          {/* Date */}
          <p className="font-serif text-3xl md:text-4xl text-accent italic font-light">
            December 2025
          </p>

          {/* Description */}
          <p className="font-sans text-lg md:text-xl text-silver/90 max-w-2xl mx-auto leading-relaxed font-light">
            A multi-sensory immersive experience where fashion transcends into
            art. An evening of culture, creativity, and community.
          </p>

          {/* CTA */}
          <div className="pt-6">
            <Button
              variant="luxury"
              size="lg"
              className="font-sans text-xs tracking-[0.2em] uppercase px-14 py-7 h-auto"
            >
              Reserve Your Spot
            </Button>
          </div>
        </div>
      </div>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-vibrant/15 rounded-full blur-3xl animate-glow-pulse pointer-events-none" />
    </section>
  );
};
