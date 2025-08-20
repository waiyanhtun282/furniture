import { Icons } from "@/components/Icons";
import { Link } from "react-router";
import Banner from "@/data/images/house.webp";
import LoginForm from "@/components/auth/LoginForm";
function Login() {
  return (
    <div className="relative">
      <Link
        to="/"
        className="text-foreground/80 hover:text-foreground fixed top-6 left-8 flex items-center text-lg font-bold tracking-tight"
      >
        <Icons.logo className="mr-2 size-6" aria-hidden="true" />
        <span className="">Furniture Shop</span>
      </Link>
      <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="grid size-full place-items-center">
          <div className="md:w-96 w-86">
            <LoginForm />
          </div>
        </div>
        <div className="relative hidden   lg:block">
          <img
            src={Banner} 
            alt="furniture Shop"
            className="absolute  w-full h-full inset-0 object-cover"
          />
        </div>
      </main>
    </div>
  );
}

export default Login