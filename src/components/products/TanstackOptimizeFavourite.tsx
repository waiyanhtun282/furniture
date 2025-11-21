import { useIsFetching, useMutation } from "@tanstack/react-query";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import api from "@/api";
import { queryClient } from "@/api/query";

interface FavouriteProps extends ButtonProps {
  productId: string;
  rating: number;
  isFavourite: boolean;
}

function AddToFavourite({
  productId,
  // rating,
  isFavourite,
  className,
  ...props
}: FavouriteProps) {
    const fetching =useIsFetching() > 0;
    let favourite =isFavourite ;
  const {isPending, mutate } = useMutation({
    mutationFn: async () => {
      const data = {
        productId: +productId,
        favourite: !isFavourite,
      };
      const response = await api.patch(
        "/users/products/toggle-favourite",
        data,
      );
      if (response.status !== 200) {
        console.log(response.data);
        throw new Error("Favourite Action failed. Please try again.");
      }
      return response.data;
    },
    // onSuccess: () =>{
    // Invalidate queries or perform any necessary updates
    //  queryClient.invalidateQueries({
    //     queryKey: ["products", "details", productId],
    // })
    // }
    // onError: (error) => {}

    onSettled: () => {
      // Invalidate queries or perform any necessary updates
      queryClient.invalidateQueries({
        queryKey: ["products", "details", productId],
      });
    },
  });

  if(isPending || fetching){
  favourite = !isFavourite;
  }

  return (
    <Button
      variant="secondary"
      size="icon"
      className={cn("size-4 shrink-0", className)}
      name="favourite"
      title={favourite ? "Remove from favourites" : "Add to favourites"}
      onClick={() => mutate()}
      {...props}
    >
      {favourite ? (
        <Icons.filled className="size-5 text-red-500" />
      ) : (
        <Icons.heart className="size-5" />
      )}
    </Button>
  );
}

export default AddToFavourite;
