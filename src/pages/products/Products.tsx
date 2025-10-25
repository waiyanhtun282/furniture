import { useSearchParams } from "react-router";
import { useInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";

import { categoryTypeQuery, productsInfiniteQuery, queryClient } from "@/api/query";
// import PaginationBottom from "@/components/products/Pagination";
import ProductsCard from "@/components/products/ProductsCard";
import ProductsFilters from "@/components/products/ProductsFilters";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
// import { products, filterList } from "@/data/porducts";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawCategory = searchParams.get("categories");
  const rawType = searchParams.get("types");

  // Decode & parse search params
  const selectedCategory = rawCategory
    ? decodeURIComponent(rawCategory)
        .split(",")
        .map((cat) => Number(cat.trim()))
        .filter((cat) => !isNaN(cat))
        .map((cat) => cat.toString())
    : [];

  const selectedType = rawType
    ? decodeURIComponent(rawType)
        .split(",")
        .map((type) => Number(type.trim()))
        .filter((type) => !isNaN(type))
        .map((type) => type.toString())
    : [];

  const cat = selectedCategory.length > 0 ? selectedCategory.join(",") : "null";
  const typ = selectedType.length > 0 ? selectedType.join(",") : "null";

  const { data: cateType } = useSuspenseQuery(categoryTypeQuery());
  // console.log(cateType);
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
    refetch,
  } = useInfiniteQuery(productsInfiniteQuery(cat, typ));

  const handlefilterChange = (categories: string[], types: string[]) => {
    const newParams = new URLSearchParams();
    if (categories.length > 0) {
      newParams.set("categories", encodeURIComponent(categories.join(",")));
    }
    if (types.length > 0) {
      newParams.set("types", encodeURIComponent(types.join(",")));
    }

    //update the search params
    setSearchParams(newParams);
    //cancel the previous queries if any
    queryClient.cancelQueries({ queryKey: ["products", "infinite"] });
    //clearCache
    queryClient.removeQueries({ queryKey: ["products", "infinite"] });
    //refetch with new params
    refetch();
  };
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
          <ProductsFilters
            filterList={cateType}
            selectedCategory={selectedCategory}
            selectedType={selectedType}
            onFilterChange={handlefilterChange}
          />
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
