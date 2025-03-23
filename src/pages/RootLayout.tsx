import Header from "@/components/layouts/Header";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
  <div className=" flex  flex-col min-h-screen">
    <Header />
    <Outlet />
  </div>
);
}

export default RootLayout