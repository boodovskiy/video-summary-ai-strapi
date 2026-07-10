"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { cn, extractYouTubeId } from "@/lib/utils";
import { SubmitButton } from "../custom/SubmitButton";
import { generateSummaryService } from "@/data/services/summary-service";

interface StrapiErrorsProps {
  message: string | null;
  name: string;
}

const INITIAL_STATE = {
  message: null,
  name: "",
};

export function SummaryForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StrapiErrorsProps>(INITIAL_STATE);
  const [value, setValue] = useState<string>("");

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const videoId = formData.get("videoId") as string;

    const processedVideoId = extractYouTubeId(videoId);

    if (!processedVideoId) {
      toast.error("Invalid Youtube Video ID");
      setLoading(false);
      setValue("");
      setError({
        ...INITIAL_STATE,
        message: "Invalid Youtube Video ID",
        name: "Invalid Id",
      });
      return;
    }

    toast.success("Generating Summary");

    try {
      const summaryResponseData = await generateSummaryService(processedVideoId);
      if (summaryResponseData.error || !summaryResponseData.data) {
        const message = summaryResponseData.error ?? "Failed to generate summary.";
        setValue("");
        toast.error(message);
        setError({ message, name: "Summary Error" });
        return;
      }

      toast.success("Summary created");
      setValue("");
      setError(INITIAL_STATE);
      router.push(`/dashboard/summaries/${summaryResponseData.data.documentId}`);
      router.refresh();
    } catch (error) {
      let errorMessage =
        "An unexpected error occurred while creating the summary";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast.error(errorMessage);
      setError({
        message: errorMessage,
        name: "Summary Error",
      });
    } finally {
      setLoading(false);
    }
  }

  function clearError() {
    setError(INITIAL_STATE);
    if (error.message) setValue("");
  }

  const errorStyles = error.message
    ? "outline-1 outline outline-red-500 placeholder:text-red-700"
    : "";

  return (
    <div className="w-full max-w-[960px]">
      <form
        onSubmit={handleFormSubmit}
        className="flex gap-2 items-center justify-center"
      >
        <Input
          name="videoId"
          placeholder={
            error.message ? error.message : "Youtube Video ID or URL"
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onMouseDown={clearError}
          className={cn(
            "w-full focus:text-black focus-visible:ring-pink-500",
            errorStyles
          )}
          required
        />

        <SubmitButton
          text="Create Summary"
          loadingText="Creating Summary"
          loading={loading}
        />
      </form>
    </div>
  );
}
