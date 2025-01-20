import ClientYoutubePlayer from "@/components/custom/client-youtube-player";
import { getSummaryById } from "@/data/loaders";
import { extractYouTubeId } from "@/lib/utils";

const SummarySingleRoute = async ({
    params,
    children,
}: {
    readonly params: any;
    readonly children: React.ReactNode;
})  => {
    const { videoId } = await params;
    const data = await getSummaryById(videoId);
    if (data?.error?.status === 404) return <p>No items found!</p>;
    const videoYTId = extractYouTubeId(data.data.videoId);

  return (
    <div>
        <div className="h-full grid gap-4 grid-cols-5 p-4">
            <div className="col-span-3">{children}</div>
            <div className="col-span-2">
                <div>
                    <ClientYoutubePlayer videoId={videoYTId as string}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SummarySingleRoute