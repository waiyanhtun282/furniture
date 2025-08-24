import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSubmit, useNavigation, useActionData, Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Icons } from "../Icons";
import { cn } from "@/lib/utils";
import { RegisterForm } from '@/components/auth/RegisterForm';

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time otp must be 6 characters.",
  }),
});

export function OTPForm({className, ...props}: React.ComponentProps<"div">) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData() as {
    error?: string;
    message?: string;
  };

  const isSubmitting = navigation.state === "submitting";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    submit(data, { method: "POST", action: "/register/otp" });
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
                  <span className="sr-only"> Otp Verifty Form</span>
                </Link>
                <h1 className="  mb-6 text-xl font-bold">We 've already sent OTP to your phone</h1>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time OTP sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {actionData && (
          <p className="text-xs text-red-500">{actionData?.message}</p>
        )}
       <div className="grid gap-4">
              <Button type="submit" className="w-full mt-2">
                {isSubmitting ? "Submitting ..." : "Verify_OTP"}
              </Button>
      </div>
      </form>
    </Form>
    </div>
    </div>
    </div>
  );
}
