import { getStrapiUrl } from "@/lib/utils";
import qs from "qs";

const baseUrl = getStrapiUrl();

async function fetchData(url: string) {
 const authToken = null; // to do
 const headers = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
    },
 };

 try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return data;
 } catch (error) {
    console.error("Error fetching data", error);
    throw error;
 }
}

export async function getHompePageData() {
    const url = new URL("/api/home-page", baseUrl);

    url.search = qs.stringify({
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

    return await fetchData(url.href);
}

export async function getGlobalPageData() {
  const url = new URL("/api/global", baseUrl);

  url.search = qs.stringify({
    populate: [
      "header.logoText",
      "header.ctaButton",
      "footer.logoText",
      "footer.socialLink",
    ],
  })

  return await fetchData(url.href);
}