"use client";
import Button from "@/components/elements/Button";
import { deletePost } from "@/lib/actions/posts/deletePost";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const DeleteButton = ({ id }: { id: string }) => {
  const router = useRouter();

  const clientAction = async () => {
    const confirmd = confirm("Are you sure that you want to delete the post?");
    if (confirmd) {
      const response = await deletePost(id);
      if (response?.message) {
        toast.error(response.message);
      } else  {
        toast.success("Post was successfully deleted!!");
        router.refresh()
        router.push("/postslist");  
      }
    }
  };

  
  return <Button type="button" onClick={clientAction}>Delete post</Button>;
};

export default DeleteButton;
