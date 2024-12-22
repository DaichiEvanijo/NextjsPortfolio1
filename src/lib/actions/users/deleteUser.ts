"use server";
import User  from "@/models/User";
import { connectToDatabase } from "@/lib/config/mongodb";
import { revalidatePath } from "next/cache";


export const deleteUser = async (id: string) => {
  if (!id) {
    return { message: "_id is required" };
  }
  
  try {
    await connectToDatabase();
    const user = await User.findOne({ _id: id }).exec();
    if (!user) {
      return { message: `No user matches _id ${id}` };
    }
    await user.deleteOne({ _id: id });
    revalidatePath("/admin")
  } catch (err) {
    return { message: `failed to delete user ${err}` };
  }
};


