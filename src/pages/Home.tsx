import { Button } from "@/components/ui/button";
import { Link  } from "react-router";
import {  useSuspenseQuery } from "@tanstack/react-query";
import Couch from "@/data/images/couch.png";
import CarouselCard from "@/components/products/CarouselCard";


import BlogsCard from "@/components/blogs/BlogsCard";
import ProductsCard from "@/components/products/ProductsCard";
import { Product } from "@/types";
import { postsQuery, productsQuery } from "@/api/query";


function HomePage  () {
  // const { productsData, postsData } =useLoaderData();
//   const  { data: productsData,isLoading: isLoadingProducts ,isError :isErrorProducts ,error : errorProducts,refetch : refetchProducts}=useQuery(productsQuery("?limit=8"));
//   const  { data : postsData,isLoading :isLoadingPosts ,isError : isErrorPosts , error :errorPosts,refetch : refetchPosts}=useQuery(postsQuery("?limit=3"));
//   console.log(productsData);

//  if (isLoadingProducts && isLoadingPosts) {
//      return (
//        <div className="flex flex-col space-y-3">
//          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
//          <div className="space-y-2">
//            <Skeleton className="h-4 w-[250px]" />
//            <Skeleton className="h-4 w-[200px]" />
//          </div>
//          isLoadingProdcuts
//        </div>
//      );
//    }

//    if (isErrorProducts && isErrorPosts) {
//      return (
//        <div className="container mx-auto my-32 flex flex-1 place-content-center">
//          <div className="text-center text-red-400">
//            <p className="mb-4">
//              {errorProducts.message} & {errorPosts.message}
//            </p>
//            <Button
//              onClick={() => {
//                refetchProducts();
//                refetchPosts();
//              }}
//              variant="secondary"
//            >
//              Retry
//            </Button>
//          </div>
//        </div>
//      );
//    }
const { data: productsData } = useSuspenseQuery(productsQuery( 8 ));

const {data : postsData} = useSuspenseQuery(postsQuery("?limit=3"));
// const postsData = data;
  const Title = ({
    title,
    href,
    sideText,
  }: {
    title: string;
    href: string;
    sideText: string;
  }) => (
    <div className=" mb-10 mt-28 flex flex-col md:flex-row md:justify-between md:px-0 px-4">
      <h2 className=" font-bold mb-4 text-2xl md:mb-0">{title}</h2>
      <Link  className=" font-semibold underline text-muted-foreground" to={href}>{sideText}</Link>
    </div>
  );


  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="my-8 text-center lg:mt-20 lg:mb-0 lg:w-2/5 lg:text-left">
          <h1 className="mb-4 text-4xl font-extrabold text-[#3b5d50] lg:mb-8 lg:text-6xl">
            Modern Interior Design Studio
          </h1>
          <p className="mb-6 lg:mb-8">
            Furniture is an essential component of any living space, providing
            functionality, comfort, and aesthetic appeal.
          </p>
          <div>
            <Button
              asChild
              className="mr-2 rounded-full bg-orange-300 px-8 py-6 text-base font-bold"
            >
              <Link to="#">Shop Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-bold text-[#3b5d50]"
            >
              <Link to="#">Explore</Link>
            </Button>
          </div>
        </div>
        <img src={Couch} alt="Couch" className="w-full lg:w-3/5" />
      </div>
      <div className="lg:px-5">
        {productsData &&
        <CarouselCard products={productsData.products} />
        }
      </div>
      <Title
        title="Featured Prodcuts"
        href="/products"
        sideText="View All Products"
      />
      <div className="grid gird-cols-1 px-4 md:px-0 md:grid-cols-2  lg:grid-cols-4 gap-6">
        {productsData && productsData.products.slice(0,4).map((products :Product) => (
          <ProductsCard product={products} key={products.id} />
        ))}
      </div>
      <Title title="Recent Blog" href="/blogs" sideText="View All Posts" />
      {postsData &&
      
      <BlogsCard posts={postsData.posts} />
      }
    </div>
  );
};

export default HomePage;
