"use server"

import { getErrorMessage } from "@/lib/functions/getErrorMessage";
import Post from "@/models/Post";
import cloudinary from "@/utils/cloudinary";
import { connectToDatabase } from "@/utils/mogoDButil/db";
import { revalidatePath } from "next/cache";

export const deletePost = async (id:string) => {
    if (!id){
      return { message: "id is not passed" }
    }

    await connectToDatabase()

    const post = await Post.findOne({_id:id}).exec()
    if(!post){
      return {message:`no post matches _id ${id}`
      }
    }

    
    try{
      // deleting images in MongoDB
      await post.deleteOne({ _id: id });
      // deleting images in Cloudinary
      post.imageUrls.map(async(url:string) => {
        const parts = url.split("/");
        const publicIdWithExtension = parts.slice(parts.indexOf("upload") + 1).join("/");
        const publicId = publicIdWithExtension.split(".").slice(0, -1).join(".").split("/").slice(1).join("/");
        console.log(publicId)
        await cloudinary.uploader.destroy(publicId);
      })
      revalidatePath("/postslist");
      revalidatePath("/");
    }catch(err){
      return {
        message:getErrorMessage(err)
      }
    }
  }



