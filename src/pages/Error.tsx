import { Icons } from "@/components/Icons";
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
    <main className="mx-auto flex flex-1 items-center my-32">
      <Card className="w-[350px] lg:w-[500px] ">
        <CardHeader className="grid place-items-center gap-2">
          <div className="border-muted-foreground/70 mt-2 mb-4 grid size-20 place-items-center rounded-full border border-dashed  md:size-24">
            <Icons.excleamationIcon
              className="text-muted-foreground/70 size-6 md:size-10"
              aria-hidden="true"
            />
          </div>
          <CardTitle className="text-center">Oops!</CardTitle>
          <CardDescription className="text-center">
            An error occurs accidently!
          </CardDescription>
        </CardHeader>

        <CardFooter className="mx-auto">
          <Button variant="outline" asChild>
            <Link to="/">Go to Home Page</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

export default Error;
