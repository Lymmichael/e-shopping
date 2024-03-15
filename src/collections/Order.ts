import { Access, CollectionConfig } from "payload/types";

const yourOwn:Access=({req:{user}})=>{
    if(user.role==="admin") return true

    return{
        user:{
            equals:user?.id
            //same id means same person
        }
    }
}

export const Orders: CollectionConfig={
    slug:"orders",
    admin:{
        useAsTitle:"Your Orders",
        description:"A summary of your orders.",
    },
    access:{
        read:yourOwn,
        create:({req})=>req.user.role==='admin',
        update:({req})=>req.user.role=='admin',
        delete:({req})=>req.user.role=='admin',
    },
    fields:[
        {
            name:"isPaid",
            type:"checkbox",
            access:{
                read:({req})=>req.user.role==='admin',
                create:()=>false,
                update:()=>false
            },
            admin:{
                hidden:true,
            },
            required:true,
        },
        {
            name:"user",
            type:"relationship",
            admin:{
                hidden:true
            },
            relationTo:'users',
            required:true
        },
        {
            name:"products",
            type:"relationship",
            //order relationed to products
            relationTo:"products",
            required:true,
            hasMany:true,
            //one order can have many products
        }
    ]
}