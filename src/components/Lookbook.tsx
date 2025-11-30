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
    <section id="lookbook" className="py-32 md:py-48 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 max-w-3xl animate-fade-in">
          <div className="w-16 h-px bg-accent mb-6" />
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light mb-4">
            Lookbook
          </h2>
          <p className="font-sans text-lg text-muted-foreground font-light tracking-wide">
            Visual stories from Lagos streets, captured in motion
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 lg:gap-12 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-6 lg:-mx-12 px-6 lg:px-12"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {lookbookImages.map((image, index) => (
            <div
              key={image.id}
              className="flex-none w-[85vw] md:w-[600px] lg:w-[700px] snap-start animate-slide-in-right"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="aspect-[3/4] overflow-hidden group relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
