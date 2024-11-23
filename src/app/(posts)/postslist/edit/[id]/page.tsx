import SectionForForm from "@/components/elements/SectionForForm";
import EditForm from "@/features/posts/EditForm";
import { getCachedIndividualPost } from "@/lib/functions/fetchDB/fetchPost";
import Post from "@/models/Post";
import { connectToDatabase } from "@/utils/mogoDButil/db";

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



type EditPageProps = {
  params: Promise<{ id: string }>;
};
const EditPage = async ({ params }: EditPageProps) => {
  const { id } = await params;
  const post = await getCachedIndividualPost(id);

  return (
    <SectionForForm h2Text="Edit Post">
      <EditForm post={post} />
    </SectionForForm>
  );
};

export default EditPage;
