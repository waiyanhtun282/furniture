import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link } from "react-router";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Icons } from "../Icons";
import { FormatPrice,cn } from "@/lib/utils";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";


interface ProuctsProps extends React.HTMLAttributes<HTMLDivElement>{
  product: Product;
}
const imageUrl = import.meta.env.VITE_IMAGE_URL;

function ProductsCard({ product ,className}: ProuctsProps) {
  const { carts ,addItem} =useCartStore();

  const cartItem =carts.find((item) => item.id === product.id);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.path || "",
      quantity: 1,
    })
  }

  return (
    <Card className={cn("size-full overflow-hidden rounded-lg",className)}>
      <Link to={`/products/${product.id}`} aria-label={product.name}>
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={1 / 1} className="bg-muted">
            <img
              src={imageUrl + product?.images[0].path}
              alt="Prodcuts Image"
              className="size-full object-contain"
              loading="lazy"
              decoding="async"  
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="space-y-1.5 p-4">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            {FormatPrice(product.price, )}
            {product.discount > 0 && (
              <span className="ml-2 font-extrabold line-through">
                {FormatPrice(product.discount)}
              </span>
            )}
          </CardDescription>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-1">
        {product.status === "DEACTIVE" ? (
          <Button
            size="sm"
            disabled={true}
            aria-label="Sold Out"
            className="h-8 w-full rounded-sm font-bold"
          >
            Sold Out
          </Button>
        ) : (
          <Button
            size={"sm"}
            className="h-8 w-full rounded-sm bg-[#3b5d50] font-bold text-white"
            onClick={handleAddToCart} disabled={!!cartItem}
          >
           {!cartItem && <Icons.plus className="mr-2" /> } 
           {!cartItem ? "Add To Cart" : " Added Cart"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ProductsCard;
