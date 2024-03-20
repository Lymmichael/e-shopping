import { User } from '@/payload-types';
import { ExpressContext } from "@/server";
import { TRPCError, initTRPC } from "@trpc/server";
import { PayloadRequest } from "payload/types";

const t = initTRPC.context<ExpressContext>().create()
const middleware=t.middleware
//middleware
const isAuth=middleware(async ({ctx,next})=>{
    const req=ctx.req as PayloadRequest
    //send request and chec kwhether the user login in or not
    const {user}=req as {user:User | null}

    if(!user|| !user.id){
        throw new TRPCError({code:"UNAUTHORIZED"})
    }
    return next({
        // pass in context with user
        ctx:{
            user,
        }
    })
})

export const router=t.router
export const publicProcedure = t.procedure
export const PrivateProcedure = t.procedure.use(isAuth)