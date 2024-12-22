"use client";
import Button from "@/components/elements/Button";
import Form from "@/components/elements/Form";
import Input from "@/components/elements/Input";
import SectionForForm from "@/components/elements/SectionForForm";
import { handleForgetPassword } from "@/lib/actions/auth/handleForgetPassword";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const Forgetpassword = () => {
  const router = useRouter()

  const clientAction = async (formData:FormData) => {
    const response = await handleForgetPassword(formData)
    if(response?.message){
      toast.error(response.message)
    }else{
      toast.success(`Password reset link sent to ${
        formData.get("email")} !` )
        router.push("/postslist");
    }
  }

  
  return (
    <SectionForForm h2Text="Reset your password here">
      <Form clientAction={clientAction}>
        <Input type="text" name="name" id="username" labelText="Username:" required />
        <Input type="email" name="email" id="email" required labelText="Your email address for sending a link to reset PW:"/>
        <Button type="submit">
          Send email
        </Button>
        <Button type="button">
          <Link href="/api/auth/signin">Back to login</Link>
        </Button>
      </Form>
    </SectionForForm>
  );
};

export default Forgetpassword;
