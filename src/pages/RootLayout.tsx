import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className=" flex  flex-col min-h-screen  overflow-hidden">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default RootLayout