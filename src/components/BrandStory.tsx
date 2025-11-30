import { motion } from "framer-motion";

export const BrandStory = () => {
  return (
    <section className="py-32 md:py-48 px-6 lg:px-12">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Statement */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="w-16 h-px bg-accent" />
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1]">
                Designed from
                <br />
                <span className="italic text-accent">the Soul</span>
              </h2>
            </div>
          </motion.div>

          {/* Right: Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <p className="font-sans text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              We design from the soul—where street culture, contemporary art, and
              futurism collide into something wholly original.
            </p>
            <p className="font-sans text-lg text-muted-foreground/80 leading-relaxed font-light">
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
