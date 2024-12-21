import { getStrapiUrl } from "@/lib/utils";
import FeaturesSection from "@/components/custom/FeaturesSection";
import HeroSection from "@/components/custom/HeroSection";
import qs from "qs";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            link: {
              populate: true,
            },
          },
        },
        "layout.features-section": {
          populate: {
            features: {
              populate: true,
            },
          },
        },
      },
    },
  },
});

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


async function getStrapiData(path: string) {
  const baseUrl = getStrapiUrl();

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  console.log(url.href);

  try {
    const response = await fetch(url.href, { cache: "no-store" });
    
    const data = await response.json();
    console.dir(data, { depth: null });
    return data;

  } catch (error) {
    console.error(error)
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");

  const { blocks } = strapiData.data;

  if (!blocks) return <div>No blocks found</div>;

  return (
    <main>
      {blocks.map((block: any) => blockRenderer(block))}
    </main>
  );
}
