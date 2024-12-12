import Button from "@/components/elements/Button";
import DynamicImage from "@/components/elements/DynamicImage";
import TimeAgo from "@/components/elements/TimeAgo";
import { PostType } from "@/lib/types/PostType";
import Link from "next/link";

const BlogHeadline = ({ posts }: { posts: PostType[] }) => {
  return (
    <section className="flex flex-col gap-4 justify-center items-center w-full">
      <h3 className="text-2xl bg-gradient-to-r from-slate-400 via-yellow-200 to-yellow-500 text-transparent bg-clip-text">
        Check out our blog forum !!
      </h3>
      <p> Latest Blogs...</p>
      <ul className="flex flex-col lg:flex-row gap-4 items-center justify-center w-full">
        {posts.map((post) => {
          return (
            <li
              key={post._id}
              className="flex flex-col justify-center items-center gap-1 border-2 border-slate-300 rounded-2xl p-4 shadow-xl transiton duration-300 transform hover:-translate-y-2  w-[60%] lg:w-auto"
            >
              <p className="text-xl">{post.title}</p>
              <p className="text-xs">{`${post.body.slice(0, 50)}...`}</p>
              <div className=" flex flex-col sm:flex-row gap-1 justify-center">
                {post.imageUrls.length > 0 &&
                  post.imageUrls.map((url, index) => (
                    <DynamicImage
                      className="w-[125px] h-[125px]"
                      url={url}
                      key={index}
                      sizes="125px"
                    />
                  ))}
              </div>
              <div className="flex gap-2 items-center justify-center flex-wrap text-sm ">
                <Button type="button">
                  <Link href={`/postslist/${post._id}`} prefetch={true}>
                    View Post
                  </Link>
                </Button>
                <span>{`by ${post.name}`}</span>
                <TimeAgo
                  createdAt={post.createdAt}
                  updatedAt={post.updatedAt}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <Button variant="yellowButton" size="yellowButton">
        <Link href="postslist">To Blog</Link>
      </Button>
    </section>
  );
};

export default BlogHeadline;
