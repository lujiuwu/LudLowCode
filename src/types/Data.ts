import z from 'zod'
import { ContainerSchema } from './Container'
import { RCSchema } from './RenderComponent'

export const DataSchema = z.object({
  container: ContainerSchema,
  blocks: z.array(RCSchema)
})

export type Data = z.infer<typeof DataSchema>