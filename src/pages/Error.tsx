import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";

function Error() {
  return (
    <main className=" mx-auto flex flex-1 items-center ">
      <Card className="w-[350px] lg:w-[500px]">
        <CardHeader>
            <CardTitle className="text-center">Oops!</CardTitle>
          <CardDescription className=" text-center">
            An error occurs accidently!
          </CardDescription>
        </CardHeader>

        <CardFooter className="mx-auto">
          <Button variant="outline" asChild>
            <Link to='/'>Go to Home Page</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

export default Error;
