"use client"

import { PRODUCT_CATEGORIES } from "@/config";
import { useEffect, useRef, useState } from "react"
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

export default function NavItems(){
    const [activeIndex, setActiveIndex]=useState<null|number>(null);
    useEffect(()=>{
        const handler=(e:KeyboardEvent)=>{
            if(e.key==='Escape'){
                setActiveIndex(null)
            }
        }
        document.addEventListener('keydown',handler)
        return ()=>{
            document.removeEventListener('keydown',handler)
        }
    },[])
    const isAnyOpen= activeIndex!==null

    const navRef=useRef< HTMLDivElement | null>(null)
    useOnClickOutside(navRef,()=>setActiveIndex(null))
    return <div className='flex h-full overflow-x-auto gap-5' ref={navRef}>
        {PRODUCT_CATEGORIES.map((category,i)=>{
            function handleOpen(){
                if(activeIndex===i){
                    setActiveIndex(null)
                }else{
                    setActiveIndex(i)
                }
            }
            const isOpen=i===activeIndex;
            return <NavItem 
                category={category}
                handleOpen={handleOpen}
                isOpen={isOpen}
                key={category.value}
                isAnyOpen={isAnyOpen}
            />;
        })}
    </div>
}