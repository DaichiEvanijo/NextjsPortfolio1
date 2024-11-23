import 'server-only'

import { UserType } from "@/lib/types/UserType"
import User from "@/models/User"
import { connectToDatabase } from "@/utils/mogoDButil/db"
import { unstable_cache } from "next/cache"



export const getAllUsers = async () :Promise<UserType[]>=> {
  try{
    await connectToDatabase()
    const users:UserType[] = await User.find()
    const serializedUsers = users.map(user => {
      return {
          _id: user._id.toString(),
          name: user.name,
          role:user.role,
          provider:user.provider
        }
      }
    )
    return serializedUsers
  }catch(err){
    throw new Error(`failed to fetch users, ${err}`)
  }
}

// export const getCachedAllUsers = unstable_cache(getAllUsers)






const getIndividualUser= async (id:string) :Promise<UserType>=> {
  try{
    await connectToDatabase()
    const user:UserType|null = await User.findOne({_id:id})
    if(!user){
      throw new Error("user is not found !!")
    }
    const serializedUser ={
      _id: user._id.toString(),
      name: user.name,
      role:user.role,
      provider:user.provider
    }
    return serializedUser 
  }catch(err){
    throw new Error(`failed to fetch users, ${err}`)
  }
}

export const getCachedIndividualUser = unstable_cache((id:string) => getIndividualUser(id))



