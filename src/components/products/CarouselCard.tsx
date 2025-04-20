import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Products } from "@/types";
import { Link } from "react-router";
interface ProductsProps {
  products: Products[];
}
export default function CarouselCard({ products }: ProductsProps) {
  //  const plugin = React.useRef(
  //    Autoplay({ delay: 2000, stopOnInteraction: true }),
  //  );

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-full"
      //   onMouseEnter={plugin.current.stop}
      //   onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="-ml-1">
        {products.map((product) => (
          <CarouselItem key={product.id} className="pl-1 lg:basis-1/3">
            <div className="flex gap-4 p-4 lg:px-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="size-28 rounded-md"
              />
              <div className="">
                <h2 className="text-sm font-bold">{product.name}</h2>
                <p className="my-2 text-sm text-gray-600">
                  {product.description.length > 55
                    ? product.description.substring(0, 55)  + " ....."
                    : product.description}
                </p>
                <Link
                  to={`products/${product.id}`}
                  className="text-sm font-bold text-[#3b5d50] hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
