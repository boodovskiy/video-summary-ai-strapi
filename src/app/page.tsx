import FeaturesSection from "@/components/custom/FeaturesSection";
import HeroSection from "@/components/custom/HeroSection";
import { getHompePageData } from "@/data/loaders";


export default async function Home() {
  const strapiData = await getHompePageData();
  const { blocks } = strapiData?.data || [];

  return <main>{blocks.map((block: any) => blockRenderer(block))}</main>;
}

function blockRenderer(block: any) {
  switch (block.__component) {
    case "layout.hero-section":
      return <HeroSection data={block} key={block.id} />
    case "layout.features-section":
      return <FeaturesSection data={block} key={block.id} />
  
    default:
      return null;
  }
}