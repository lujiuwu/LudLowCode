import z from 'zod'

export const ContainerSchema = z.object({
  width: z.number(),
  height: z.number(),
  bgColor: z.string()
})

export type Container = z.infer<typeof ContainerSchema>