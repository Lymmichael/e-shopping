import { User } from "@/payload-types";
import update from "payload/dist/collections/operations/update";
import { Access, CollectionConfig } from "payload/types";

const isAdminOrHasAccessToImages =():Access=>async({
    req
})=>{
    const user= req.user as User || undefined


    if(!user) return false
    if(user.role==="admin") return true
    //false==cant read image

    return{
        user:{
            equals:req.user.id,
            //userid=required user id
        },
    }
}

export const Media: CollectionConfig={
    slug:"media",
    hooks:{
        beforeChange:[
            ({req,data})=>{
            return{...data,user: req.user.id}
            },
        ],
    },
    admin:{
        hidden:({user})=>user.role!=='admin'
        // if the user is not admin then hide it
    },
    access:{
        read:async ({req})=>{
            const referer= req.headers.referer

            if(!req.user || ! referer?.includes("sell")){
                return true
            }
            //1st: not logging in can still see all images 
            //2nd: URL doesn't contain "sell"
            //only fontend can see the images
            return await isAdminOrHasAccessToImages()({req})
        },
        delete: ({req})=>isAdminOrHasAccessToImages()({req}),
        update: ({req})=>isAdminOrHasAccessToImages()({req})
    },
    
    upload:{
        staticURL:"/media",
        staticDir:"media",
        imageSizes:[
            {
                name:"thumbnail",
                width:400,
                height:300,
                position:"centre",
            },
            {
                name:"card",
                width:768,
                height:1024,
                position:"centre",
            },
            {
                name:"tabel",
                width:1024,
                height:undefined,
                position:"centre",
            }
        ],
        mimeTypes:["image/*"],
        //only can upload regular images
    },
    //connecting to the user
    fields:[
        {
            name:"user",
            type:"relationship",
            relationTo:"users",
            required:true,
            //each images required a user
            hasMany:false,
            //one image one user
            admin:{
                condition:()=>false
            }
        }
    ]
}