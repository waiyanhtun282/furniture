import BlogsPostLists from "@/components/blogs/BlogsPostLists"
import { posts } from "@/data/posts"

function Blogs() {
  return (
    <div className=" container mx-auto">
      <h2 className=" text-2xl font-bold text-center md:text-left mt-8">Latest Blogs Posts</h2>
      <BlogsPostLists posts={posts}/>
    </div>
  )
}

export default Blogs