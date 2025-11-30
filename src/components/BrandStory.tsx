import { motion } from "framer-motion";

export const BrandStory = () => {
  return (
    <section className="relative py-20 md:py-32 lg:py-48 px-4 md:px-6 lg:px-12 overflow-hidden">
      {/* Video Background Section - Desktop Only */}
      <div className="absolute inset-0 hidden lg:block">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-10"
        >
          <source src="https://cdn.pixabay.com/video/2023/07/25/173159-849564206_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
          {/* Left: Statement */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="space-y-3 md:space-y-4">
              <div className="w-12 md:w-16 h-px bg-accent" />
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1]">
                Designed from
                <br />
                <span className="italic text-accent">the Soul</span>
              </h2>
            </div>
          </motion.div>

          {/* Right: Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            <p className="font-sans text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light">
              We design from the soul—where street culture, contemporary art, and
              futurism collide into something wholly original.
            </p>
            <p className="font-sans text-base md:text-lg text-muted-foreground/80 leading-relaxed font-light">
              Each piece carries intention, personality, and narrative depth. This
              isn&apos;t just fashion; it&apos;s a cultural statement born from Lagos and
              spoken to the world.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
