import Link from "next/link";
import { Post } from "src/pages/posts";

const PostItem = ({ post }: { post: Post }) => (
  <Link
    key={post.id}
    href={`/posts/${post.id}`}
    className="block rounded-lg border border-gray-300 bg-white shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
  >
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2 text-gray-900">{post.title}</h2>
      <p className="text-gray-700">{post.body}</p>
    </div>
  </Link>
);

export default PostItem;
