import { SummaryCardForm } from "@/components/forms/SummaryCardForm";
import { getSummaryById } from "@/data/loaders";

interface PraramsProps {
    params: {
        videoId: string;
    }
}

const SummaryCardRoute = async (props: Readonly<PraramsProps>) => {
    const params = await props?.params;
    const {videoId} = params;
    const data = await getSummaryById(videoId);
  return <SummaryCardForm item={data.data} />
}

export default SummaryCardRoute