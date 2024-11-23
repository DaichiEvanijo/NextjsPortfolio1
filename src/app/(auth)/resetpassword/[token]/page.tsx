"use client";

import Button from "@/components/elements/Button";
import Form from "@/components/elements/Form";
import PasswordInput from "@/components/elements/PasswordInput";
import SectionForForm from "@/components/elements/SectionForForm";
import { handleResetPassword } from "@/lib/actions/auth/handleResetPassword";
import { passwordResetSchema } from "@/lib/types/zodtypes";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const params = useParams();
  const token = params.token as string;

  const [isSubmitted, setIsSubmitted] = useState(false)

  const clientAction = async (formData: FormData) => {
    const resetRegistration = {
      password: formData.get("password") as string,
      matchPwd: formData.get("matchPwd") as string,
    };
    const result = passwordResetSchema.safeParse(resetRegistration);
    if (!result.success) {
      let errMsg = "";
      result.error.issues.forEach((issue) => {
        errMsg = errMsg + issue.path[0] + ":" + issue.message;
      });
      toast.error(errMsg);
      return;
    }
    const response = await handleResetPassword(result.data, token);
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("password reset was successful !!");
      setIsSubmitted(true)
    }
  };

  
  return (
    <SectionForForm h2Text="Reset your password">
      <Form clientAction={clientAction}>
        <PasswordInput name="password" id="password" labelText="Password:" />
        <PasswordInput
          name="matchPwd"
          id="matchPwd"
          labelText="Confirm Password:"
        />
        <div>
          <Button type="submit" disabled={isSubmitted}>Reset Pwd</Button>
        </div>
        {isSubmitted ? (
          <>
          <Link href="/api/auth/signin">
            <Button type="button">To Login</Button>
          </Link>
          <div>
            <span className="me-6">Discover websites without login ?</span>
            <Button type="button"><Link href="/">Home</Link></Button>
          </div>
          </>)
        :null}
      </Form>
    </SectionForForm>
  );
};

export default ResetPassword;
