import { siteConfig } from "@/config/site";
import MainNavigation from "@/components/layouts/MainNavigation";
import MobileNavigation from "@/components/layouts/MobileNavigation";
import { ModeToggle } from "@/components/mode-toggle";
import AutoDropDown from "@/components/layouts/AutoDropDown";
import { User } from "@/data/user";
import CartsSheet from "@/components/layouts/CartsSheet";
import ProgressBar from "@/components/progress-bar";
const Header = () => {
  return (
    <header className=" border-b w-full top-0 fixed bg-background">
      <nav className=" container mx-auto flex h-16 items-center">
        <ProgressBar />
        <MainNavigation items={siteConfig.mainNav} />
        <MobileNavigation items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4 mr-8 lg:mr-0">
          <CartsSheet />
           <ModeToggle />
           <AutoDropDown user={User}/>
        </div>
       
      </nav>
    </header>
  );
};

export default Header;
