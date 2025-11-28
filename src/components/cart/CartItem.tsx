import { FormatPrice } from "@/lib/utils";
import {Cart} from  "@/types/index";
import { Separator } from "@/components/ui/separator";
import EditTable from "@/components/cart/EditTable";
import { useCartStore } from "@/store/cartStore";

interface CartItemProps {
  cart:Cart;
}

const imageUrl = import.meta.env.VITE_IMAGE_URL;
function CartItem({cart}:CartItemProps) {
  
  const { updateItem, removeItem } = useCartStore();

  const updateHandler = (quantity:number) => {
    updateItem(cart.id, quantity);
  };

  const deleteHandler = () => {
    removeItem(cart.id);
  };

  return (
    <div className="space-y-3 ">
    
        <div className="flex gap-4 mt-4 mb-2">
          <img
            src={imageUrl + cart.image}
            loading="lazy"
            decoding="async"
            alt="cart picture"
            className="w-16 object-cover"
          />
          <div className="flex flex-col space-y-1">
            <span className="line-clamp-1 text-sm font-medium">
              {cart.name}
            </span>
            <span className="text-muted-foreground text-xs">
              {FormatPrice(cart.price)} x{cart.quantity} =
              {FormatPrice((cart.price * cart.quantity).toFixed(2))}
            </span>
            {/* <span className="text-muted-foreground line-clamp-1 text-xs capitalize">
              {`${cart.category} / ${cart.subcategory}`}
            </span> */}
          </div>
        </div>
       
        <EditTable  onDelete ={deleteHandler} quantity={cart.quantity} onUpdate={updateHandler}/>
       
       <Separator />
      
    </div>
  );
}

export default CartItem