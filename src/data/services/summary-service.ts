"use server";

import { getStrapiUrl } from "@/lib/utils";
import { getAuthToken } from "./get-token";

export interface GeneratedSummary {
    documentId: string;
    summary: string;
    title: string;
    videoId: string;
}

interface SummaryServiceResponse {
    data: GeneratedSummary | null;
    error: string | null;
}

function extractSummary(result: unknown): GeneratedSummary | null {
    if (!result || typeof result !== "object") return null;

    const record = result as Record<string, unknown>;
    if (!record.data || typeof record.data !== "object") return null;

    const data = record.data as Record<string, unknown>;
    if (
        typeof data.documentId !== "string" ||
        typeof data.summary !== "string" ||
        typeof data.title !== "string" ||
        typeof data.videoId !== "string"
    ) return null;

    return {
        documentId: data.documentId,
        summary: data.summary,
        title: data.title,
        videoId: data.videoId,
    };
}

function extractErrorMessage(result: unknown): string | null {
    if (!result || typeof result !== "object") return null;

    const record = result as Record<string, unknown>;
    if (typeof record.error === "string") return record.error;

    if (record.error && typeof record.error === "object") {
        const nested = record.error as Record<string, unknown>;
        if (typeof nested.message === "string") return nested.message;
    }

    return null;
}

export async function generateSummaryService(
    videoId: string
): Promise<SummaryServiceResponse> {
    if (!videoId) {
        return { data: null, error: "Missing video id." };
    }

    const baseUrl = getStrapiUrl();
    const url = new URL("/api/summaries/generate", baseUrl);
    const authToken = await getAuthToken();
    if (!authToken) {
        return { data: null, error: "You are not authenticated." };
    }

    try {
        const response = await fetch(url.href, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ videoId }),
            cache: "no-store",
        });

        let result: unknown = null;
        try {
            result = await response.json();
        } catch {
            result = null;
        }

        const summary = extractSummary(result);
        const errorMessage = extractErrorMessage(result);

        if (!response.ok || errorMessage || !summary) {
            return {
                data: null,
                error: errorMessage ?? "Failed to generate summary.",
            };
        }

        return { data: summary, error: null };
    } catch (error) {
        console.log("Summary service error:", error);
        return { data: null, error: "Failed to generate summary." };
    }
}
