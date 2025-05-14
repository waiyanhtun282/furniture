import { Products } from "@/types";
import { Button } from "@/components/ui/button";
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

interface ProuctsProps {
  product: Products;
}
function ProductsCard({ product }: ProuctsProps) {
  return (
    <Card className="size-full overflow-hidden rounded-lg">
      <Link to={`/products/${product.id}`} aria-label={product.name}>
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={1 / 1} className="bg-muted">
            <img
              src={product?.images[0]}
              alt="Prodcuts Image"
              className="size-full object-cover"
              loading="lazy"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="space-y-1.5 p-4">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            ${product.price}
            {
              product.discount > 0 && (
              <span className=" ml-2 line-through font-extrabold ">${product.discount}</span>
            )
            }
          </CardDescription>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-1">
        {product.status === "sold" ? (
          <Button
            size="sm"
            disabled={true}
            aria-label="Sold Out"
            className="h-8 w-full rounded-sm font-bold"
          >
            Sold Out
          </Button>
        ) : (
          <Button size={"sm"} className="h-8 w-full rounded-sm bg-[#3b5d50] text-white font-bold">
            <Icons.plus className="mr-2" />   Add To Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ProductsCard;
