import Pagination from "@/features/posts/PostPagination";
import Search from "@/features/posts/PostSearch";
import Link from "next/link";
import ReactionButton from "@/features/posts/ReactionButton";
import {
  getCachedPostsforPagination,
  getCachedPostsforSearchbar,
} from "@/lib/functions/fetchDB/fetchPost";
import Button from "@/components/elements/Button";
import TimeAgo from "@/components/elements/TimeAgo";
import Section from "@/components/elements/Section";
import DynamicImage from "@/components/elements/DynamicImage";
import AddPostButton from "@/features/posts/AddPostButton";
import ScrollToTop from "@/components/elements/ScrollToTop";


type PostsListProps = {
  searchParams: Promise<{
    page: { [key: string]: string | string[] | undefined };
    search: string | undefined;
  }>;
};
const PostsList = async ({ searchParams }: PostsListProps) => {
  const awaitedParams = await searchParams;

  const awaitedPage = awaitedParams.page;
  const page = awaitedPage ? Number(awaitedPage) : 1;

  const search: string | undefined = awaitedParams.search
    ? (awaitedParams.search as string)
    : undefined;

  const [posts, searchedPosts] = await Promise.all([
    getCachedPostsforPagination(page, 4, search),
    getCachedPostsforSearchbar(search),
  ]);

  // searchedPostsはPaginationの数字の数をちょうせいするためだけにfetchしたもの

  return (
    <Section className="flex flex-col gap-12 p-12">
      <ScrollToTop page={page} search={search} />

      {/* Hero section start*/}
      <section className="flex flex-col justify-center items-center gap-24 py-24 text-center ">
        <p className="text-3xl bg-gradient-to-r from-lime-200  to-yellow-500  text-transparent bg-clip-text p-3">
          Post your thoughts about the cities you visited !
        </p>
        <AddPostButton />
      </section>
      {/* Hero section end*/}

      <div className="flex sm:flex-row  justify-evenly items-center gap-3">
        <Search search={search} page={page} />
        {/* このpropsは単語を入れてseachした後にページをrefreshするとSeachコンポのuseEffectにより/postslistになってしまうので、searchPramsから取得している(= サーバーから取得している)searchをSeachコンポのuseStateのinit valueとすれば、client側(Seachコンポ)でリフレッシュしても値はinit valueであるであるsearchになるので、searchbarから文字が消えない  page propsはsearchbarへ単語を入れて検索し、またpaginationをクリックした後(即ちurlに&page=1などが加わった後、ページリフレッシュした後もそのpage数を維持できるようにするため*/}
        <Link href="/userslist" className="text-center">Author&apos;s list</Link>
      </div>

      {posts && posts.length ? (
        <>
          <ul className="w-full flex flex-col gap-5">
            {posts.map((post) => {
              return (
                <li
                  key={post._id}
                  className="flex flex-col justify-center items-start gap-2 w-full border-2 border-slate-300 rounded-2xl p-5 shadow-xl transiton duration-300 transform hover:-translate-y-2 "
                >
                  <p className="text-2xl">{post.title}</p>
                  <p>{`${post.body.slice(0, 50)}...`}</p>
                  <div className="flex flex-row gap-3">
                    {post.imageUrls.length > 0 &&
                      post.imageUrls.map((url, index) => (
                        <DynamicImage
                          className="w-[100px] h-[100px]"
                          url={url}
                          key={index}
                          sizes="100px"
                        />
                      ))}
                  </div>
                  <div className="flex gap-2 items-center flex-wrap ">
                    <Button type="button">
                      <Link href={`/postslist/${post._id}`} prefetch={true}>
                        View Post
                      </Link>
                    </Button>
                    <span><small>{`by ${post.name}`}</small></span>
                    <TimeAgo
                      createdAt={post.createdAt}
                      updatedAt={post.updatedAt}
                    />
                  </div>
                  <ReactionButton post={post} />
                </li>
              );
            })}
          </ul>

          <Pagination
            search={search}
            page={page}
            searchedPosts={searchedPosts}
          />
          {/* こちらのpropsも同じ理屈 */}
        </>
      ) : (
        <p className="text-2xl text-center">
          Your search does not match any post !!
        </p>
      )}
    </Section>
  );
};

export default PostsList;
