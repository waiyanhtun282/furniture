import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MainNavItem } from "@/types";
import { Icons } from "../Icons";
import { Link } from "react-router";
import { siteConfig } from "@/config/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { it } from "node:test";

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
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>{items?.[0].title}</AccordionTrigger>
                <AccordionContent>
                  <div className=" flex flex-col space-y-2 pl-2">
                    {items?.[0].card?.map((item) => (
                      <SheetClose asChild key={item.title}>
                        <Link to={item.href} className=" text-foreground/70">
                          {item.title}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className=" flex flex-col space-y-2  mt-4">
              {items?.[0].menu?.map((item) => (
                <SheetClose asChild key={item.title}>
                  <Link to={item.href} >
                    {item.title}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
