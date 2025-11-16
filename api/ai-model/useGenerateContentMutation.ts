import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type GenerateContentRequest = {
  prompt: string;
};

type GenerateContentResponse = {
  text: string;
  success: boolean;
};

const useGenerateContentMutation = () => {
  const mutation = useMutation({
    mutationFn: async (
      data: GenerateContentRequest
    ): Promise<GenerateContentResponse> => {
      const response = await fetch("/api/ai-model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: data.prompt,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate content");
      }

      return response.json();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to generate content");
    },
  });

  return mutation;
};

export default useGenerateContentMutation;
