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
import { Link } from "react-router";
import { siteConfig } from "@/config/site";


interface MainNavProps {
  items?: MainNavItem[];
}
export default function MobileNavigation({ items }: MainNavProps) {
  return (
    <div className="lg:hidden ">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-4 size-5">
            <Icons.Menu />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className=" pl-4 pt-9">
          <SheetClose asChild>
            <Link to="/" className=" flex items-center">
              <Icons.logo className="size-4 mr-2" />
              <span className="font-bold">{siteConfig.name}</span>
              <span className="sr-only">Home</span>
            </Link>
          </SheetClose>
          <ScrollArea className=" my-4 h-[calc(100vh-8rem)] pb-8 ">

          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
