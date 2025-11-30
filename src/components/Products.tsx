import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCartStore, type ShopifyProduct } from "@/stores/cartStore";
import { getProducts } from "@/lib/shopify";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

export const Products = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0].node;
    addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });
  };

  if (isLoading) {
    return (
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Shop Collection</h2>
          <p className="text-muted-foreground text-lg mb-8">
            No products found. Create your first product by telling me what you'd like to sell and the price.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="shop" className="py-12 md:py-20 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Shop Collection</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
            Discover our curated selection of premium pieces
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.node.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="animate-fade-in"
            >
              <Link to={`/product/${product.node.handle}`}>
                <div className="group cursor-pointer touch-manipulation">
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary/20 rounded-lg mb-3 md:mb-4">
                    {product.node.images.edges[0]?.node && (
                      <motion.img
                        src={product.node.images.edges[0].node.url}
                        alt={product.node.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 group-active:bg-black/30 transition-colors duration-300" />
                  </div>
                  
                  <div className="space-y-1 md:space-y-2">
                    <h3 className="font-semibold text-sm md:text-base lg:text-lg group-hover:text-primary transition-colors line-clamp-1">
                      {product.node.title}
                    </h3>
                    <p className="text-muted-foreground text-xs md:text-sm line-clamp-2 hidden md:block">
                      {product.node.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-base md:text-lg lg:text-xl font-bold">
                        {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                        {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(product);
                }}
                className="w-full mt-3 md:mt-4 text-xs md:text-sm touch-manipulation"
                variant="outline"
              >
                Add to Cart
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
