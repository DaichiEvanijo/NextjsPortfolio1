import { options } from "@/app/api/auth/[...nextauth]/options";
import Button from "@/components/elements/Button";
import DynamicImage from "@/components/elements/DynamicImage";
import Section from "@/components/elements/Section";
import TimeAgo from "@/components/elements/TimeAgo";
import ReactionButton from "@/features/posts/ReactionButton";
import { getCachedIndividualPost } from "@/lib/functions/fetchDB/fetchPost";
import Post from "@/models/Post";
import { connectToDatabase } from "@/lib/config/mongodb";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const generateMetadata = async ({ params }: SinglePostPageProps) => {
  const { id } = await params;
  const post = await getCachedIndividualPost(id);
  return {
    title: `${post.title} by ${post.name}`,
    description: `${post.name}'s post :${post.title}`,
  };
};

export const generateStaticParams = async () => {
  try {
    await connectToDatabase();
    const posts = await Post.find({}, "_id");
    // DBからそれぞれのdocuemntの_idのみ取得
    return posts.map((post) => ({
      id: post._id.toString(),
    }));
  } catch (err) {
    throw new Error(`failed to generate generic static params, ${err}`);
  }
};


type SinglePostPageProps = {
  params: Promise<{ id: string }>;
};
const SinglePostPage = async ({ params }: SinglePostPageProps) => {
  const { id } = await params;
  const post = await getCachedIndividualPost(id);

  const session = await getServerSession(options);

  return (
    <Section className="flex flex-col gap-12 p-12">
      <li
        key={post._id}
        className="flex flex-col justify-center items-start gap-2 w-full border-2 border-slate-300 rounded-2xl p-5 shadow-xl"
      >
        <p className="text-2xl">{post.title}</p>
        <p>{post.body}</p>
        <div className="flex flex-row gap-3">
          {post.imageUrls.length > 0 &&
            post.imageUrls.map((url, index) => (
              <DynamicImage
                className="w-[200px] h-[200px]"
                url={url}
                key={index}
                sizes="200px"
              />
            ))}
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          {session?.user.provider === post.provider &&
          session?.user.name === post.name ? (
            <Button type="button">
              <Link href={`/postslist/edit/${post._id}`} prefetch={true}>
                Edit post
              </Link>
            </Button>
          ) : null}
          <Button type="button">
            <Link href="/postslist">Back to posts</Link>
          </Button>
          <span>{`by ${post.name}`}</span>
          <TimeAgo createdAt={post.createdAt} updatedAt={post.updatedAt} />
        </div>
        <ReactionButton post={post} />
      </li>
    </Section>
  );
};

export default SinglePostPage;
