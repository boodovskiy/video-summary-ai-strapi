'use client';

import { cn } from "@/lib/utils";
import ImagePicker from "../custom/ImagePicker";
import { SubmitButton } from "../custom/SubmitButton";

interface ProfileImageFormProps {
    id: string;
    url: string;
    alternativeText: string;
}

const initialState = {
    message: null,
    data: null,
    strapiErrors: null,
    zodErrors: null,
}

export function ProfileImageForm({
    data,
    className,
}:{
    data: Readonly<ProfileImageFormProps>;
    className?: string;
}){

    return (
        <form className={cn("space-y-4", className)}>
            <div>
                <ImagePicker 
                    id="image"
                    name="image"
                    label="Profile Image"
                    defaultValue={data?.url || ""}
                />
            </div>
            <div className="flex justify-end">
                <SubmitButton text="Update Image" loadingText="Saving Image"/>
            </div>
        </form>
    );
}