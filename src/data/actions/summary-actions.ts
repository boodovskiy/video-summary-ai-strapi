"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAuthToken } from "../services/get-token";
import { mutateData } from "../services/mutate-data";

interface StrapiError {
    message?: string | null;
    name?: string;
    status?: string | null;
}

interface SummaryActionState {
    data: unknown | null;
    message: string | null;
    strapiErrors: StrapiError | null;
}

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

    const data = await mutateData<{ data?: { documentId?: string } }>(
        "POST",
        "/api/summaries",
        payload
    );

    if (!data || typeof data !== "object" || !data.data?.documentId) {
        throw new Error("Summary creation failed.");
    }

    redirect("/dashboard/summaries/" + data.data.documentId);
}

export async function updateSummaryAction(
    prevState: SummaryActionState,
    formData: FormData
): Promise<SummaryActionState> {
    const authToken = await getAuthToken();
    if (!authToken) throw new Error("No auth token found.");

    const id = formData.get("id");
    if (!id || typeof id !== "string") {
        return {
            ...prevState,
            message: "Missing summary id.",
            strapiErrors: null,
        };
    }

    const title = formData.get("title");
    const summary = formData.get("summary");

    const payload = {
        data: {
            title: typeof title === "string" ? title : "",
            summary: typeof summary === "string" ? summary : "",
        },
    };

    const responseData = await mutateData<{ error?: StrapiError }>(
        "PUT",
        `/api/summaries/${id}`,
        payload
    );

    if (!responseData || typeof responseData !== "object") {
        return {
            ...prevState,
            strapiErrors: null,
            message: "Oops! Something went wrong. Please try again.",
        };
    }

    if ("error" in responseData && responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            message: "Failed to update summary.",
        };
    }

    revalidatePath("/dashboard/summaries");
    revalidatePath(`/dashboard/summaries/${id}`);

    return {
        ...prevState,
        data: responseData,
        message: "Summary updated.",
        strapiErrors: null,
    };
}

export async function deleteSummaryAction(
    documentId: string,
    prevState: SummaryActionState
): Promise<SummaryActionState> {
    const authToken = await getAuthToken();
    if (!authToken) throw new Error("No auth token found.");

    const responseOk = await mutateData<boolean>(
        "DELETE",
        `/api/summaries/${documentId}`
    );

    if (!responseOk) {
        return {
            ...prevState,
            strapiErrors: null,
            message: "Failed to delete summary.",
        };
    }

    revalidatePath("/dashboard/summaries");
    redirect("/dashboard/summaries");
}
