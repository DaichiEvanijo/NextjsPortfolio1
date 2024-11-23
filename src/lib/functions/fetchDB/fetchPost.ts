import 'server-only'

import { PostType } from "@/lib/types/PostType";
import Post from "@/models/Post";
import { connectToDatabase } from "@/utils/mogoDButil/db";
import { unstable_cache } from "next/cache";

// import Post from "@/models/Post"
// import { connectToDatabase } from "@/utils/mogoDButil/db"
// import { unstable_cache } from "next/cache"

// const getAllPosts= async () => {
//   try{
//     await connectToDatabase()
//     const posts = await Post.find()
//     return posts
//   }catch(err){
//     throw new Error("failed to fetch posts")
//   }
// }
// export const getCachedAllPosts = unstable_cache(getAllPosts)

const getPostsforPagination = async (
  page = 1,
  limit = 10,
  search: string | undefined
):Promise<PostType[]> => {
  try {
    await connectToDatabase();

    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            // $regex は MongoDB で正規表現検索を行うための演算子　$regex は MongoDB で正規表現検索を行うための演算子 "i" は case-insensitive（大文字・小文字を無視）を意味
            { name: { $regex: search, $options: "i" } },
            { body: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const posts = await Post.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
      const serializedPosts:PostType[] = posts.map((post) => {
      return {
        _id: post._id.toString(),
        name: post.name,
        title: post.title,
        body: post.body,
        imageUrls:post.imageUrls,
        reactions: post.reactions,
        reactedUsers: post.reactedUsers,
        provider: post.provider,
        createdAt:post.createdAt,
        updatedAt:post.updatedAt,
      };
    });
    return serializedPosts;
  } catch (err) {
    throw new Error(`failed to fetch posts for pagination,${err}`);
  }
};

export const getCachedPostsforPagination = unstable_cache(
  (page: number, limit: number, search: string | undefined) =>
    getPostsforPagination(page, limit, search)
);




const getPostsForSearchbar = async (search: string | undefined) :Promise<PostType[]>=> {
  try {
    await connectToDatabase();

    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            // $regex は MongoDB で正規表現検索を行うための演算子　$regex は MongoDB で正規表現検索を行うための演算子 "i" は case-insensitive（大文字・小文字を無視）を意味
            { name: { $regex: search, $options: "i" } },
            { body: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const posts = await Post.find(query);
    const serializedPosts:PostType[] = posts.map((post) => {
      return {
        _id: post._id.toString(),
        name: post.name,
        title: post.title,
        body: post.body,
        imageUrls:post.imageUrls,
        reactions: post.reactions,
        reactedUsers: post.reactedUsers,
        provider: post.provider,
        createdAt:post.createdAt,
        updatedAt:post.updatedAt,
      };
    });
    return serializedPosts;
  } catch (err) {
    throw new Error(`failed to fetch posts for searchbar, ${err}`);
  }
};

export const getCachedPostsforSearchbar = unstable_cache(getPostsForSearchbar);



const getIndividualPost = async (id: string) :Promise<PostType>=> {
  try {
    await connectToDatabase();
    const post = await Post.findOne({ _id: id });
    if (!post) {
      throw new Error(`Post with id ${id} not found`);
    }
    const serializedPost:PostType= {
      _id: post._id.toString(),
      name: post.name,
      title: post.title,
      body: post.body,
      imageUrls:post.imageUrls,
      reactions: post.reactions,
      reactedUsers: post.reactedUsers,
      provider: post.provider,
      createdAt:post.createdAt,
      updatedAt:post.updatedAt,
    };
    return serializedPost;
  } catch (err) {
    throw new Error(`failed to fetch posts, ${err}`);
  }
};

export const getCachedIndividualPost = unstable_cache((id: string) =>
  getIndividualPost(id)
);





const getPostsByUser = async (name: string, provider: string):Promise<PostType[]> => {
  try {
    await connectToDatabase();
    const posts = await Post.find({ name, provider }).sort({ createdAt: -1 });;
    const serializedPosts:PostType[]= posts.map((post) => {
      return {
        _id: post._id.toString(),
        name: post.name,
        title: post.title,
        body: post.body,
        imageUrls:post.imageUrls,
        reactions: post.reactions,
        reactedUsers: post.reactedUsers,
        provider: post.provider,
        createdAt:post.createdAt,
        updatedAt:post.updatedAt,
      };
    });
    return serializedPosts;
  } catch (err) {
    throw new Error(`failed to fetch posts by user:${err}`);
  }
};
export const getCachedPostsByUser = unstable_cache(
  (name: string, provider: string) => getPostsByUser(name, provider)
);
