"use client"
import { ShoppingCartIcon } from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { formatPrice } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { ImageConfigContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";
import { UseCart } from "@/hooks/use-cart";
import { ScrollArea } from "./ui/scroll-area";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
const fee=1;
const itemCount=0;
export default function Cart(){

    const {items}=UseCart()

    const itemCount=items.length
    const [isMounted, setIsMounted]=useState<boolean>(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    const cartTotal=items.reduce(
        (total,{product})=>total+product.price
        //add all the price
    ,0)

    return <Sheet>
        <SheetTrigger className='group -m-2 flex items-center p-2'>
            <ShoppingCartIcon 
                aria-aria-hidden='true'
                className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
            />
            <span className='ml-2 text-sm font-medium text-gray-700 group-hover:gray-800'>
                {isMounted ? itemCount : false}
            </span>
        </SheetTrigger>
        <SheetContent className='flex w-full flex-col pfTODOr-0 sm:max-w-lg'>
            <SheetHeader className='space-y-2.5 pr-6'>
                <SheetTitle>
                    Cart ({itemCount})
                </SheetTitle>
            </SheetHeader>
            {itemCount>0?(
                <>
                    <div className='flex w-full flex-col pr-6'>
                        <ScrollArea>
                            {items.map(({product})=>(
                                <CartItem product={product} key={product.id}/>
                            ))}
                        </ScrollArea>
                        
                    </div>
                    <div className='space-y-4 pr-6'>
                        <Separator></Separator>
                        <div className='space-y-1.5 text-sm'>
                            <div className='flex'>
                                <span className='flex-1'>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className='flex'>
                                <span className='flex-1'>Transaction Fee</span>
                                <span>{formatPrice(fee)}</span>
                            </div>
                            <div className='flex'>
                                <span className='flex-1'> Total</span>
                                <span>{formatPrice(fee+cartTotal)}</span>
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetTrigger asChild>
                                <a href='/cart' className={buttonVariants({
                                    className:'w-full',
                                })}>
                                    Continue to Checkout
                                </a>
                            </SheetTrigger>
                        </SheetFooter>
                    </div>
                </>
            ):(
            <div className='flex h-full flex-col items-center justify-center space-y-1'>
                <div 
                    aria-hidden="true" 
                    className='relative mb-4 h-60 w-60 text-muted-foreground'
                >
                    
                    <Image 
                        src='/hippo-empty-cart.png'
                        fill
                        alt='emtpy shopping cart hippo'
                    />
                </div>
                <div className='text-xl font-semibold'>Your cart is empty</div>
                <SheetTrigger asChild>
                    <a href='/products'
                    className={buttonVariants({
                        variant:'link',
                        size:'sm',
                        className:'text-sm text-muted-foreground'
                    })}>
                        Add items to your cart to checkout
                    </a>
                </SheetTrigger>
            </div>)}
        </SheetContent>
    </Sheet>;
}