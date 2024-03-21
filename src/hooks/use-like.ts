// import { Product } from "@/payload-types";
// import { User } from "payload/dist/auth";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// export type LikeIds={
//     like:Product["likes"]
// }

// type LikeState={
//     userId:User["id"]
//     likeList:LikeIds[]
//     addLike:(productId:string)=>void
//     removeLike:(productId:string)=>void
// }
// //API for handling like adding and removing like
// export const UseLike=create<LikeState>()(
//     persist((set) => ({
//         addLike: (productId: string) => set((state)=>{
//             return {likeList:[...state.likeList,{userId}]}
//         }
//         ),
//         removeLike:(productId: string) => set((state)=>{
//             return {likeList:[...state.likeList,{userId}]}
//         }
//         ),
//       }),{
        
//       })
// )