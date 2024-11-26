"use server";

import User from "@/models/User";
import { connectToDatabase } from "@/utils/mogoDButil/db";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { getErrorMessage } from "../../functions/getErrorMessage";

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

    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: `Stefanie Lange <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password reset request",
      text: `You requested a password reset. Please click the following link to reset your password:\n
      http://localhost:3000/resetpassword/${token}`,
    };
    // https://mernfrontend-o4y0.onrender.com/resetpassword/${token}
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(`email sending fails \n ${err}`);
        return {
          message: "error on sending email",
        };
      }
    });
  } catch (err) {
    return {
      error: getErrorMessage(err),
    };
  }
};
