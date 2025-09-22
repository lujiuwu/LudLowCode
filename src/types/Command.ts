import z from 'zod'
import { RCSchema } from './RenderComponent'

export const CommandSchema = z.object({
  name: z.string(),
  isPushQueue: z.boolean().optional(),
  execute: z.function({
    input: z.any().optional(),
    output: z.object({
      redo: z.function().optional(),
      undo: z.function().optional()
    })
  }),
  keyboard: z.string().optional(),
  init: z.function().optional(),
  before: z.array(RCSchema).nullable().optional(),
  after: z.array(RCSchema).nullable().optional()
})

export type Command = z.infer<typeof CommandSchema>