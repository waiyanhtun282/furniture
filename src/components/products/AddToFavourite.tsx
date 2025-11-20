import { useFetcher } from "react-router";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";

interface FavouriteProps extends ButtonProps {
  productId: number;
  rating: number;
  isFavourite:boolean;
}

function AddToFavourite({
  productId,
  // rating,
  isFavourite,
  className,
  ...props
}: FavouriteProps) {
  
  const fetcher = useFetcher({key:`product:${productId}`});

  return (
    <fetcher.Form method="post">
      <Button
        variant="secondary"
        size="icon"
        className={cn("size-4 shrink-0", className)}
        name="favourite"
        value={isFavourite ? "false" : "true"}
        title={ isFavourite ? "Remove from favourites" : "Add to favourites"}
        {...props}
      >
        {
          isFavourite ? (
        <Icons.filled className="size-5 text-red-500" />

          ):(
         <Icons.heart className="size-5" /> 

          )
        }
      </Button>
    </fetcher.Form>
  );
}

export default AddToFavourite;
