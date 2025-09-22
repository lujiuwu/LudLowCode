import z from 'zod'

export const RCSchema = z.object({
  key: z.string(),
  width: z.number(),
  height: z.number(),
  top: z.number(),
  left: z.number(),
  zIndex: z.number(),
  alignCenter: z.boolean(),
  props: z.record(z.string(), z.union([z.array(z.any()), z.record(z.string(), z.any()), z.undefined()])),
  model: z.record(z.string(), z.any()),
  text: z.string().optional(),
  resize: z.record(z.string(), z.union([z.boolean(), z.undefined()])).optional(),
  focus: z.boolean()
})

export type RenderComponent = z.infer<typeof RCSchema>