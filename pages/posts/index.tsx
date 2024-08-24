import { GetStaticProps } from "next";
import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import PostLayout from "./layout";
import { Button } from "src/components/ui/button";
import { redirect } from "next/navigation";
import Link from "next/link";

const PostItem = dynamic(() => import("../../components/PostItem"), {
  ssr: false,
});

export type Post = {
  id: number;
  title: string;
  body: string;
};

export type Props = {
  posts: Post[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = res.data;

  return {
    props: {
      posts,
    },
  };
};

const Posts = ({ posts }: Props) => (
  <>
    <Head>
      <title>Posts</title>
    </Head>

    <PostLayout>
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Posts</h1>
      <Link
        href="/posts/create"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
      >
        Create Post
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </PostLayout>
  </>
);

export default Posts;
