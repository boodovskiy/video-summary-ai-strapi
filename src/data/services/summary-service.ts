import { getStrapiUrl } from "@/lib/utils";

interface SummaryServiceResponse {
    data: string;
    error: string | null;
}

function extractSummary(result: unknown): string {
    if (!result || typeof result !== "object") return "";

    const record = result as Record<string, unknown>;
    if (typeof record.data === "string") return record.data;
    if (typeof record.summary === "string") return record.summary;

    if (record.data && typeof record.data === "object") {
        const nested = record.data as Record<string, unknown>;
        if (typeof nested.summary === "string") return nested.summary;
    }

    return "";
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
        return { data: "", error: "Missing video id." };
    }

    const baseUrl = getStrapiUrl();
    const url = new URL("/api/summaries/generate", baseUrl);

    try {
        const response = await fetch(url.href, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ videoId }),
            cache: "no-cache",
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
                data: "",
                error: errorMessage ?? "Failed to generate summary.",
            };
        }

        return { data: summary, error: null };
    } catch (error) {
        console.log("Summary service error:", error);
        return { data: "", error: "Failed to generate summary." };
    }
}
