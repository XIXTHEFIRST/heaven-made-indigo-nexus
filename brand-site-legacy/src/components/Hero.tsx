import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import heroCross from "@/assets/hero-cross.jpg";
import heroVideo from "@/assets/hero-video.mov";

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden">
      {/* Video Background with Fallback */}
      <div className="relative h-[100vh] md:h-screen">
        {/* Fallback Image - shown until video loads or on slow connections */}
        <motion.img
          src={heroCross}
          alt="HEAVEN MADE cross symbol"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ y }}
        />
        
        {/* Video Background - hidden on mobile for performance */}
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
          style={{ scale }}
          poster={heroCross}
        >
          <source src={heroVideo} type="video/quicktime" />
        </motion.video>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="absolute inset-0 bg-gradient-glow animate-glow-pulse" />
        
        {/* Mobile-optimized Content Overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center px-4 md:px-6"
        >
          <div className="text-center max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
            >
              HEAVEN MADE
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="font-sans text-sm md:text-base lg:text-lg tracking-wide text-white/90 max-w-2xl mx-auto font-light mb-8"
            >
              A Lagos-bred fashion and art house shaping future culture through
              boundary-pushing design
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <Button
                variant="luxury"
                size="lg"
                className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase px-8 md:px-16 py-6 md:py-7 h-auto group relative overflow-hidden touch-manipulation"
              >
                <span className="relative z-10">Enter the Atelier</span>
                <motion.div
                  className="absolute inset-0 bg-ivory"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  whileTap={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>


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
