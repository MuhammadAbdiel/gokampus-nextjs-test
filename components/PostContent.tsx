import { Props } from "src/pages/posts/[id]";

const PostContent = ({ post }: Props) => (
  <>
    <h1 className="text-3xl font-bold text-white mb-6 capitalize">
      {post.title}
    </h1>
    <p className="text-white text-lg mb-6">{post.body}</p>
  </>
);

export default PostContent;
