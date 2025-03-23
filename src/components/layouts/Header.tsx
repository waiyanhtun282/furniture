import { siteConfig } from "@/config/site";
import MainNavigation from "./MainNavigation";

const Header = () => {
  return (
    <header className=" border-b w-full">
      <nav className=" container flex items-center h-16">
        <MainNavigation  items={siteConfig.mainNav}/>
      </nav>
    </header>
  );
};

export default Header;
