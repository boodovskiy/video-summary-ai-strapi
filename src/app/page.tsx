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
              }
            }
          }
      }
    }
  },
});


async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337"

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  console.log(url.href);

  try {
    const response = await fetch(url.href);
    const data = await response.json();
    console.dir(data, { depth: null });
    return data;

  } catch (error) {
    console.error(error)
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");

  const { title, description } = strapiData.data;

  return (
    <main className="container mx-auto py-6">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-xl mt-4">{description}</p>
    </main>
  );
}
