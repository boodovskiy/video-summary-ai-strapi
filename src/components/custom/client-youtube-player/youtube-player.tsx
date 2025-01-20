"use client";

import ReactPlayer from 'react-player/youtube';

interface YouTubePlayerProps {
    videoId: string;
}

function generateYouTubeUrl(videoId: string){
    const baseUrl = new URL("https://www.youtube.com/watch");
    baseUrl.searchParams.append("v", videoId);
    return baseUrl.href;
}

export default function YouTubePlayer({
    videoId,
}: Readonly<YouTubePlayerProps>){
    if (!videoId) return null;
    const videoUrl = generateYouTubeUrl(videoId);
 
    return (
        <div className="relative aspect-video rounded-md overflow-hidden">
            <ReactPlayer
                url={videoUrl}
                with="100%"
                height="100%"
                controls
                className="absolute top-0 left-0"
            />

        </div>
    );
}