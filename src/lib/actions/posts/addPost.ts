"use server";
import { getErrorMessage } from "@/lib/functions/getErrorMessage";
import Post from "@/models/Post";
import { connectToDatabase } from "@/lib/config/mongodb";
import { revalidatePath } from "next/cache";

import cloudinary from "@/lib/config/cloudinary"


export const addPost = async (  
  formData: FormData, provider:string) => {
  const name = formData.get("name") as string;
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const images = formData.getAll("images") as File[]
  const validImages = images.filter(image => image.size > 0);
  if (!name || !title || !body) {
    return { message: "author, title, body are required" };
  }
  
  await connectToDatabase();

  //to Cloudinary Databse
  let imageUrls: string[] = []; 
  if(validImages.length > 0){
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
        imageUrls = await Promise.all(uploadPromises);
      } catch (err) {
        return { message: `Image upload failed: ${getErrorMessage(err)}` };
      }
  }
    

    try {
      await Post.create({
        name: name.trim(),
        title,
        body,
        provider,
        imageUrls,
      });
      revalidatePath("/postslist")
      revalidatePath("/")
    } catch (err) {
      return {
        message: getErrorMessage(err),
      };
    }
  };
  