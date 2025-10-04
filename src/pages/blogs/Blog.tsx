import { postsInfiniteQuery } from "@/api/query"
import BlogsPostLists from "@/components/blogs/BlogsPostLists"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useInfiniteQuery } from "@tanstack/react-query"

function Blogs() {
   const
    {
      data,
      status,
      error,
      isFetching,
      isFetchingNextPage,
      // isFetchingPreviousPage,
      fetchNextPage,
      // fetchPreviousPage,
      hasNextPage,
      // hasPreviousPage
    }
   
   =useInfiniteQuery(postsInfiniteQuery())
   const allPosts = data?.pages.flatMap(page => page.posts) ?? [];  
  //  console.log(allPosts);

  return status === "pending" ? (
    <div className="flex flex-col justify-center space-y-3">
       <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      {" "}
      <div className="space-y-2">
       <Skeleton className="h-4 w-[250px]" />
         <Skeleton className="h-4 w-[200px]" />
        {" "}
      </div>
      isLoadingPosts {" "}
    </div>
  ) : status === "error" ? (
    <p>Error : {error.message}</p>
  ) : (
    <div className="container mx-auto">
      <BlogsPostLists posts={allPosts} />
      <div className="my-8 flex justify-center">
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          variant={!hasNextPage ? "ghost" : "secondary"}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
        </Button>
      </div>
      <div className="">
        {isFetching && !isFetchingNextPage ? "Background updating..." : null}
      </div>
    </div>
  );
}

export default Blogs