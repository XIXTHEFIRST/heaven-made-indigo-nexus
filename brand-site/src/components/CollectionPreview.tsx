import { useState } from "react";
import arcadiaBlack from "@/assets/arcadia-black-1.jpg";
import arcadiaGreen from "@/assets/arcadia-green-1.jpg";
import arcadiaDuo from "@/assets/arcadia-duo.jpg";

const products = [
  {
    id: 1,
    name: "ARCADIA Tee",
    fabric: "Premium Cotton",
    silhouette: "Oversized",
    price: "₦35,000",
    image: arcadiaBlack,
  },
  {
    id: 2,
    name: "ARCADIA Tee",
    fabric: "Premium Cotton",
    silhouette: "Oversized",
    price: "₦35,000",
    image: arcadiaGreen,
  },
  {
    id: 3,
    name: "ARCADIA Collection",
    fabric: "Premium Cotton",
    silhouette: "Unisex Fit",
    price: "₦35,000",
    image: arcadiaDuo,
  },
];

export const CollectionPreview = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="collections" className="py-32 md:py-48 px-6 lg:px-12 bg-charcoal-rich/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-20 max-w-3xl animate-fade-in">
          <div className="w-16 h-px bg-accent mb-6" />
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light mb-6">
            Featured Collection
          </h2>
          <p className="font-sans text-lg text-muted-foreground font-light tracking-wide">
            ARCADIA — Where urban energy meets timeless design
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    hoveredId === product.id ? "scale-105" : "scale-100"
                  }`}
                />
                {hoveredId === product.id && (
                  <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <h3 className="font-serif text-3xl font-light tracking-tight">
                  {product.name}
                </h3>
                <p className="font-sans text-sm tracking-wider uppercase text-muted-foreground">
                  {product.fabric} • {product.silhouette}
                </p>
                <p className="font-sans text-xl text-accent font-light">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
