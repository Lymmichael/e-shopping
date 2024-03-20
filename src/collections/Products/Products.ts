import { BeforeChangeHook } from 'payload/dist/collections/config/types';
import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";
import { Product } from "../..//payload-types";

const addUser: BeforeChangeHook<Product> = async ({
    req,
    data,
  }) => {
    const user = req.user
    return { ...data, user: user.id }
  }

export const Products: CollectionConfig={
    slug:"products",
    //name of the file mostly
    admin:{
        useAsTitle:"name"
    },
    access:{},
    //who can access
    hooks:{
        beforeChange:[
            addUser
        ]
    },
    fields:[
        {
            name:"user",
            type:"relationship",
            relationTo:"users",
            required: true,
            //always required a user with product
            hasMany:false,
            //one product can only be created by one person
            admin:{
                condition:()=>false
                //hidden for normal user
            }
        },
        {
            name:"name",
            label:"Name",
            type:'text',
            required: true,
        },
        {
            name:"description",
            label:"Product details",
            type:'textarea',
        },
        {
            name:'price',
            label:'Price in HKD',
            min:0,
            max:100000,
            type:'number',
            required: true
        },
        {
            name:'category',
            label:"Category",
            type:'select',
            options: PRODUCT_CATEGORIES.map(
                ({label,value})=>({label,value})
            ),
            required:true
        },
        {
            name:"product_files",
            label:"Product files(s)",
            type:"relationship",
            required:true,
            relationTo:"product_files",
            hasMany: false,
            // more than one product file in one product = true
        }, 
        {
            name:"approvedForSale",
            label:"Product Status",
            type:'select',
            defaultValue:"pending",
            options:[
                {
                    label:"Pending verification",
                    value:"pending"
                },
                {
                    label:"Approved",
                    value:"approved"
                },
                {
                    label:"Denied",
                    value:"denied",
                }
            ],
            access:{
                create: ({req})=> req.user.role==="admin",
                read: ({req})=> req.user.role==="admin",
                update: ({req})=> req.user.role==="admin"
                //only admin can read, update and create
            },
        },
        {
            name:"priceId",
            access:{
                create:()=>false,
                read:()=>false,
                update:()=>false
            },
            type:"text",
            admin:{
                hidden:true
            },
        },
        {
            name:"stripeId",
            access:{
                create:()=>false,
                read:()=>false,
                update:()=>false
            },
            type:"text",
            admin:{
                hidden:true
            },
        },
        {
            name:"images",
            type:"array",
            label:"Product imagees",
            minRows:1,
            maxRows:5,
            required: true,
            labels:{
                singular:"Image",
                plural:"Images"
            },
            fields:[
                {
                    name:"image",
                    type:"upload",
                    relationTo:"media",
                    required:true,
                }
            ]
        }
    ],
}