import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmit, useNavigation, useActionData, Link } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "../Icons";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "./Password-Input";
const FormSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be  8 digits")
    .max(8, "Password must be at most 8  digitslong")
    .regex(/^\d+$/, "Password must contain only number"),
  confirmPassword: z
    .string()
    .min(8, "Password must be  8 digits")
    .max(8, "Password must be at most 8  digitslong")
    .regex(/^\d+$/, "Password must contain only number"),
});

export function ConfirmPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {


  const submit = useSubmit();
      const navigation = useNavigation();
      const actionData  = useActionData() as {
        error?: string;
        message?: string;
      };
       
      const isSubmitting = navigation.state === "submitting";
  
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        password: "",
        confirmPassword: "",
      },
    });
    function onSubmit(values: z.infer<typeof FormSchema>) {
      // console.log(values);
      submit(values, { method: "post", action: "/register/confirm-password" });
      // setLoading(true);
      // call api
    }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Link to="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
              <Icons.logo className="h-6 w-6" />
            </div>
            <span className="sr-only">Welocome to Confirm-Password</span>
          </Link>
          <h1 className="text-xl font-bold">Please confirm your password</h1>
          <div className="text-center text-sm">
            Password must be 8 digits long and contain only numbers.They must
            match
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
                autoComplete="off"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>ConfirmPassword</FormLabel>
                        
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
                  <p className="text-xs text-red-500">{actionData?.message}</p>
                )}
                <div className="grid gap-4">
                  <Button type="submit" className="mt-4 w-full">
                    {isSubmitting ? "Submitting ..." : "Confirm"}
                  </Button>
                  

                  
                </div>
              </form>
            </Form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
