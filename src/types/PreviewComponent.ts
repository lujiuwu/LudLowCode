import z from 'zod'

export const PVSchema = z.object({
  label: z.string(),
  key: z.string(),
  type: z.string(),
  preview: z.function(),
  render: z.function(),
  props: z.record(z.string(), z.union([z.array(z.any()), z.record(z.string(), z.any()), z.undefined()])).optional(),
  model: z.record(z.string(), z.any()).optional(),
  text: z.string().optional(),
  resize: z.record(z.string(), z.union([z.boolean(), z.undefined()])).optional()
})

export type PreviewComponent = z.infer<typeof PVSchema>
