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
    <section id="shop" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Shop Collection</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our curated selection of premium pieces
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.node.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/product/${product.node.handle}`}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary/20 rounded-lg mb-4">
                    {product.node.images.edges[0]?.node && (
                      <motion.img
                        src={product.node.images.edges[0].node.url}
                        alt={product.node.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {product.node.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {product.node.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold">
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
                className="w-full mt-4"
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
