import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Vignette */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="HEAVEN MADE fashion aesthetic"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-glow animate-glow-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in-up">
        <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
          HEAVEN MADE
        </h1>
        <p className="font-playfair text-2xl md:text-4xl lg:text-5xl mb-4 text-foreground/90 italic">
          Fashion in Motion, Culture in Splash
        </p>
        <p className="font-inter text-lg md:text-xl mb-12 text-muted-foreground max-w-2xl mx-auto">
          A Lagos-bred fashion and art house shaping future culture.
        </p>
        <Button variant="hero" size="lg" className="text-lg px-12 py-6 h-auto">
          Enter Indigo
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};
