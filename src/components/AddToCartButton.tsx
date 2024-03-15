"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { UseCart } from "@/hooks/use-cart"
import { Product } from "@/payload-types"

const AddToCartButton =({product}:{product:Product})=>{
    const { addItem } = UseCart()
    const [isSuccess, setIsSuccess]=useState<boolean>(false)

    useEffect(()=>{
        const timeout=setTimeout(()=>{
            setIsSuccess(false)
        },2000)
        return ()=>clearTimeout(timeout)
    },[])
    //record timeout of the button
    return (
    <Button 
        size='lg' 
        className='w-full'
        onClick={()=>
            {
                if(!isSuccess){
                setIsSuccess(true)
                addItem(product)}
                //passing product in shopping cart
            }
        }    
    >
    {isSuccess ? "Added!" : "Add to cart"}
    </Button>
)}
export default AddToCartButton 