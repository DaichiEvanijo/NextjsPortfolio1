"use client";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Textarea from "@/components/elements/Textarea";
import { editPost } from "@/lib/actions/posts/editPost";
import { PostType } from "@/lib/types/PostType";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DeleteButton from "./DeleteButton";
import Form from "@/components/elements/Form";
import { deleteImage } from "@/lib/actions/posts/deleteImage";
import useImagePreview from "@/hooks/useImagePreview";
import PreviewImages from "@/components/elements/PreviewImages";
import DynamicImage from "@/components/elements/DynamicImage";

type EditFormProps = {
  post: PostType;
};
const EditForm = ({ post }: EditFormProps) => {
  const router = useRouter();

  const { handleFileChange, previewUrls } = useImagePreview();

  const clientAction = async (formData: FormData) => {
    const response = await editPost(formData, post._id);
    if (response?.message) {
      toast.error(response.message);
    } else {
      toast.success("post was successfully edited !!");
      router.refresh();
      router.push(`/postslist/${post._id}`);
    }
  };

  const imageDeleteAction = async (url: string) => {
    const response = await deleteImage(url, post._id);
    if (response?.message) {
      toast.error(response.message);
    } else {
      router.refresh();
    }
  };

  return (
    <section>
      <Form clientAction={clientAction}>
        <Input
          type="text"
          name="name"
          id="postAuthor"
          defaultValue={post.name}
          readOnly
          labelText="Author:"
        />
        <Input
          type="text"
          name="title"
          id="postTitle"
          defaultValue={post.title}
          required
          labelText="Title:"
        />
        <Textarea
          name="body"
          defaultValue={post.body}
          required
          labelText="Content:"
          rows={7}
          cols={67.5}
        />
        <Input
          type="file"
          name="newImages"
          id="postnewImages1"
          accept="image/*"
          onChange={(e) => handleFileChange(0, e)}
          disabled={post.imageUrls.length >= 2}
          className="w-[50%]"
        />
        <Input
          type="file"
          name="newImages"
          id="postnewImages2"
          accept="image/*"
          onChange={(e) => handleFileChange(1, e)}
          disabled={post.imageUrls.length >= 1}
          className="w-[50%]"
        />
        <div className="flex flex-row gap-2">
          <EditPostImageList post={post} imageDeleteAction={imageDeleteAction}/>
          <PreviewImages previewUrls={previewUrls} />
        </div>
        <span className=" leading-4 text-red-400">* You can upload 2 images at maximum (less than 800KB per image). Click upload button again to change your image to be uploaded</span>
        <div className="flex gap-2">
          <Button type="submit">Save Post</Button>
          <DeleteButton id={post._id} />
        </div>
      </Form>
      <div className="my-2"></div>
    </section>
  );
};

export default EditForm;




type EditPostImageListProps = {
  post:PostType, 
  imageDeleteAction:(url:string) => void
}
const EditPostImageList = ({post, imageDeleteAction}:EditPostImageListProps) => {
  return (
    <>
      {post.imageUrls.length > 0 &&
        post.imageUrls.map((url, index) => (
          <div  key={index} className="relative">
            <DynamicImage url={url} className="w-[100px] h-[100px]" sizes="100px"/>
            <Button
              type="button"
              variant="deleteButton"
              onClick={() => imageDeleteAction(url)}
              className="absolute -top-1 -right-2 border-none"
              >
              X
            </Button>
          </div>
        ))}
      </>
  )
}


