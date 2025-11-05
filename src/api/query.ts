import { keepPreviousData, QueryClient } from "@tanstack/react-query";
import api from "@/api/index";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, //5 Min
      // retry:2,
    },
  },
});

// const fetchProducts = (q?: string) => api.get(`/users/products${q ?? ""}`).then((res) => res.data);

const fetchProducts = (limit?: number ) => {
  const query = typeof limit === "number" && limit > 0 ? `?limit=${limit}` : "";
  return api.get(`/users/products${query}`).then((res) => res.data);
};
export const productsQuery = (limit?: number) => ({
  queryKey: ["products", limit],
  queryFn: () => fetchProducts(limit),
});

// export const productsQuery = (q?: string) => ({
//   queryKey: ["products", q],
//   queryFn: () => fetchProducts(q),
// });



const fetchPosts = (q?: string) =>
  api.get(`/users/posts/infinite${q ?? ""}`).then((res) => res.data);

export const postsQuery = (q?: string) => ({
  queryKey: ["posts", q],
  queryFn: () => fetchPosts(q),
});

export const fetchInfinitPosts = async ({ pageParam = null }) => {
  const query = pageParam ? `?limit=6&cursor=${pageParam}` : "?limit=6";
  const response = await api.get(`/users/posts/infinite${query}`);
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

export const fetchOnePost = async (id: number) => {
  const post = await api.get(`/users/posts/${id}`);
  if (!post) {
    throw new Response("", {
      status: 404,
      statusText: "Post Not Found",
    });
  }
  return post.data;
};

export const onePostQuery = (id: number) => ({
  queryKey: ["post", "details", id],
  queryFn: () => fetchOnePost(id),
});

const fetchCategoryType = async () =>
  api.get("/users/filter-type").then((res) => res.data);
export const categoryTypeQuery = () => ({
  queryKey: ["category", "type"],
  queryFn: fetchCategoryType,
});

export const fetchInfiniteProducts = async ({
  pageParam = null,
  categories = null,
  types = null,
}: {
  pageParam?: number | null;
  categories?: string | null;
  types?: string | null;
}) => {
  let query = pageParam ? `?limit=9&cursor=${pageParam}` : "?limit=9";
  if (categories) query += `&category=${categories}`;
  if (types) query += `&type=${types}`;
  const response = await api.get(`/users/products${query}`);
  return response.data;
};

export const productsInfiniteQuery = (
  categories: string | null = null,
  types: string | null = null,
) => ({
  queryKey: [
    "products",
    "infinite",
    categories ?? undefined,
    types ?? undefined,
    // { categories, types }
  ],
  queryFn: ({ pageParam }: { pageParam: number | null }) =>
    fetchInfiniteProducts({ pageParam, categories, types }),
  placeholderData: keepPreviousData,
  initialPageParam: null, //starting point
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor ?? undefined,
  //  getPrevPageParam: (firstPage, pages) => firstPage.prevCursor ?? undefined,
  // maxPages: 6,
});

const fetchOneProduct = async (id: number) => {
  const product = await api.get(`/users/products/${id}`);
  if (!product) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  // console.log("productdata",product.data)
  return product.data;
};

export const oneProductQuery = (id: number) => ({
  queryKey: ["products", "details", id],
  queryFn: () => fetchOneProduct(id),
});