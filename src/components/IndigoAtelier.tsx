import { Button } from "@/components/ui/button";
import indigoAtelier from "@/assets/indigo-atelier.jpg";

export const IndigoAtelier = () => {
  return (
    <section className="relative py-32 md:py-48 px-4 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={indigoAtelier}
          alt="INDIGO ATELIER 2025"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-3xl text-center">
        <div className="space-y-6 animate-fade-in-up">
          <div className="inline-block px-6 py-2 border border-primary/50 rounded-full mb-4">
            <span className="font-inter text-sm tracking-wider text-accent">
              COMING SOON
            </span>
          </div>
          <h2 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold">
            INDIGO ATELIER
          </h2>
          <p className="font-playfair text-2xl md:text-3xl text-accent italic">
            December 2025
          </p>
          <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            A multi-sensory fashion x art experience.
          </p>
          <Button variant="premium" size="lg" className="mt-8 text-lg px-12 py-6 h-auto">
            Get Updates
          </Button>
        </div>
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-bright/20 rounded-full blur-3xl animate-glow-pulse" />
    </section>
  );
};
