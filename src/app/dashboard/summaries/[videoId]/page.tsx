import { SummaryCardForm } from "@/components/forms/SummaryCardForm";
import { getSummaryById } from "@/data/loaders";

type PageProps = {
    params: {
      videoId: string;
    };
  };

export default async function SummaryCardRoute({ params }: PageProps) {
    const { videoId } = params;
    const data = await getSummaryById(videoId);
  
    return <SummaryCardForm item={data.data} />;
  }