import z from "zod";

const createProjectResponseSchema = z.object({
  chatResult: z.object({
    id: z.string(),
    chatMessages: z.array(z.any()),
    createdBy: z.string(),
    createdOn: z.string(),
  }),
  frameResult: z.object({
    id: z.string(),
    frameId: z.string().nullable(),
    projectId: z.string().nullable(),
    createdOn: z.string(),
  }),
  projectResult: z.object({
    id: z.string(),
    projectId: z.string().nullable(),
    createdBy: z.string(),
    createdOn: z.string(),
  }),
});

type createProjectResponseSchemaType = z.infer<typeof createProjectResponseSchema>;

export { createProjectResponseSchema };
export type { createProjectResponseSchemaType };