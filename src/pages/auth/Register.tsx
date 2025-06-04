import RegisterForm from "@/components/auth/RegisterForm";
import { Icons } from "@/components/Icons";
import { Link } from "react-router";

function Register() {
  return (
    <div className="flex min-h-screen place-items-center">
      <Link
        to="/"
        className="text-foreground/80 hover:text-foreground fixed top-6 left-8 flex items-center text-lg font-bold tracking-tight"
      >
        <Icons.logo className="mr-2 size-6" aria-hidden="true" />
        <span className="">Furniture Shop</span>
      </Link>
      <div className="mx-auto md:w-96 w-86">
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
