import Header from "@/components/layouts/Header";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className=" flex min-h-screen flex-col ">
      <Header />
      <Outlet />
    </div>
  );
}

export default RootLayout