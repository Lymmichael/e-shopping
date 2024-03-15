import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { User } from "../payload-types";
import { Access, CollectionConfig } from "payload/types";

const addUser: BeforeChangeHook=({req,data})=>{
    const user =req.user as User | null
    return {...data, user: user?.id}
}

const yourOwnAndPurchased: Access= async({req})=>{
    const user= req.user as User | null

    if(user?.role==="admin") return true

    if(!user) return false
    //no login cant read

    const {docs: products}=await req.payload.find({
        collection:"products",
        depth:0,
        // only care of the id so 0 if more than 1 will include others
        where:{
            user:{
                equals:user.id,
            }
        }
    })
    const ownProductFileIds= products.map((prod)=>prod.product_files).flat()
    // .flat keep it as an array of id

    const {docs: orders}=await req.payload.find({
        collection:"orders",
        depth:2,
        // only care of the id so 0 if more than 1 will include others
        where:{
            user:{
                equals:user.id,
            }
        }
    })

    const purchasedProductFileIds= orders.map((order)=>{
        return order.products.map((product)=>{
            if(typeof product==="string"){
                return req.payload.logger.error(
                    "Seacrh deapth not sufficient to find purchased file IDs"
                )
            }
            return typeof product.product_files === "string"
                ? product.product_files
                : product.product_files.id
        })
    }).filter(Boolean)
    .flat()
    //use for reduce the array array

    return{
        id:{
            in:[...ownProductFileIds,...purchasedProductFileIds]
        }
    }
}

export const ProductFiles: CollectionConfig={
    slug:"product_files",
    admin:{
        hidden:({user})=> user.role !=='admin',
    },
    hooks:{
        beforeChange:[addUser],
    },
    access:{
        read: yourOwnAndPurchased,
        update: ({req})=>req.user.role ==='admin',
        delete: ({req})=>req.user.role ==='admin'
        //only admin can change it
    },
    upload:{
        staticURL:"/product_files",
        staticDir:"product_files",
        //the files will be under the staticURL
        mimeTypes:["image/*","font/*","application/postscript"],
        //file styles
    },
    fields:[
        {
            name:"user",
            type:"relationship",
            relationTo:"users",
            //connect file to user
            admin:{
                condition:()=>false,
            },
            hasMany:false,
            required:true
        }
    ]
}