import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import Autoplay from "embla-carousel-autoplay";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ProductsCard from "@/components/products/ProductsCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { FormatPrice } from "@/lib/utils";
import Rating from "@/components/products/Rating";
import { oneProductQuery, productsQuery } from "@/api/query";
import AddToFavourite from "@/components/products/AddToFavourite";
import AddToCardForm from "@/components/products/AddToCardForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Image, Product } from "@/types";

const imageUrl = import.meta.env.VITE_IMAGE_URL;

function ProductsDetail() {
  // const { productsId } = useParams();
  // const product = products.find((product) => product.id === productsId);
  const { productId } =useLoaderData(); 
  
// console.log("Product ID:", productId);

  const { data: productsData } = useSuspenseQuery(productsQuery( "?limit=4" ));

  const  { data : productsDetail } =useSuspenseQuery(oneProductQuery(productId));

  const navigate = useNavigate();

  
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );

  return (
    <div className="container mx-auto px-4 md:px-0">
      <Button  variant="outline" className="mt-8 " onClick={() =>navigate(-1)}>
          <Icons.arrowLeft /> All Prouducts
         {/* <Link to="/products"> */}
        {/* </Link> */}
      </Button>
      <section className="my-6 flex flex-col gap-8 md:flex-row md:gap-16">
        <Carousel plugins={[plugin.current]} className="w-full md:w-1/2">
          <CarouselContent>
            {productsDetail.product?.images.map((images: Image) => (
              <CarouselItem key={images.id}>
                <div className="p-1">
                  <img
                    src={imageUrl + images.path}
                    alt={productsDetail.product.name}
                    loading="lazy"
                    decoding="async"
                    className="size-full rounded-md object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Separator className="mt-4 md:hidden" />
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="space-y-2">
            <h2 className="mb-2 line-clamp-1 text-2xl font-bold">
              {productsDetail.product.name}
            </h2>
            <p className="text-muted-foreground text-base">
              {FormatPrice(Number(productsDetail.product.price))}
            </p>
          </div>
          <Separator className="my-1.5" />
          <p className="text-muted-foreground text-base">
            {productsDetail.product.inventory} in stock
          </p>
          <div className="flex items-center justify-between">
            <Rating rating={Number(productsDetail.product.rating)} />
            <AddToFavourite
              productId={Number(productsDetail.product.id)}
              rating={Number(productsDetail.product.rating)}
              isFavourite ={productsDetail.product.users.length === 1 }
            />
          </div>
          <AddToCardForm canBuy={productsDetail.product.status === "ACTIVE"} />
          <Separator className="my-5" />
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                {productsDetail.product.description ??
                  "No description is avaiable for this products"}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      <section className="space-y-6 overflow-hidden">
        <h2 className="line-clamp-1 text-2xl font-bold">
          More Products from Furniture Shop
        </h2>
        <ScrollArea className="pb-8">
          <div className="flex gap-4">
            {productsData.products.slice(0, 4).map((item: Product) => (
              <ProductsCard
                key={item.id}
                product={item}
                className="min-w-[260px]"
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
    </div>
  );
}

export default ProductsDetail;
