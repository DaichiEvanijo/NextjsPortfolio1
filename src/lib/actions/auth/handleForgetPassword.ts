"use server";
import User from "@/models/User";
import { connectToDatabase } from "@/utils/mogoDButil/db";
import crypto from "crypto";
import { getErrorMessage } from "../../functions/getErrorMessage";
import { Resend } from "resend";

export const handleForgetPassword = async (
  formData: FormData
) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  if (!email || !name)
    return {
      message: "username and email are required",
      status: 400,
    };


  await connectToDatabase();

  const foundUser = await User.findOne({
    name: name.trim(),
    provider: "Credentials",
  }).exec();
  if (!foundUser)
    return {
      message: "User are not found",
      status: 400,
    };


  try {
    const token = crypto.randomBytes(32).toString("hex");
    foundUser.resetToken = token;
    foundUser.tokenExpiration = Date.now() + 3600000; //1hour
    await foundUser.save();
    console.log(`generated resetToken: ${token}`);
    


    const resend = new Resend(process.env.RESEND_API_KEY)
    resend.emails.send({
      from:"Daichi Koyanagi <onboarding@resend.dev>",
      to: email,
      subject:"Password reset request",
      text:`You requested a password reset. Please click the following link to reset your password:\nhttps://nextjs-portfolio1-weld.vercel.app/resetpassword/${token}`,
    })
  } catch (err) {
    return {
      error: getErrorMessage(err),
    };
  }
};
