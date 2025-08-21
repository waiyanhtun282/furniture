import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Link ,useActionData,useNavigate,useSubmit} from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "./Password-Input";
import { p } from "node_modules/react-router/dist/development/context-DohQKLID.d.mts";

const FormSchema = z.object({
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 number long")
    .max(15, "Phone number must be at most 15 number long")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  password: z
    .string()
    .min(8, "Password must be  8 digits")
    .max(8, "Password must be at most 8  digitslong")
    .regex(/^\d+$/, "Password must contain only number"),
});

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const submit = useSubmit();
    const navigation =useNavigate();
    const actionData  =useActionData() as {
      error?:string;
      message?: string;
    };
     
    const isSubmitting = navigation.state === "submitting";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof FormSchema>) {
    // console.log(values);
    submit(values, {method: "post", action: "/login"});
    // setLoading(true);
    // call api
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="">
        <CardHeader>
          <CardTitle>Sign In </CardTitle>
          <CardDescription>
            Enter your phone number below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
              autoComplete="off"
            >
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="09****"
                        required
                        inputMode="numeric"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        to="/reset"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput
                      // placeholder="********"  
                        // type="password"
                        required
                        inputMode="numeric"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {actionData && (
              <p className=" text-red-500">{actionData.message}</p>
              )}
            <div className="grid gap-4">
              <Button type="submit" className="w-full mt-2">
                {isSubmitting ? "Submitting ..." : "Sign In"}
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-background text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              <Button variant="outline" className="w-full">
                Sign in with Google
              </Button>
              </div>
            </form>
          </Form>
          
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
}
