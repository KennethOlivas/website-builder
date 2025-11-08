import z from "zod";

const promptSchema = z.object({
  prompt: z.string().min(10).max(500).nonempty(),
});

type PromptSchemaType = z.infer<typeof promptSchema>;

export { promptSchema };
export type { PromptSchemaType };
