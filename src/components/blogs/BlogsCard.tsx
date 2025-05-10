import { Posts } from "@/types";

import { Link } from "react-router";
interface PostProps {
  posts: Posts[];
}
function BlogsCard({ posts }: PostProps) {
  return (
    <div className="my-8 grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-3">
      {posts.map((post) => (
        <Link to={`/blogs/${post.id}`} key={post.id} className="">
          <img
            src={post.image}
            alt={post.title}
            className="rounded-semiboldmd mb-4 w-full"
          />
          <h3 className="ml-4 line-clamp-1 font-semibold">{post.title}</h3>
          <div className="mt-2 ml-4 text-sm">
            <span className="font-semibold">{post.author}</span>
            <span className="font-semibold">{post.updated_at}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BlogsCard;
