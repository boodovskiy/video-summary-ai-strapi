"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface DeleteButtonProps {
    text?: string;
    loadingText?: string;
    className?: string;
}

export function DeleteButton({
    text = "Delete Summary",
    loadingText = "Deleting Summary",
    className,
}: Readonly<DeleteButtonProps>) {
    const status = useFormStatus();

    return (
        <Button
            type="submit"
            aria-disabled={status.pending}
            disabled={status.pending}
            className={cn("text-white", className)}
        >
            {status.pending ? (
                <span className="inline-flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {loadingText}
                </span>
            ) : (
                text
            )}
        </Button>
    );
}
