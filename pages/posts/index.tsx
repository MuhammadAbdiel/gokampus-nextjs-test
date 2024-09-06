import { GetStaticProps } from "next";
import axios from "axios";
import Head from "next/head";
import PostLayout from "./layout";
import Link from "next/link";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Button } from "src/components/ui/button";

const PostItem = lazy(() => import("../../components/PostItem"));

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

const Posts = ({ posts }: Props) => {
  const [visiblePosts, setVisiblePosts] = useState<Post[]>(posts.slice(0, 10)); // Initially load the first 10 posts
  const [hasMore, setHasMore] = useState(true); // Check if there are more posts to load
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMorePosts = () => {
    const nextPosts = posts.slice(
      visiblePosts.length,
      visiblePosts.length + 10
    );
    setVisiblePosts((prev) => [...prev, ...nextPosts]);

    if (visiblePosts.length + 10 >= posts.length) {
      setHasMore(false); // No more posts to load
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts(); // Trigger loading more posts when the observer detects the user scrolling to the bottom
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current); // Attach the observer to the reference element
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current); // Clean up observer on unmount
      }
    };
  }, [visiblePosts, hasMore]);

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>

      <PostLayout>
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Posts
        </h1>

        <Link
          href="/posts/create"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Create Post
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {visiblePosts.map((post) => (
            <Suspense key={post.id} fallback={<p>Loading...</p>}>
              <PostItem post={post} />
            </Suspense>
          ))}
        </div>

        {hasMore && (
          <div ref={observerRef} className="mt-10 text-center">
            <p>Loading more posts...</p>
          </div>
        )}
      </PostLayout>
    </>
  );
};

export default Posts;
