import {z} from "zod"

export const AuthCredentialsValidator=z.object({
    email:z.string().email(),  //only be email
    password: z.string().min(8,{
        message:"password must be at least 8 characters"
    })
})
//rules of passsword and email

export type TAuthCredentialsValidator=z.infer<typeof AuthCredentialsValidator>
//get the type