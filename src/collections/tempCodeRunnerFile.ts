
// const yourOwnAndPurchased: Access= async({req})=>{
//     const user= req.user as User | null

//     if(user?.role==="admin") return true

//     if(!user) return false
//     //no login cant read

//     const {docs: products}=await req.payload.find({
//         collection:"products",
//         depth:0,
//         // only care of the id so 0 if more than 1 will include others
//         where:{
//             user:{
//                 equals:user.id,
//             }
//         }
//     })
//     const ownProductFileIds= products.map((prod)=>prod.product_files)
// }