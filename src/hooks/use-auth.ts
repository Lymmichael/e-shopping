import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useAuth=()=>{
    const router=useRouter()

    const signOut=async()=>{
        try{
            const res= await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,{
                //api endpoint from cms removing the token then logout
                    method:'POST',
                    credentials:'include',
                    headers:{
                        'Content-Type':'application/json'
                        },
                    }
                )

            if(!res.ok) throw new Error()
            
            toast.success(`Signed out successfully`)

            router.push('/sign-in')
            router.refresh()
            //nav to sign in page and refresh
        }catch(err){
            toast.error("Couldn't sign out, please try again")
            //output error
        }
    }
    return{signOut}
}
