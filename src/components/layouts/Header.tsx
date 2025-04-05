import { siteConfig } from "@/config/site";
import MainNavigation from "./MainNavigation";
import MobileNavigation from "./MobileNavigation";
import { ModeToggle } from "../mode-toggle";

const Header = () => {
  return (
    <header className=" border-b w-full">
      <nav className=" container mx-auto flex h-16 items-center">
        <MainNavigation items={siteConfig.mainNav} />
        <MobileNavigation items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4 mr-8 lg:mr-0">
           <ModeToggle />
        </div>
       
      </nav>
    </header>
  );
};

export default Header;
