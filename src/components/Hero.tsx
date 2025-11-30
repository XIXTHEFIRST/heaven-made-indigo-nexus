import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroCross from "@/assets/hero-cross.jpg";

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative overflow-hidden">
      {/* Cross Image Section with Parallax */}
      <div className="relative h-[70vh] md:h-screen">
        <motion.img
          src={heroCross}
          alt="HEAVEN MADE cross symbol"
          className="w-full h-full object-cover"
          style={{ y }}
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="absolute inset-0 bg-gradient-glow animate-glow-pulse" />
      </div>

      {/* Content Section Below Image */}
      <motion.div
        style={{ opacity }}
        className="relative py-24 md:py-32 px-6 lg:px-12 bg-background"
      >
        <div className="container mx-auto text-center">
          <div className="max-w-5xl mx-auto space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-sans text-base md:text-lg lg:text-xl tracking-wide text-muted-foreground max-w-2xl mx-auto font-light"
            >
              A Lagos-bred fashion and art house shaping future culture through
              boundary-pushing design and narrative-driven collections.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="pt-6"
            >
              <Button
                variant="luxury"
                size="lg"
                className="font-sans text-xs tracking-[0.2em] uppercase px-16 py-7 h-auto group relative overflow-hidden"
              >
                <span className="relative z-10">Enter the Atelier</span>
                <motion.div
                  className="absolute inset-0 bg-ivory"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Minimal Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-silver/40 to-transparent" />
          <div className="w-1 h-1 rounded-full bg-silver/60" />
        </div>
      </motion.div>
    </section>
  );
};
