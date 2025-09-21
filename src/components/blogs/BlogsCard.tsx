import { Posts } from "@/types";

import { Link } from "react-router";
interface PostProps {
  posts: Posts[];
}
const imageUrl = import.meta.env.VITE_IMAGE_URL;

function BlogsCard({ posts }: PostProps) {
  return (
    <div className="my-8 grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-3">
      {posts.slice(0,3).map((post) => (
        <Link to={`/blogs/${post.id}`} key={post.id} className="">
          <img
            src={imageUrl + post.image}
            loading="lazy"
            decoding="async"
            alt={post.title}
            className="rounded-semiboldmd mb-4 w-full object-contain"
          />
          <h3 className="ml-4 line-clamp-1 font-semibold">{post.title}</h3>
          <div className="mt-2 ml-4 text-sm">
            <span className="font-semibold">{post.author.fullName}</span>
            <span className="font-semibold">{post.updatedAt}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BlogsCard;
