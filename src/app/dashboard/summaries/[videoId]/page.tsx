import { SummaryCardForm } from "@/components/forms/SummaryCardForm";
import { getSummaryById } from "@/data/loaders";

type PageProps = {
    params: Promise<{
      videoId: string;
    }>;
  };

export default async function SummaryCardRoute(props: PageProps) {
  const params = await props.params;
  const { videoId } = params;
  const data = await getSummaryById(videoId);

  return <SummaryCardForm item={data.data} />;
}