import {z} from "zod"

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const registerSchema = z.object({
  name:z.string().regex(USER_REGEX, "4 to 24 characters and must begin with a letter.Letters, numbers, underscores, hyphens allowed. Allowed special character."),
  password:z.string().regex(PWD_REGEX, "8 to 24 characters. must include uppercase and lowecase letters. must include uppercase and lowecase letters"), 
  matchPwd:z.string()
}).refine(data => data.password === data.matchPwd,{
  message:"Passwords must match",
  path:["matchPwd"]
})
export type RegisterSchema = z.infer<typeof registerSchema>



export const passwordResetSchema = z.object({
  password:z.string().regex(PWD_REGEX, "8 to 24 characters. must include uppercase and lowecase letters. must include uppercase and lowecase letters"), 
  matchPwd:z.string()
}).refine(data => data.password === data.matchPwd, {
  message: "Passwords must match",
  path:["matchPwd"]
})

export type PasswordResetSchema = z.infer<typeof passwordResetSchema>