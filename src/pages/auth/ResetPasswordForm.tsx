import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/Icons";




const FormSchema = z.object({
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 number long")
    .max(15, "Phone number must be at most 15 number long")
    .regex(/^\d+$/, "Phone number must contain only digits"),
 
});

export function ResetPasswordForm({
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
        phone: ""
       
      },
    });
      function onSubmit(values: z.infer<typeof FormSchema>) {
        // console.log(values);
        submit(values, {method: "post", action: "."});
        // setLoading(true);
        // call api
      }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link
              to="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <Icons.logo className=" mr-2 size-6" aria-hidden='true' />
              </div>
              <span className="sr-only">Furniture Shop</span>
            </Link>
            <h1 className="text-xl font-bold">Reset Password </h1>
            <div className="text-center text-sm">
                Remember your password?{" "}
              <Link to="/login" className="underline underline-offset-4">
               Sign in
              </Link>
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
              
              { actionData && (
              <p className="text-xs text-red-500">{actionData?.message}</p>
              )}

            <div className="grid gap-4">
              <Button type="submit" className="w-full mt-2">
                {isSubmitting ? "Submitting ..." : "Reset"}
              </Button>
             </div>
            </form>
            </Form>
          
          
            </div>
          
          </div>
          </div>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <Link to="#">Terms of Service</Link>{" "}
        and <Link to="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
