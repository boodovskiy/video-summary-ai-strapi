"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader, TrashIcon } from "lucide-react";

interface DeleteButtonProps {
    className?: string;
}

export function DeleteButton({ className }: Readonly<DeleteButtonProps>){
    const status = useFormStatus();

    return (
        <Button
            type="submit"
            aria-disabled={status.pending}
            disabled={status.pending}
            className={cn(className)}
        >
            {status.pending ? <Loader /> : <TrashIcon className="w-4 h-4" />}
        </Button>
    );
}