import { appRouter } from "@/trpc";
import { z } from "zod";

export const QueryValidator= z.object({
    category: z.string().optional(),
    sort: z.enum(['asc','desc']).optional(),
    //user sorting the data in the array
    limit: z.number().optional(),
})

export type TQueryValidator= z.infer<typeof QueryValidator>

//keep the type