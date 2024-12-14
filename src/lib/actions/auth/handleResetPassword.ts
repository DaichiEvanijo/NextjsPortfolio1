"use server";

import { connectToDatabase } from "@/lib/config/mongodb";
import { passwordResetSchema } from "../../../types/zodtypes";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { getErrorMessage } from "../../functions/getErrorMessage";

export const handleResetPassword = async (
  data: { password: string; matchPwd: string },
  params: string
) => {
  const result = passwordResetSchema.safeParse(data);
  if (!result.success) {
    let errMsg = "";
    result.error.issues.forEach((issue) => {
      errMsg = errMsg + issue.path[0] + ":" + issue.message;
    });
    return {
      error: errMsg,
    };
  }
  console.log(`accpeted resetToken: ${params}`);
  console.log(`${result.data.password} ${params}`);

  await connectToDatabase();

  const foundUser = await User.findOne({
    resetToken: params,
    tokenExpiration: { $gt: Date.now() },
  }).exec();
  // $gt: greater than
  if (!foundUser)
    return {
      message: "invalid or expired token was sent",
    };

  try {
    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    foundUser.password = hashedPassword;
    foundUser.resetToken = undefined;
    foundUser.tokenExpiration = undefined;
    await foundUser.save();
  } catch (err) {
    return {
      message: getErrorMessage(err),
    };
  }

  return { message: "Password has been reset" };
};
