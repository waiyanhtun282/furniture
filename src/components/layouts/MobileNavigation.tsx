import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MainNavItem } from "@/types";
import { Icons } from "../Icons";


interface MainNavProps {
  items?: MainNavItem[];
}
export default function MobileNavigation({ items }: MainNavProps) {
  return (
    <div className="lg:hidden ">
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size='icon' className="ml-4 size-5">
          <Icons.Menu />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className=" pl-1 pr-0 pt-9">
        
        
      </SheetContent>
    </Sheet>
    </div>
  );
}
