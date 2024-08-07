import { GetServerSideProps } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import { Button } from "src/components/ui/button";
import dynamic from "next/dynamic";
import PostLayout from "./layout";

const PostContent = dynamic(() => import("../../components/PostContent"), {
  ssr: true,
});

export type Post = {
  id: number;
  title: string;
  body: string;
};

export type Props = {
  post: Post;
};

const cache: Record<number, Post> = {}; // Simple in-memory cache

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.params!;
  const postId = parseInt(id as string);

  if (cache[postId]) {
    return {
      props: {
        post: cache[postId],
      },
    };
  }

  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const post: Post = res.data;
    cache[postId] = post;

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const PostDetail = ({ post }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <PostLayout>
        <PostContent post={post} />

        <Button
          variant="destructive"
          onClick={() => router.back()}
          className="mt-4"
          size="sm"
        >
          Back
        </Button>
      </PostLayout>
    </>
  );
};

export default PostDetail;
