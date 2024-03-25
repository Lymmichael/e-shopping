"use client"
import { useEffect, useState } from "react"
import { Product } from "../payload-types"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import { getPayloadClient } from "@/get-payload"

const LikeHandler=({product}:{product:Product})=>{
    const [isLiked, setIsLiked]=useState<boolean>(false)
    const [isDisLiked, setIsDisLiked]=useState<boolean>(false)
    const [styling,setStyling]=useState<string>()
    const [disLikeStyling,setDisLikeStyling]=useState<string>()
    const [likeCount,setlikeCount]=useState<number>(product.likes?.length || 0 )
    const [dislikeCount,setDisLikeCount]=useState<number>(product.dislikes?.length||0)
    const [isLoggin,setIsLoggin]=useState<boolean>()
    
    if(isLiked){
        useEffect(()=>{
            setStyling("mr-1 h-5 w-5 flex-shrink-0 text-black-900")
        })
    }else{
        useEffect(()=>{
            setStyling("mr-1 h-5 w-5 flex-shrink-0 text-gray-400")
        })
    }

    if(isDisLiked){
        useEffect(()=>{
            setDisLikeStyling("mr-1 h-5 w-5 flex-shrink-0 text-black-900")
        })
    }else{
        useEffect(()=>{
            setDisLikeStyling("mr-1 h-5 w-5 flex-shrink-0 text-gray-400")
        })
    }

    const like=()=>{
        console.log("test")
        console.log(product)
        if(isLiked){
            setIsLiked(false)
            setlikeCount(likeCount-1)
        }else{
            setIsLiked(true)
            setlikeCount(likeCount+1)
        }
    }
    
    const dislike=()=>{
        if(isDisLiked){
            setIsDisLiked(false)
            setDisLikeCount(dislikeCount-1)
        }else{
            setIsDisLiked(true)
            setDisLikeCount(dislikeCount+1)
        }
    }
    //api for updating likes and dislikes
    
    return  (<>
    <div className='group inline-flex'>
        <button onClick={like} className='group inline-flex'>
            <ThumbsUp
                aria-hidden='true'        
                className={styling}
            />
            <p className={styling}>{likeCount}</p>
        </button>
        <button onClick={dislike} className='group inline-flex'>
            <ThumbsDown 
                aria-hidden='true'
                className={disLikeStyling} />
            <p className={disLikeStyling}>{dislikeCount}</p>
        </button>
   </div>
   </>
   )
}
export default LikeHandler