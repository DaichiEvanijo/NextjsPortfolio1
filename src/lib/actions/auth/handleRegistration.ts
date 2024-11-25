"use server";

import { connectToDatabase } from "@/utils/mogoDButil/db";
import { registerSchema } from "../../types/zodtypes";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { getErrorMessage } from "../../functions/getErrorMessage";

type handleRegistrationProps = {
  name: string;
  password: string;
  matchPwd: string;
};
export const handleRegistration = async (data: handleRegistrationProps) => {
  const result = registerSchema.safeParse(data);
  if (!result.success) {
    let errMsg = "";
    result.error.issues.forEach((issue) => {
      errMsg = errMsg + issue.path[0] + ":" + issue.message;
    });
    return {
      error: errMsg,
    };
  }

  await connectToDatabase();
  
  try {
    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    const newUser = await User.create({
      name: result.data.name.trim(),
      password: hashedPassword.trim(),
      provider: "Credentials",
    });
    console.log(`Registration was done with \n ${newUser}`);
  } catch (err) {
    return {
      error: getErrorMessage(err),
    };
  }
};
