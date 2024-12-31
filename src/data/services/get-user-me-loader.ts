import { getStrapiUrl } from "@/lib/utils";
import qs from "qs";
import { getAuthToken } from "./get-token";

const query = qs.stringify({
    populate: { image: { fields: ["url", "alternativeText"] } },
});

export async function getUserMeLoader(){
    const baseUrl = getStrapiUrl();

    const url = new URL("/api/user/me", baseUrl);
    url.search = query;

    const authToken = await getAuthToken();
    if (!authToken) return { ok: false, data: null, error: null };

    try {
        const response = await fetch(url.href, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            cache: "no-cache",
        });
        const data = await response.json();
        if (data.error) return { ok: false, data: null, error: data.error };
        return { ok: true, data: data, error: null }
    } catch (error) {
        console.log(error);
        return { ok: false, data: null, error: error }
    }
}