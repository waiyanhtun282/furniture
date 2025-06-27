import { Link } from "react-router";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cartItems } from "@/data/carts";
import { Icons } from "@/components/Icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartItem from "@/components/cart/CartItem";
import { FormatPrice } from "@/lib/utils";
export default function CartsSheet() {
  const itemCount = 4;
  const amountTotal = 190;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          aria-hidden="true"
        >
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 size-6 animate-bounce justify-center rounded-full"
            aria-label="Open cart"
          > 
            {itemCount}
          </Badge>
          <Icons.cart className="size-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:max-w-lg px-3">
        <SheetHeader className="">
          <SheetTitle className="mx-auto">Cart - {itemCount}</SheetTitle>
        </SheetHeader>
        <Separator className="my-2" />
        {cartItems.length > 0 ? (
          <ScrollArea className="  my-4 h-[90vh]  pb-8">
            <div className="flex-1">
              {cartItems.map((cart) => (
                <CartItem cart={cart} key={cart.id}/>
              ))}
            </div>
            <div className="space-y-1.5 text-sm ">
              <Separator className="my-2" />
              <div className=" flex justify-between">
                <span>Shipping</span>
                <span>Fee</span>
              </div>
              <div className=" flex justify-between">
                <span>Taxes</span>
                <span>Ccalculated to Checekout</span>
              </div>
              <div className=" flex justify-between">
                <span>Total</span>
                <span>{FormatPrice(amountTotal.toFixed(2))}</span>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit" asChild className="w-full">
                    <Link to="/checkout" aria-label="Checkout">
                      Checkout to Checkout
                    </Link>
                  </Button>
                </SheetClose>
              </SheetFooter>
            </div>
          </ScrollArea>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <Icons.cart className="text-muted-foreground mb-4 size-16" />

            <p className="text-muted-foreground text-xl font-medium">
              Your cart is empty
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
