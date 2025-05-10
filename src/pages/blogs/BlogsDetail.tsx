import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { posts } from '@/data/posts';
import { Link, useParams } from 'react-router'

function BlogsDetail() {
  const {postId} =useParams();
  const post =posts.find((post) =>post.id === postId);
  return (
    <div className="container mx-auto px-4 lg:px-0">
      <section className="flex flex-col lg:flex-row  ">
        <section className="w-full lg:w-3/4 lg:pr-16">
          <Button variant={"outline"} asChild className="mb-6 mt-8">
            <Link to="/blogs">
              <Icons.arrowLeft /> All Posts
            </Link>
          </Button>
          {post ? (
            <>
              <h2 className=" font-extrabold text-3xl mb-3">{post.title}</h2>
              <div className="text-sm">
                by <span className="font-[600]">{post.author}</span>
                <span className="font-[600]">{post.updated_at}</span>
              </div>
              <h3 className=" font-[400] my-6 text-base">{post.content}</h3>
              <img src={post.image} alt={post.title} className="w-full rounded-xl" />
              <p className="">{post.body}</p>
              <div className="mb-12 space-x-4">
             {
              post.tags.map((tag) =>(
               <Button variant="secondary">
                {tag}
               </Button>
              ))
             }
              </div>
            </>
          ) : (
            <p className="text-muted-foreground mt-8 mb-16 text-center text-xl lg:mt-24">
               not post found
            </p>
          )}
        </section>
        <section className=' w-full lg:w-1/4 lg:mt-24'>Detail
        </section>
      </section>
    </div>
  );
}

export default BlogsDetail