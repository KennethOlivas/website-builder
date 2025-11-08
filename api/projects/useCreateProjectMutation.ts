import {
  createProjectResponseSchema,
  createProjectResponseSchemaType,
} from "@/schema/createProjectSchema";
import { PromptSchemaType } from "@/schema/promptSchema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateProjectMutation = () => {
  const mutation = useMutation({
    mutationFn: async (
      data: PromptSchemaType
    ): Promise<createProjectResponseSchemaType> => {
      const messages = [
        {
          role: "user",
          content: data.prompt,
        },
      ];

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
        }),
      });

      return createProjectResponseSchema.parseAsync(await response.json());
    },
    onSuccess: () => {
      toast.success("Project created successfully!");
    }
  });

  return mutation;
};

export default useCreateProjectMutation;
