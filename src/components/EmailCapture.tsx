import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const EmailCapture = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome to the Haven",
        description: "You'll receive exclusive updates and early access.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-32 md:py-48 px-6 lg:px-12 bg-charcoal-rich/30">
      <div className="container mx-auto max-w-3xl text-center">
        <div className="space-y-10 animate-fade-in">
          <div className="space-y-6">
            <div className="w-16 h-px bg-accent mx-auto" />
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light">
              Join the <span className="italic text-accent">Haven</span>
            </h2>
            <p className="font-sans text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-xl mx-auto">
              Exclusive drops, early access to collections, and curated culture
              diaries delivered to your inbox.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto animate-fade-in-up pt-6"
          >
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-14 bg-background/30 backdrop-blur-sm border-border/50 focus:border-accent text-foreground placeholder:text-muted-foreground/60 font-sans text-sm tracking-wide"
            />
            <Button
              type="submit"
              variant="luxury"
              className="font-sans text-xs tracking-[0.2em] uppercase px-12 h-14"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
