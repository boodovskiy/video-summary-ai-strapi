"use server";

import { redirect } from "next/navigation";
import { getAuthToken } from "../services/get-token";
import { mutateData } from "../services/mutate-data";

interface Payload {
    data: {
        title?: string;
        videoId: string;
        summary: string;
    }
}

export async function createSummaryAction(payload: Payload) {
    const authToken = await getAuthToken();
    if (!authToken) throw new Error("No auth token found.");

    const data = await mutateData("POST", "/api/summaries", payload);
    redirect("/dashboard/summaries/" + data.data.documentId);
}