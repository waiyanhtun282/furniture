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
const fetchPosts = (q?: string) =>api.get(`users/posts/infinite${q ?? ""}`).then((res) => res.data);

export const postsQuery = (q?: string) => ({
  queryKey: ["posts", q],
  queryFn: () => fetchPosts(q),
});