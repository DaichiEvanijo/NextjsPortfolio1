"use server"

import Post from "@/models/Post";
import { connectToDatabase } from "@/lib/config/mongodb";
import { revalidatePath } from "next/cache";


export const addReaction = async (id:string, name:string) => {
  if (!id) {
      return { message: "_id and reaction are required" };
  }

  await connectToDatabase()

  const post = await Post.findOne({_id:id}).exec();
  if (!post) {
    return { message: `No post matches _id ${id}` };
  }


  try {
    if(!post.reactedUsers.includes(name)){
        post.reactions = post.reactions + 1;
        post.reactedUsers.push(name)
      }else{
        post.reactions = post.reactions -1;
        post.reactedUsers = post.reactedUsers.filter((user:string) => user !== name)
    }
    await post.save({timestamps:false});
    // reactedUsers, reactionsはupdateするが、timestampsは更新しない
    revalidatePath("/postslist")
    revalidatePath(`/postslist/${id}`)
  } catch (err) {
      return {
       message: `An error occurred while adding reaction ${err}` 
      }
  }
} 



