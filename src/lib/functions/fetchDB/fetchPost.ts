import "server-only";

import { PostType } from "@/types/PostType";
import Post from "@/models/Post";
import { connectToDatabase } from "@/lib/config/mongodb";
import { unstable_cache } from "next/cache";

const getPostsForHeadline = async (): Promise<PostType[]> => {
  try {
    await connectToDatabase();
    const posts = await Post.find().sort({ createdAt: -1 }).limit(3);
    
    return posts.map(post => {
      const postObj = post.toObject(); 
      const {_id, ...rest} = postObj
      return {
        _id:_id.toString(),
        ...rest,
      }
    });
  } catch (err) {
    throw new Error(`failed to fetch 3 posts for headline,${err}`);
  }
};

export const getCachedPostsForHeadline = unstable_cache(getPostsForHeadline);

const getPostsforPagination = async (
  page = 1,
  limit = 10,
  search: string | undefined
): Promise<PostType[]> => {
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

      return posts.map(post => {
        const postObj = post.toObject(); 
        const {_id, ...rest} = postObj
        return {
          _id:_id.toString(),
          ...rest,
        }
      });
  } catch (err) {
    throw new Error(`failed to fetch posts for pagination,${err}`);
  }
};

export const getCachedPostsforPagination = unstable_cache(
  (page: number, limit: number, search: string | undefined) =>
    getPostsforPagination(page, limit, search)
);

const getPostsForSearchbar = async (
  search: string | undefined
): Promise<PostType[]> => {
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
    
    return posts.map(post => {
      const postObj = post.toObject(); 
      const {_id, ...rest} = postObj
      return {
        _id:_id.toString(),
        ...rest,
      }
    });
  } catch (err) {
    throw new Error(`failed to fetch posts for searchbar, ${err}`);
  }
};

export const getCachedPostsforSearchbar = unstable_cache(
  (search: string | undefined) => getPostsForSearchbar(search)
);

const getIndividualPost = async (id: string): Promise<PostType> => {
  try {
    await connectToDatabase();
    const post = await Post.findOne({ _id: id });
    if (!post) {
      throw new Error(`Post with id ${id} not found`);
    }
    const { _id, ...rest } = post.toObject();
    return { _id: _id.toString(), ...rest };
  } catch (err) {
    throw new Error(`failed to fetch posts, ${err}`);
  }
};

export const getCachedIndividualPost = unstable_cache((id: string) =>
  getIndividualPost(id)
);

export const getPostsByUser = async (
  name: string,
  provider: string
): Promise<PostType[]> => {
  try {
    await connectToDatabase();
    const posts = await Post.find({ name, provider }).sort({ createdAt: -1 });
    
    return posts.map(post => {
      // toObject() を使って、Mongoose ドキュメントから不要なメソッドやプロパティを取り除きます。
      const postObj = post.toObject(); 
      const {_id, ...rest} = postObj
      // _id を文字列に変換し、新しいオブジェクトを返す      
      return {
        _id:_id.toString(),
        ...rest,
      }
    });
  } catch (err) {
    throw new Error(`failed to fetch posts by user:${err}`);
  }
};
