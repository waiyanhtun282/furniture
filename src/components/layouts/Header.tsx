import { siteConfig } from "@/config/site";
import MainNavigation from "./MainNavigation";
import MobileNavigation from "./MobileNavigation";

const Header = () => {
  return (
    <header className=" border-b w-full">
      <nav className=" container flex items-center h-16 mx-auto">
        <MainNavigation  items={siteConfig.mainNav}/>
      <MobileNavigation  items={siteConfig.mainNav}/>
      </nav>
    </header>
  );
};

export default Header;
