import { getPostsByUser } from "@/lib/functions/fetchDB/fetchPost";
import {  getIndividualUser } from "@/lib/functions/fetchDB/fetchUser";
import { PostType } from "@/lib/types/PostType";
import { UserType } from "@/lib/types/UserType";
import User from "@/models/User";
import { connectToDatabase } from "@/utils/mogoDButil/db";
import Link from "next/link";

export const generateStaticParams = async () => {
  try {
    await connectToDatabase();
    const users = await User.find({}, "_id");
    // DBからそれぞれのdocuemntの_idのみ取得
    return users.map((user) => ({
      id: user._id.toString(),
    }));
  } catch (err) {
    throw new Error(`failed to generate generic static params, ${err}`);
  }
};


type UserPageProps = {
  params: Promise<{ id: string }>;
};
const UserPage = async ({ params }: UserPageProps) => {
  const { id } = await params;
  const user: UserType = await getIndividualUser(id);
  const postsByUser: PostType[] = await getPostsByUser(
    user.name,
    user.provider
  );


  return (
    <section className="h-[calc(100vh-144px)] flex flex-col items-center justify-start p-5 gap-3 overflow-y-auto">
      <h2 className="text-3xl">{`${user.name}'s posts`}</h2>
      <ol className="list-disc">
        {postsByUser.map((post) => {
          return (
            <li key={post._id} className="text-xl">
              <Link href={`/postslist/${post._id}`}>{post.title}</Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default UserPage;
