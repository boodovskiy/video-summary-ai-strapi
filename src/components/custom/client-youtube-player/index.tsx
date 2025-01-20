"use client";

import dynamic from "next/dynamic";

const YouTubePlayer = dynamic(
    () => import("@/components/custom/client-youtube-player/youtube-player"),
    { ssr: false }
);

export default function ClientYoutubePlayer({ videoId }: { videoId: string }){
    return <YouTubePlayer videoId={videoId}/>
}