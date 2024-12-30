"use server";

import { z } from "zod";
import { registerUserService } from "../services/auth-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const config = {
    path: "/",
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
};

const schemaRegister = z.object({
    username: z.string().min(3).max(20, {
        message: "Username must be between 3 and 20 characters",
    }),
    password: z.string().min(6).max(100, {
        message: "Password must be between 6 and 100 characters",
    }),
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
});

export async function registerUserAction(prevState: any, formData: FormData) {
    const validatedFields = schemaRegister.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
        email: formData.get('email'),
    });

    if (!validatedFields.success) {
        return {
            ...prevState,
            zodErrors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Register",
        }
    }

    const responseData = await registerUserService(validatedFields.data);

    if (responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            zodErrors: null,
            message: "Failed to Register.",
        }
    }
    
    (await cookies()).set("jwt", responseData.jwt, config);
    redirect("/dashboard");
}