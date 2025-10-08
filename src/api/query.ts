import { QueryClient } from "@tanstack/react-query";
import api from "@/api/index";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, //5 Min
      // retry:2,
    },
  },
});

const fetchProdcuts = (q?: string) =>
  api.get(`users/products${q ?? ""}`).then((res) => res.data);

export const productsQuery = (q?: string) => ({
  queryKey: ["products", q],
  queryFn: () => fetchProdcuts(q),
});
const fetchPosts = (q?: string) =>
  api.get(`users/posts/infinite${q ?? ""}`).then((res) => res.data);

export const postsQuery = (q?: string) => ({
  queryKey: ["posts", q],
  queryFn: () => fetchPosts(q),
});

export const fetchInfinitPosts = async ({ pageParam = null }) => {
  const query = pageParam ? `?limit=6&cursor=${pageParam}` : "?limit=6";
  const response = await api.get(`users/posts/infinite${query}`);
  return response.data;
};

export const postsInfiniteQuery = () => ({
  queryKey: ["posts", "infinite"],
  queryFn: fetchInfinitPosts,
  initialPageParam: null, //starting point
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor ?? undefined,
  //  getPrevPageParam: (firstPage, pages) => firstPage.prevCursor ?? undefined,
  // maxPages: 6,
});


export const fetchOnePost = async (id :number) =>{
const post =  await api.get(`users/posts/${id}`);
if(!post) {
  throw new Response("",{
      status:404,
      statusText:"Post Not Found"
  });
};
return post.data;
 


};

export const onePostQuery = (id : number) => ({
  queryKey: ["post", "details", id],
  queryFn: () => fetchOnePost(id),  
});