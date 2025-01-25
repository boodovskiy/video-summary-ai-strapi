"use server";

import { redirect } from "next/navigation";
import { getAuthToken } from "../services/get-token";
import { mutateData } from "../services/mutate-data";
import { title } from "process";
import { revalidatePath } from "next/cache";

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

    if (data.error) throw new Error(data.error.message);

    redirect("/dashboard/summaries/" + data.data.documentId);
}

export async function updateSummaryAction(prevState: any, formData: FormData) {
    const rawFormData = Object.fromEntries(formData);
    const id = rawFormData.id as string;

    const payload = {
        data: {
            title: rawFormData.title,
            summary: rawFormData.summary,
        }
    }

    const responseData = await mutateData("PUT", `/api/summaries/${id}`, payload);

    if (!responseData) {
        return {
            ...prevState,
            strapiErrors: null,
            message: 'Ooops! Something went wrong, please try again.',
        }
    }

    if (responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            message: 'Failed to update summary.',
        }
    }

    revalidatePath('/dashboard/summaries');

    return {
        ...prevState,
        message: 'Summary was updated',
        data: responseData,
        strapiErrors: null,
    }
}

export async function deleteSummaryAction(id: string, prevState: any) {
    const responseData = await mutateData('DELETE', `/api/summaries/${id}`);

    if (!responseData) {
        return {
            ...prevState,
            strapiErrors: null,
            message: 'Oops! Something went wrong, please try again.' ,
        }
    }

    redirect('/dashboard/summaries');
}