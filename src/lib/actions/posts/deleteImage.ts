"use server";

import { getErrorMessage } from "@/lib/functions/getErrorMessage";
import Post from "@/models/Post";
import cloudinary from "@/utils/cloudinary";
import { connectToDatabase } from "@/utils/mogoDButil/db";
import { revalidatePath } from "next/cache";

export const deleteImage = async (url: string, id:string) => {
  if (!url || !id) {
    return { message: "url or id was not provided" };
  }

  await connectToDatabase();

  const post = await Post.findOne({ _id: id }).exec();
  if (!post) {
    return { message: `No post matches _id ${id}` };
  }

  
  try {
      // deleting images in MongoDB
      post.imageUrls = post.imageUrls.filter((imageUrl:string) => imageUrl !== url) 
      // deleting images in Cloudinary
      const parts = url.split("/");
      const publicIdWithExtension = parts.slice(parts.indexOf("upload") + 1).join("/");
      const publicId = publicIdWithExtension.split(".").slice(0, -1).join(".").split("/").slice(1).join("/");;
      console.log(publicId)
      await cloudinary.uploader.destroy(publicId);
      await post.save()

      revalidatePath(`/postslist/edit/${id}`)
      revalidatePath(`/postslist/${id}`)
      revalidatePath("/postslist")
  }catch(err){
      return { message: `deleting image was failed: ${getErrorMessage(err)}` };
  }

};


    
  
