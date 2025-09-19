
import Autoplay from "embla-carousel-autoplay";


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

const imageUrl =import.meta.env.VITE_IMAGE_URL;

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
      <CarouselContent className="-ml-1 ">
        {products.map((product) => (
          <CarouselItem key={product.id} className="pl-1 lg:basis-1/3">
            <div className="flex gap-4 p-4 lg:px-4">
              <img
                src={imageUrl + product.images[0].path}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="size-28 rounded-md"
              />
              <div className="">
                <h2 className="text-sm font-bold line-clamp-1">{product.name}</h2>
                <p className="my-2 text-sm text-gray-600 line-clamp-2">
                  {product.description}
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
