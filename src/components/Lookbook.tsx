import { useRef } from "react";
import arcadiaBlack2 from "@/assets/arcadia-black-2.jpg";
import arcadiaGreen2 from "@/assets/arcadia-green-2.jpg";
import arcadiaDuo from "@/assets/arcadia-duo.jpg";

const lookbookImages = [
  { id: 1, src: arcadiaBlack2, alt: "ARCADIA Black Tee - Lagos Streets" },
  { id: 2, src: arcadiaGreen2, alt: "ARCADIA Green Tee - Urban Culture" },
  { id: 3, src: arcadiaDuo, alt: "ARCADIA Collection - Street Luxury" },
];

export const Lookbook = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 md:py-32 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
          Lookbook
        </h2>
        <p className="font-inter text-lg text-muted-foreground mb-12 animate-fade-in">
          Visual stories from Lagos, shot in motion.
        </p>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {lookbookImages.map((image, index) => (
            <div
              key={image.id}
              className="flex-none w-[85vw] md:w-[600px] snap-start animate-slide-in-right"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-lg group">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
