import { getStrapiUrl } from "@/lib/utils";
import { getAuthToken } from "./get-token";

export async function mutateData(method : string, path: string, payload?: any) {
    const baseURL = getStrapiUrl();
    const authToken = await getAuthToken();
    const url = new URL(path, baseURL);

    if (!authToken) throw new Error("No auth token found");
    
    try {
        const response = await  fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({...payload}),
        });

        if (method === 'DELETE') return response.ok;

        const data = await response?.json();
        return data;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}