"use client"
import { useEffect, useState } from "react"
import { Product } from "../payload-types"
import { ThumbsUp } from "lucide-react"

const LikeHandler=({product}:{product:Product})=>{

    const [isSuccess, setIsSuccess]=useState<boolean>(false)
    useEffect(()=>{
        const timeout=setTimeout(()=>{
            setIsSuccess(false)
        },2000)
        return ()=>clearTimeout(timeout)
    },[])
    const like=()=>{
        console.log("test")
        console.log(product)
        
        return <p>ajnds</p>
    }

    return  (
    <div className='group inline-flex'>
        <button onClick={like}>
            <ThumbsUp
                aria-hidden='true'        
                className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400'
            />   
        </button> 
   </div>
   )
}
export default LikeHandler