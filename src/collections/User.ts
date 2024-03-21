import { CollectionConfig } from 'payload/types';

export const Users: CollectionConfig={
    slug: "users",
    auth:{
        verify:{
            generateEmailHTML:({token})=>{
                return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'>Verify account</a>`
            },
        },
    },
    access:{
        read:()=>true,
        create:()=>true,

    },
    fields:[
        {
            name:'role',
            required:true,
            defaultValue:'user',
            
            type:'select',
            options:[
                {label:'Admin', value:'admin'},
                {label:'User',value:'user'},
            ]
        },{
            name:"comments",
            type:"text",
            label:"comments",
            required:false,
        },
        // {
        //     name: "likes",
        //     type: "relationship",
        //     relationTo: "products",
        //     label: "likes",
        //     required: false,
        //     access: {
        //       create: ({ req }) => req.user.role === "admin",
        //       read: ({ req }) => req.user.role === "admin",
        //       update: ({ req }) => req.user.role === "admin"
        //       // Only admin can read, update, and create
        //     },
        //     hasMany:true
        //   },
    ]
}