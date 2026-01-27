"use server";

import qs from "qs";
import { mutateData } from "../services/mutate-data";
import { revalidatePath } from "next/cache";

interface StrapiError {
    message?: string | null;
    name?: string;
    status?: string | null;
}

interface ProfileActionState {
    data: unknown | null;
    message: string | null;
    strapiErrors?: StrapiError | null;
}

export async function updateProfileAction(    
    userId: string,
    prevState: ProfileActionState,
    formData: FormData)
 : Promise<ProfileActionState> {
    const rawFormData = Object.fromEntries(formData);

    const query = qs.stringify({
        populate: "*",
    });

    const payload = {
      firstName: rawFormData.firstName,
      lastName: rawFormData.lastName,
      bio: rawFormData.bio,   
    };

    const responseData = await mutateData<{ error?: StrapiError }>(
        "PUT",
        `/api/users/${userId}?${query}`,
        payload
    );

    if (!responseData || typeof responseData !== "object") {
        return {
            ...prevState,
            strapiErrors: null,
            message: "Oops! Something went wrong. Please try again.",
        }
    }

    if ("error" in responseData && responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            message: "Failed to Update Profile",
        }
    }

    revalidatePath('/dashboard/account');

    return {
        ...prevState,
        message: "Profile Updated",
        data: responseData,
        strapiErrors: null,
    }

}
