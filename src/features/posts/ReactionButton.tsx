"use client";

import Button from "@/components/elements/Button";
import { addReaction } from "@/lib/actions/posts/addReaction";
import { PostType } from "@/lib/types/PostType";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useOptimistic } from "react";
import toast from "react-hot-toast";

const ReactionButton = ({ post }: { post: PostType }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [optimisticState, addOptimistic] = useOptimistic({
    reactions:post.reactions,
    reactedUsers:post.reactedUsers
  }, (currentState) => {
    // もう一つの引数optimisticValueはこの場合はいらない
    if(!session) return currentState
    if(!currentState.reactedUsers.includes(session.user.name)){
      return{
      reactions:currentState.reactions + 1,
      reactedUsers:[...currentState.reactedUsers, session.user.name]
      }
    }else{
      return {   
        reactions : currentState.reactions -1,
        reactedUsers : currentState.reactedUsers.filter((user:string) => user !== session.user.name)
      }
    }
  });

  
  const clientAction = async () => {
    if (status === "unauthenticated") {
      toast.error("you need to login to interact with post !");
      return;
    } else {
      if (!session) return;
      addOptimistic({})
      const response = await addReaction(post._id, session.user.name);
      if (response?.message) {
        toast.error(response.message);
      } else {
        router.refresh();
      }
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <Button variant="icon" onClick={clientAction}>{optimisticState.reactions}🧡</Button>
      {optimisticState.reactedUsers.length === 1 ? (
        <small>{`${optimisticState.reactedUsers[0]} liked`}</small>
      ) : post.reactedUsers.length === 2 ? (
        <small>{`${optimisticState.reactedUsers[0]} and ${optimisticState.reactedUsers[1]} liked`}</small>
      ) : optimisticState.reactedUsers.length > 2 ? (
        <small>{`${optimisticState.reactedUsers[0]},${optimisticState.reactedUsers[1]} and others liked`}</small>
      ) : (
        ""
      )}
    </div>
  );
};

export default ReactionButton;
