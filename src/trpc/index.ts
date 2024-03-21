import { z } from "zod";
import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";
import { QueryValidator } from "../lib/query-validator";
import { getPayloadClient } from "../get-payload";
import { paymentRouter } from "./payment-router";

export const appRouter = router({
    auth: authRouter,
    payment: paymentRouter,
    getInfiniteProducts: publicProcedure.input(z.object({
        limit: z.number().min(1).max(100),
        //one user can only fetch 1-100 products
        cursor: z.number().nullish(),
        //if the user is srolling the page and other pages products will be loaded
        query: QueryValidator
    })).query(async({input})=>{
        const {query, cursor}=input
        const {sort, limit, ...queryOpts}=query

        const payload= await getPayloadClient()

        const parsedQueryOpts: Record<string,{equals: string}>={}

        Object.entries(queryOpts).forEach(([key,value])=>{
            parsedQueryOpts[key]={
                equals: value,
                //turning into cms format
            }
        })
        const page = cursor || 1
        //input

        const {docs:items,hasNextPage, nextPage}= await payload.find({
            collection:"products",
            where:{
                approvedForSale:{
                    equals:'approved',
                },
                //only allow approved product be showned
                ...parsedQueryOpts
            },
            sort,
            depth: 1,
            limit,
            page,
        })

        return{
            items,
            nextPage: hasNextPage ? nextPage:null
            //getting infinite producs
        }
    }),
})

export type AppRouter = typeof appRouter