import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiUrl() {
  return process.env.STRAPI_URL ?? "http://127.0.0.1:1337";
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiUrl()}${url}`
}

export function extractYouTubeId(urlOrId: string): string | null {
  // Regular expression for YouTube ID format
  const regExpId = /^[a-zA-Z0-9_-]{11}$/;

  // Check if the input is YouTubeId
  if (regExpId.test(urlOrId)) {
    return urlOrId;
  }

  // Regular expression for standart Youtube links
  const regExpStandard = /[?&]v=([a-zA-Z0-9_-]{11})/;

  // Regular expression for standart Youtube links
  const regExpShorts = /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/;

  // Regular expression for youtu.be short links
  const regExpShortLink = /youtu\.be\/([a-zA-Z0-9_-]{11})/;

  // Check for standard YouTube link
  const matchStandard = urlOrId.match(regExpStandard);
  if (matchStandard) {
    return matchStandard[1];
  }

  // Check for YouTube Shorts link
  const matchShorts  = urlOrId.match(regExpShorts);
  if (matchShorts ) {
    return matchShorts[1];
  }

  // Check for youtu.be short link
  const matchShortLink = urlOrId.match(regExpShortLink);
  if (matchShortLink) {
    return matchShortLink[1];
  }

  // Return null if results not found
  return null;
}