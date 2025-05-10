
import { Posts } from '@/types';
import React from 'react'
import { Link } from 'react-router';
interface PostProps {
   posts:Posts[];
}

function BlogsPostLists({posts}:PostProps) {
  return (
    <div className="my-8 grid grid-cols-1 gap-16 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-3">
      {posts.map((post) => (
        <Link to={`/blogs/${post.id}`} key={post.id} className="">
          <img
            src={post.image}
            alt={post.title}
            className="mb-4 w-full rounded-md"
          />
          <h2 className='font-semibold  line-clamp-1 text-xl'>{post.title}</h2>
          <h3 className="my-2 line-clamp-3 font-[400] text-base">{post.content}</h3>
          <div className=" text-sm">
            by <span className="font-[600]">{post.author}</span>
            <span className="font-[600]">{post.updated_at}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BlogsPostLists