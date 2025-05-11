import RichTextRender from "@/components/blogs/RichTextRender";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/posts";
import { Link, useParams } from "react-router";

function BlogsDetail() {
  const { postId } = useParams();
  const post = posts.find((post) => post.id === postId);
  return (
    <div className="container mx-auto px-4 lg:px-0">
      <section className="flex flex-col lg:flex-row">
        <section className="w-full lg:w-3/4 lg:pr-16">
          <Button variant={"outline"} asChild className="mt-8 mb-6">
            <Link to="/blogs">
              <Icons.arrowLeft /> All PostsDetail
            </Link>
          </Button>
          {post ? (
            <>
              <h2 className="mb-3 text-3xl font-extrabold">{post.title}</h2>
              <div className="text-sm">
                by <span className="font-[600]">{post.author}</span>
                <span className="font-[600]">{post.updated_at}</span>
              </div>
              <h3 className="my-6 text-base font-[400]">{post.content}</h3>
              <img
                src={post.image}
                alt={post.title}
                className="w-full rounded-xl"
              />
              <RichTextRender content={post.body} className="my-8" />
              <div className="mb-12 space-x-4">
                {post.tags.map((tag) => (
                  <Button variant="secondary">{tag}</Button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-muted-foreground mt-8 mb-16 text-center text-xl lg:mt-24">
              not post found
            </p>
          )}
        </section>
        <section className="w-full lg:mt-24 lg:w-1/4">
          <div className="mb-8 flex items-center gap-2 text-base font-semibold">
            <Icons.layer />
            Other Blogs Posts
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
            {posts.map((post) => (
              <Link
                to={`/blogs/${post.id}`}
                className="mb-6 flex items-start gap-2"
              >
                <img
                  src={post.image}
                  alt="blog post"
                  className="w-1/4 rounded"
                />
                <div className="text-muted-foreground w-3/4 text-sm font-[500]">
                  <p className="line-clamp-2">{post.content}</p>
                  <i className="">... see More</i>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}

export default BlogsDetail;
