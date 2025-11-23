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
    <section className="py-24 md:py-32 px-4 bg-charcoal/50">
      <div className="container mx-auto">
        <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-16 text-center animate-fade-in">
          Featured Collection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-lg animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    hoveredId === product.id ? "scale-110" : "scale-100"
                  }`}
                />
              </div>
              {hoveredId === product.id && (
                <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
              )}
              <div className="mt-4 space-y-2">
                <h3 className="font-playfair text-2xl font-bold">{product.name}</h3>
                <p className="font-inter text-sm text-muted-foreground">
                  {product.fabric} • {product.silhouette}
                </p>
                <p className="font-inter text-lg text-accent">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
