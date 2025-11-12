import z from "zod";

const getProjectFrameDetailsSchema = z.object({
  id: z.uuid(),
  frameId: z.uuid(),
  projectId: z.uuid(),
  createdOn: z.iso.datetime(),
  designCore: z.unknown().nullable().optional(),
  chatMessages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string(),
      })
    )
    .optional(),
});

type getProjectFrameDetailsSchemaType = z.infer<
  typeof getProjectFrameDetailsSchema
>;

export { getProjectFrameDetailsSchema };
export type { getProjectFrameDetailsSchemaType };
