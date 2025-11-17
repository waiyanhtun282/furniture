import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";

interface FavouriteProps extends ButtonProps {
  productId: number;
  rating?: number;
}

function AddToFavourite({
  productId,
  rating,
  className,
  ...props
}: FavouriteProps) {
  return (
    <div>
      <Button
        variant="secondary"
        size="icon"
        className={cn("size-4 shrink-0", className)}
        {...props}
      >
        {/* <Icons.heart className="size-4" /> */}
        <Icons.filled className="size-6 text-red-500" />
      </Button>
    </div>
  );
}

export default AddToFavourite;
