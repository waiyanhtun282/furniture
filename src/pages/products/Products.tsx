import { useInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";

import { categoryTypeQuery, productsInfiniteQuery } from "@/api/query";
// import PaginationBottom from "@/components/products/Pagination";
import ProductsCard from "@/components/products/ProductsCard";
import ProductsFilters from "@/components/products/ProductsFilters";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
// import { products, filterList } from "@/data/porducts";

function Products() {
  const { data: cateType } = useSuspenseQuery(categoryTypeQuery());
  console.log(cateType);
  const {
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
  } = useInfiniteQuery(productsInfiniteQuery());
  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];
  <Skeleton className="h-[125px] w-[250px] rounded-xl" />;
  return status === "pending" ? (
    <div className="flex flex-col justify-center space-y-3">
      {" "}
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />{" "}
      </div>
      isLoadingPosts{" "}
    </div>
  ) : status === "error" ? (
    <p>Error : {error.message}</p>
  ) : (
    <div className="container mx-auto">
      <section className="flex flex-col lg:flex-row">
        <section className="my-8 ml-4 w-full lg:ml-0 lg:w-1/5">
          <ProductsFilters filterList={cateType} />
        </section>
        <section className="w-full lg:w-4/5">
          <h1 className="my-8 ml-4 text-2xl font-bold lg:ml-0">All Products</h1>
          <div className="mb-12 grid grid-cols-1 gap-6 gap-y-12 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-3">
            {allProducts.map((product) => (
              <ProductsCard key={product.id} product={product} />
            ))}
          </div>
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
            {isFetching && !isFetchingNextPage
              ? "Background updating..."
              : null}
          </div>
        </section>
      </section>
      {/* <PaginationBottom /> */}
    </div>
  );
}

export default Products;
