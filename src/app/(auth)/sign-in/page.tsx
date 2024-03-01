"use client"
import { Icons } from "@/components/ui/Icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {ZodError, z} from "zod"
import {TAuthCredentialsValidator,AuthCredentialsValidator} from '@/lib/validators/account-credentials-validators'
import { trpc } from "@/trpc/client"
import {toast} from 'sonner'
import { useRouter, useSearchParams } from "next/navigation"

const Page=()=>{

    const searchParams=useSearchParams()
    const router =useRouter()
    const isSeller = searchParams.get(`as`) === `seller`
    //sign-in?as=seller in the url

    const origin =searchParams.get('origin')
    //localhost:3000/sign-in/origin

    const {
        register,
        handleSubmit,
        formState:{errors}
    }= useForm<TAuthCredentialsValidator>({
        resolver:zodResolver(AuthCredentialsValidator),
    })
         
    // const {data}=trpc.anyApiRoute.useQuery()

    // console.log(data)


    const {mutate:signIn, isLoading}=trpc.auth.signIn.useMutation({
       onSuccess:()=>{
        toast.success(`Signed in Successfully`)
        //pop out message

        router.refresh()

        if(origin){
            router.push(`/${origin}`)
            //origin user then go to the original page
            return 
        }

        if(isSeller){
            router.push('/sell')
            //if is seller, go to the seller page
            return
        }

        router.push('/')
        router.refresh()
       },
       onError:(err)=>{
            if(err.data?.code==='UNAUTHORIZED'){
                toast.error('Invalid email or password.')
            }

       }
    })

    function onSubmit({email, password}:TAuthCredentialsValidator){
        signIn({email,password})
    }

    function continueAsSeller(){
        router.push("?as=seller")
        //push the URL to http://xxxx?as=seller
    }

    function continueAsBuyer(){
        router.replace('/sign-in',undefined)
        //get rid of the seller in url 
    }
    return<>
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className='flex flex-col items-center space-y-2 text-center'>
                <Icons.logo className='h-20 w-20'></Icons.logo>
                <h1 className='text-2xl font-bold'>Sign in to your {isSeller&&"Seller "}account</h1>

                <a 
                    href='/sign-up'
                    className={buttonVariants({ 
                        variant:'link',
                        className:"gap-1.5"
                    })}
                >
                Don&apos;t have an account? Sign-up
                <ArrowRight className='h-4 w-4'/>
                </a>
            </div>

            <div className='grid gap-6 '>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid gap-2'>
                        <div className='grid gap-1 py-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input 
                                {...register("email")}
                                className={cn({
                                    "focus-visible:ring-red-500":errors.email
                                })}
                                placeholder='you@example.com'
                            />
                            {errors?.email && <p className='text-sm text-red-500'>
                                {errors.email.message}
                                </p>}
                        </div>

                        <div className='grid gap-1 py-2'>
                            <Label htmlFor='password'>Password</Label>
                            <Input 
                                type="password"
                                {...register("password")}
                                className={cn({
                                    "focus-visible:ring-red-500":errors.password
                                })}
                                placeholder='password'
                            />
                            {errors?.password && <p className='text-sm text-red-500'>
                                {errors.password.message}
                                </p>}
                        </div>
                    
                        <Button>Sign in</Button>
                    </div>
                </form>
                <div className='relative'>
                    <div 
                        className='absolute inset-8 flex items-center'
                        aria-hidden='true'
                        >
                            <span className='w-full border-t' /> 

                    </div>
                    <div className='relative flex justify-center text-xs uppercase'>
                        <span className="bg-background px-2 text-muted-foreground">
                            or
                        </span>
                    </div>
                </div>
                {isSeller?(
                    <Button 
                        onClick={continueAsBuyer}
                        variant='secondary'
                        disabled={isLoading}
                    >
                    Continue as a customer</Button>
                ):         
                    <Button 
                        onClick={continueAsSeller}
                        variant='secondary'
                        disabled={isLoading}
                    >
                    Continue as a seller</Button>}
            </div>
        </div>
    </div>
    </>
}

export default Page