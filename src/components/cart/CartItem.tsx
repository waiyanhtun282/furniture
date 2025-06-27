import { FormatPrice } from "@/lib/utils";
import {Cart} from  "@/types/index";
import { Separator } from "@/components/ui/separator";
import EditTable from "@/components/cart/EditTable";

interface CartItemProps {
  cart:Cart;
}
function CartItem({cart}:CartItemProps) {
  return (
    <div className="space-y-3 ">
    
        <div className="flex gap-4 mt-4 mb-2">
          <img
            src={cart.image.url}
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
            <span className="text-muted-foreground line-clamp-1 text-xs capitalize">
              {`${cart.category} / ${cart.subcategory}`}
            </span>
          </div>
        </div>
       
        <EditTable />
       
       <Separator />
      
    </div>
  );
}

export default CartItem