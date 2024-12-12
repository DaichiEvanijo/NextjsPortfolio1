"use client";

import Button from "@/components/elements/Button";
import Form from "@/components/elements/Form";
import Input from "@/components/elements/Input";
import PreviewImages from "@/components/elements/PreviewImages";
import SectionForForm from "@/components/elements/SectionForForm";
import Textarea from "@/components/elements/Textarea";
import useImagePreview from "@/hooks/useImagePreview";
import { addPost } from "@/lib/actions/posts/addPost";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddPostForm = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const { previewUrls, handleFileChange } = useImagePreview();

  const clientAction = async (formData: FormData) => {
    const confirmed = confirm("Are you sure you would like to post ?");
    if (confirmed) {
      if (status === "authenticated" && session) {
        const response = await addPost(formData, session.user.provider);
        if (response?.message) {
          toast.error(response.message);
        } else {
          toast.success("post was successfully created !!");
          router.refresh();
          router.push("/postslist");
        }
      }
    }
  };

  return (
    <SectionForForm h2Text="Create Post">
      <Form clientAction={clientAction}>
        <Input
          type="text"
          name="name"
          id="postAuthor"
          value={session?.user.name}
          readOnly
          labelText="Author:"
        />
        <Input
          type="text"
          name="title"
          id="titile"
          required
          labelText="Title:"
        />
        <Textarea name="body" required labelText="Content:" />
        <Input
          type="file"
          name="images"
          id="postImages1"
          labelText="Upload Image 1:"
          accept="image/*"
          onChange={(e) => handleFileChange(0, e)}
          className="w-[50%]"
        />
        <Input
          type="file"
          name="images"
          id="postImages2"
          labelText="Upload Image 2:"
          accept="image/*"
          onChange={(e) => handleFileChange(1, e)}
          className="w-[50%]"
        />
        {previewUrls.length > 0 && (
          <div className="flex flex-row gap-2">
            <PreviewImages previewUrls={previewUrls} />
          </div>
        )}
        <span className=" leading-4 text-red-400">
          * You can upload 2 images at maximum (less than 800KB per image).
          Click upload button again to change your image to be uploaded
        </span>
        <Button type="submit">Save Post</Button>
      </Form>
    </SectionForForm>
  );
};

export default AddPostForm;
