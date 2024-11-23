"use client";
import Button from "@/components/elements/Button";
import Form from "@/components/elements/Form";
import Input from "@/components/elements/Input";
import PasswordInput from "@/components/elements/PasswordInput";
import SectionForForm from "@/components/elements/SectionForForm";
import { handleRegistration } from "@/lib/actions/auth/handleRegistration";
import { registerSchema } from "@/lib/types/zodtypes";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
  const clientAction = async (formData: FormData) => {
    const registration = {
      name: formData.get("name") as string,
      password: formData.get("password") as string,
      matchPwd: formData.get("matchPwd") as string,
    };
    const result = registerSchema.safeParse(registration);
    if (!result.success) {
      let errMsg = "";
      result.error.issues.forEach((issue) => {
        errMsg = errMsg + issue.path[0] + ":" + issue.message;
      });
      toast.error(errMsg);
      return;
    }
    const response = await handleRegistration(result.data);
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("registration was successful !!");
      setIsSubmitted(true)
    }
  };

  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <SectionForForm h2Text="Register">
      <Form clientAction={clientAction}>
        <Input
          type="text"
          name="name"
          id="Username"
          autoComplete="off"
          required
          labelText="Your Username:"
        />
        <PasswordInput name="password" id="password" labelText="Password:" />
        <PasswordInput
          name="matchPwd"
          id="matchPwd"
          labelText="Confirm Password:"
        />
        <Button type="submit" disabled={isSubmitted}>Sign up</Button>
      </Form>
      <div>
        <span className="me-6">Already registered ?</span>
        <Button type="button"><Link href="/api/auth/signin">Log in</Link></Button>
      </div>
      <div>
        <span className="me-6">Discover posts without login ?</span>
        <Button type="button"><Link href="/">Home</Link></Button>
      </div>
    </SectionForForm>
  );
};

export default Register;
