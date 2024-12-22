"use server";
import { getErrorMessage } from "@/lib/functions/getErrorMessage";
import Post from "@/models/Post";
import cloudinary from "@/lib/config/cloudinary";
import { connectToDatabase } from "@/lib/config/mongodb";
import { revalidatePath } from "next/cache";


export const editPost = async ( 
  formData: FormData, id:string) => {
    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    const newImages = formData.getAll("newImages") as File[]; 
    const validImages = newImages.filter(image => image.size > 0) 
    if (!name || !title || !body) {
      return { message: "author, title, body are required" };
    }

    if(!id) return {message:"id is not passed"}

    await connectToDatabase()

    const post = await Post.findOne({_id:id}).exec()
    if(!post){
      return {message:`no post matches _id ${id} edit`
      }
    }
  
    //to Cloudinary Databse
    if(validImages.length > 0){
      if(validImages.length + post.imageUrls.length >2){
        return {message:"You can upload 2 images at maximum"}
      }
      try {
          const uploadPromises = validImages.map(async(image) => {
            // Fileオブジェクト→ArrayBuffer: ブラウザ環境で扱われる低レベルのバイナリデータ形式(JavaScriptで生のバイナリーデータ)→
            // Buffer: Node.js環境で扱われるバイナリデータ形式へ変換 
          const arrayBuffer = await image.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
            return new Promise<string>((resolve, reject) => {
              cloudinary.uploader.upload_stream(
                { folder: "posts" },
                (error, result) => {
                  if (error) {
                    return reject(error); 
                  }
                  if (result) {
                    resolve(result.secure_url);
                  } else {
                    resolve(""); 
                  }
                }
              ).end(buffer);
            })
          });
          const newImageUrls = await Promise.all(uploadPromises);
          // additionally adding images in MongoDB
          post.imageUrls = [...post.imageUrls, ...newImageUrls]
        } catch (err) {
          return { message: `Additional Image upload failed: ${getErrorMessage(err)}` };
        }
    }

    
    try{
      if(title) post.title = title
      if(body) post.body = body
      await post.save()
      
      revalidatePath(`/postslist/${id}`);
      revalidatePath("/postslist");
      revalidatePath("/");
    }catch(err){
      return {
        message:getErrorMessage(err)
      }
    }
  }
  
  