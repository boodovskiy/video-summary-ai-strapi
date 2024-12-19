import FeaturesSection from "@/components/custom/FeaturesSection";
import HeroSection from "@/components/custom/HeroSection";
import { getStrapiUrl } from "@/lib/utils";
import qs from "qs";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on:{
        "layout.hero-section": {
            populate: {
              image: {
                fields: ["url", "alternativeText"]
              },
              link: {
                populate: true
              },
            }
          },
          "layout.features-section": {
            populate: {
              feature: {
                populate: true
              },
            }
          },
      }
    }
  },
});


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

  const { title, description, blocks } = strapiData.data;

  return (
    <main>
      <HeroSection data={blocks[0]}/>
      <FeaturesSection />
    </main>
  );
}
