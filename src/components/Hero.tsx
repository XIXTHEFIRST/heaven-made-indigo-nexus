import { Button } from "@/components/ui/button";
import heroCross from "@/assets/hero-cross.jpg";
import logoMain from "@/assets/logo-main.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Vignette */}
      <div className="absolute inset-0">
        <img
          src={heroCross}
          alt="HEAVEN MADE cross symbol"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-glow animate-glow-pulse opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in-up">
        <div className="mb-12 flex justify-center">
          <img 
            src={logoMain} 
            alt="HEAVEN MADE" 
            className="w-[70vw] md:w-[50vw] lg:w-[40vw] max-w-3xl h-auto animate-fade-in drop-shadow-2xl"
          />
        </div>
        <p className="font-playfair text-xl md:text-3xl lg:text-4xl mb-3 text-foreground/90 italic">
          Fashion in Motion, Culture in Splash
        </p>
        <p className="font-inter text-base md:text-lg mb-12 text-muted-foreground max-w-2xl mx-auto">
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
