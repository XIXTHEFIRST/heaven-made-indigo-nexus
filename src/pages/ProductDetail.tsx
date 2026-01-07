import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { getProductByHandle } from "@/lib/shopify";
import { ArrowLeft, Loader2 } from "lucide-react";
import { ExperimentalNavigation } from "@/components/ExperimentalNavigation";
import { CartDrawer } from "@/components/CartDrawer";

export default function ProductDetail() {
  const { handle } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;

      try {
        const data = await getProductByHandle(handle);

        // Custom option modifications
        if (data) {
          const upperTitle = data.title.toUpperCase();

          if (upperTitle.includes("NOW & FOREVER")) {
            data.options = data.options.map((opt: any) => {
              if (opt.name === "Color") {
                return {
                  ...opt,
                  values: opt.values.filter((v: string) => v !== "Light Blue")
                };
              }
              return opt;
            });
          }

          if (upperTitle.includes("ARCADIA")) {
            data.options = data.options.map((opt: any) => {
              if (opt.name === "Color" && !opt.values.includes("White")) {
                return {
                  ...opt,
                  values: [...opt.values, "White"]
                };
              }
              return opt;
            });
          }
        }

        setProduct(data);

        if (data?.variants?.edges?.[0]) {
          const firstVariant = data.variants.edges[0].node;
          setSelectedVariant(firstVariant);

          const initialOptions: Record<string, string> = {};
          firstVariant.selectedOptions.forEach((option: any) => {
            initialOptions[option.name] = option.value;
          });
          setSelectedOptions(initialOptions);
        }
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);

    const variant = product.variants.edges.find((edge: any) => {
      return edge.node.selectedOptions.every((option: any) =>
        newOptions[option.name] === option.value
      );
    });

    if (variant) {
      setSelectedVariant(variant.node);
    }
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ExperimentalNavigation />

      <div className="fixed top-6 right-6 z-40 flex gap-2">
        <CartDrawer />
      </div>

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-lg bg-secondary/20">
                {product.images.edges[0]?.node && (
                  <img
                    src={product.images.edges[0].node.url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.images.edges.slice(1, 5).map((image: any, index: number) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-md bg-secondary/20">
                    <img
                      src={image.node.url}
                      alt={`${product.title} ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.title}</h1>
                <p className="text-3xl font-bold text-primary">
                  {selectedVariant?.price.currencyCode}{' '}
                  {parseFloat(selectedVariant?.price.amount || 0).toFixed(2)}
                </p>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>

              {product.options.map((option: any) => (
                <div key={option.name} className="space-y-3">
                  <label className="text-sm font-semibold uppercase tracking-wider">
                    {option.name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value: string) => (
                      <Button
                        key={value}
                        variant={selectedOptions[option.name] === value ? "default" : "outline"}
                        onClick={() => handleOptionChange(option.name, value)}
                        className="min-w-[60px]"
                      >
                        {value}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}

              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full"
                disabled={!selectedVariant?.availableForSale}
              >
                {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
              </Button>

              <div className="border-t pt-6 space-y-4 text-sm text-muted-foreground">
                <p>Free shipping on orders over ₦200,000</p>
                <p>Secure checkout with Shopify</p>
                <p>Easy returns within 30 days</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
