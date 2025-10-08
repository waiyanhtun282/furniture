import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useLoaderData } from "react-router";
import { onePostQuery, postsQuery } from "@/api/query";
import RichTextRender from "@/components/blogs/RichTextRender";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Posts, Tag } from "@/types";

const imageUrl = import.meta.env.VITE_IMAGE_URL;


function BlogsDetail() {
  // const { postId } = useParams();
  // const post = posts.find((post) => post.id === postId);
  const { postId } =useLoaderData();
  const { data : postData } =useSuspenseQuery(postsQuery("?limit=6"));
  const { data : postDetail } =useSuspenseQuery(onePostQuery(postId));
  // console.log(postDetail);

  return (
    <div className="container mx-auto px-4 lg:px-0">
      <section className="flex flex-col lg:flex-row">
        <section className="w-full lg:w-3/4 lg:pr-16">
          <Button variant={"outline"} asChild className="mt-8 mb-6">
            <Link to="/blogs">
              <Icons.arrowLeft /> All PostsDetail
            </Link>
          </Button>
          {postDetail ? (
            <>
              <h2 className="mb-3 text-3xl font-extrabold">{postDetail.post.title}</h2>
              <div className="text-sm">
                by <span className="font-[600]">{postDetail.post.author.fullName}</span>
                <span className="font-[600]">{postDetail.post.updatedAt}</span>
              </div>
              <h3 className="my-6 text-base font-[400]">{postDetail.post.content}</h3>
              <img
                src={ imageUrl + postDetail.post.image}
                alt={postDetail.post.title}
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl"
              />
              <RichTextRender content={postDetail.post.body} className="my-8" />
              <div className="mb-12 space-x-4">
                {postDetail.post.tags.map((tag :Tag) => (
                  <Button variant="secondary">{tag.name}</Button>
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
            {postData.posts.map((post : Posts) => (
              <Link
                to={`/blogs/${post.id}`}
                className="mb-6 flex items-start gap-2"
              >
                <img
                  src={imageUrl + post.image}
                  alt="blog post"
                  loading="lazy"
                  decoding="async"
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
