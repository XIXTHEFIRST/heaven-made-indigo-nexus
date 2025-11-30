import { CustomCursor } from "@/components/CustomCursor";
import { ExperimentalNavigation } from "@/components/ExperimentalNavigation";
import { Hero } from "@/components/Hero";
import { BrandStory } from "@/components/BrandStory";
import { Products } from "@/components/Products";
import { ExperimentalCollectionPreview } from "@/components/ExperimentalCollectionPreview";
import { IndigoAtelier } from "@/components/IndigoAtelier";
import { Lookbook } from "@/components/Lookbook";
import { EmailCapture } from "@/components/EmailCapture";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen font-sans cursor-none">
      <CustomCursor />
      <ExperimentalNavigation />
      <Hero />
      <BrandStory />
      <Products />
      <ExperimentalCollectionPreview />
      <IndigoAtelier />
      <Lookbook />
      <EmailCapture />
      <Footer />
    </div>
  );
};

export default Index;
