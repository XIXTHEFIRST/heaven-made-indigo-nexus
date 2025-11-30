import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { BrandStory } from "@/components/BrandStory";
import { CollectionPreview } from "@/components/CollectionPreview";
import { IndigoAtelier } from "@/components/IndigoAtelier";
import { Lookbook } from "@/components/Lookbook";
import { EmailCapture } from "@/components/EmailCapture";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navigation />
      <Hero />
      <BrandStory />
      <CollectionPreview />
      <IndigoAtelier />
      <Lookbook />
      <EmailCapture />
      <Footer />
    </div>
  );
};

export default Index;
