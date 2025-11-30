import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import arcadiaDuo from "@/assets/arcadia-duo.jpg";
import arcadiaGreen1 from "@/assets/arcadia-green-1.jpg";
import arcadiaGreen2 from "@/assets/arcadia-green-2.jpg";
import arcadiaBlack1 from "@/assets/arcadia-black-1.jpg";
import arcadiaBlack2 from "@/assets/arcadia-black-2.jpg";

const collections = [
  {
    id: 1,
    image: arcadiaDuo,
    title: "ARCADIA DUO",
    position: "top-0 left-0 w-1/2 h-[70vh]",
    delay: 0,
  },
  {
    id: 2,
    image: arcadiaGreen1,
    title: "GREEN FUTURE",
    position: "top-0 right-0 w-1/3 h-[50vh]",
    delay: 0.1,
  },
  {
    id: 3,
    image: arcadiaBlack1,
    title: "BLACK LUXE",
    position: "top-[45vh] right-0 w-1/2 h-[60vh]",
    delay: 0.2,
  },
  {
    id: 4,
    image: arcadiaGreen2,
    title: "EMERALD WAVE",
    position: "bottom-0 left-0 w-2/5 h-[55vh]",
    delay: 0.3,
  },
  {
    id: 5,
    image: arcadiaBlack2,
    title: "NOIR ESSENCE",
    position: "bottom-0 right-1/4 w-1/3 h-[45vh]",
    delay: 0.4,
  },
];

export const ExperimentalCollectionPreview = () => {
  return (
    <section id="collections" className="relative min-h-screen py-32 px-6 lg:px-12 overflow-hidden bg-background">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto max-w-6xl mb-20"
      >
        <h2 className="font-serif text-5xl md:text-7xl text-foreground mb-6">
          Arcadia Collection
        </h2>
        <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-2xl font-light">
          An exploration of form and function. Where sustainability meets
          avant-garde design in our most ambitious collection yet.
        </p>
      </motion.div>

      {/* Asymmetric Grid */}
      <div className="relative h-[120vh] max-w-7xl mx-auto">
        {collections.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: item.delay,
              duration: 0.8,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            className={`absolute ${item.position} overflow-hidden group cursor-pointer`}
          >
            <motion.img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-8 left-8 right-8"
            >
              <h3 className="font-serif text-2xl md:text-4xl text-ivory">
                {item.title}
              </h3>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="container mx-auto max-w-6xl mt-32 text-center"
      >
        <Button
          variant="luxury"
          size="lg"
          className="font-sans text-xs tracking-[0.2em] uppercase px-16 py-7 h-auto"
        >
          Explore Collection
        </Button>
      </motion.div>

      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-orange-vibrant/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};
