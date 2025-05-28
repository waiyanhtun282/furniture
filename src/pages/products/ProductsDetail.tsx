import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { products } from "@/data/porducts";
import { Link, useParams } from "react-router";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ProductsCard from "@/components/products/ProductsCard";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { FormatPrice } from "@/lib/utils";
import Rating from "@/components/products/Rating";
import AddToFavourite from "@/components/products/AddToFavourite";
import AddToCardForm from "@/components/products/AddToCardForm";

function ProductsDetail() {
  const { productsId } = useParams();
  const product = products.find((product) => product.id === productsId);
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );

  return (
    <div className="container mx-auto px-4 md:px-0">
      <Button asChild variant="outline" className="mt-8">
        <Link to="/products">
          <Icons.arrowLeft /> All Prouducts
        </Link>
      </Button>
      <section className="my-6 flex flex-col gap-8 md:flex-row md:gap-16">
        <Carousel plugins={[plugin.current]} className="w-full md:w-1/2">
          <CarouselContent>
            {product?.images.map((images) => (
              <CarouselItem key={images}>
                <div className="p-1">
                  <img
                    src={images}
                    alt={product.name}
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
              {product?.name}
            </h2>
            <p className="text-base text-muted-foreground">
              {FormatPrice(Number(product?.price))}
            </p>
          </div>
          <Separator className="my-1.5" />
          <p className="text-base text-muted-foreground">{product?.inventory} in stock</p>
          <div className="flex items-center justify-between">
            <Rating rating={Number(product?.rating)}/>
            <AddToFavourite productId={String(product?.id)} rating={Number(product?.rating)}/>
          </div>
          <AddToCardForm canBuy={product?.status === "active" }/>
        </div>
      </section>
      <section className="space-y-6 overflow-hidden">
        <h2 className="line-clamp-1 text-2xl font-bold">
          More Products from Furniture Shop
        </h2>
        <ScrollArea className="pb-8">
          <div className="flex gap-4">
            {products.slice(0, 4).map((item) => (
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
