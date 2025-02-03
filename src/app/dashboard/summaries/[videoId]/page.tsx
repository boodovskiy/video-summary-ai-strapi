import { SummaryCardForm } from "@/components/forms/SummaryCardForm";
import { getSummaryById } from "@/data/loaders";

interface ParamsProps {
    params: {
        videoId: string;
    }
}

const SummaryCardRoute = async ({ params }: ParamsProps) => {
    const { videoId } = params;
    const data = await getSummaryById(videoId);
    
  return <SummaryCardForm item={data.data} />
}

export default SummaryCardRoute