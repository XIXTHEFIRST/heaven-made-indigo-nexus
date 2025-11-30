import { Button } from "@/components/ui/button";
import indigoAtelierFlyer from "@/assets/indigo-atelier-flyer.png";

export const IndigoAtelier = () => {
  return (
    <section id="atelier" className="py-20 md:py-32">
      {/* Flyer Image Section */}
      <div className="container mx-auto px-6 lg:px-12 mb-16">
        <div className="max-w-4xl mx-auto">
          <img
            src={indigoAtelierFlyer}
            alt="INDIGO ATELIER POP UP RAVE"
            className="w-full h-auto object-contain rounded-lg shadow-2xl"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl text-center">
        <div className="space-y-10 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 border border-accent/30">
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
          <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
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
    </section>
  );
};
