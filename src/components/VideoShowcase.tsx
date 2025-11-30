import { motion } from "framer-motion";
import { useState } from "react";

export const VideoShowcase = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source 
          src="https://cdn.pixabay.com/video/2023/08/22/176773-857932851_large.mp4" 
          type="video/mp4" 
        />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      {/* Animated Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-4 md:px-6 py-2 md:py-3 border border-white/30 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-white font-light">
                Limited Edition
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-6xl lg:text-8xl font-light tracking-tight text-white leading-tight">
              Crafted for
              <br />
              <span className="italic text-accent">The Bold</span>
            </h2>

            <p className="font-sans text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light px-4">
              Where Lagos energy meets global vision. Every piece tells a story
              of culture, creativity, and courage.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
        <div className="w-1 h-1 rounded-full bg-white/60" />
      </motion.div>
    </section>
  );
};