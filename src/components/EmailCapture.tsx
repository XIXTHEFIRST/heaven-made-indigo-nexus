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
    <section className="py-24 md:py-32 px-4 bg-charcoal/50">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-6 animate-fade-in">
          Join the Haven
        </h2>
        <p className="font-inter text-lg text-muted-foreground mb-12 animate-fade-in">
          Exclusive drops, early access, and culture diaries.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 max-w-md mx-auto animate-fade-in-up"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-background/50 backdrop-blur-sm border-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground"
          />
          <Button type="submit" variant="premium" size="lg">
            Sign Up
          </Button>
        </form>
      </div>
    </section>
  );
};
