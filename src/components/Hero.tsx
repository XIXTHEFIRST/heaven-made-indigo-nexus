import { Button } from "@/components/ui/button";
import heroCross from "@/assets/hero-cross.jpg";

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Premium Vignette */}
      <div className="absolute inset-0">
        <img
          src={heroCross}
          alt="HEAVEN MADE cross symbol"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="absolute inset-0 bg-gradient-glow animate-glow-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
          <p className="font-sans text-base md:text-lg lg:text-xl tracking-wide text-silver/90 max-w-2xl mx-auto font-light">
            A Lagos-bred fashion and art house shaping future culture through
            boundary-pushing design and narrative-driven collections.
          </p>
          <div className="pt-6">
            <Button
              variant="luxury"
              size="lg"
              className="font-sans text-xs tracking-[0.2em] uppercase px-16 py-7 h-auto"
            >
              Enter the Atelier
            </Button>
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-silver/40 to-transparent" />
          <div className="w-1 h-1 rounded-full bg-silver/60" />
        </div>
      </div>
    </section>
  );
};
