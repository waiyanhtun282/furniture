import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "./Icons";
import { useState } from "react";

const emailSchema = z.object({
  email: z.string().email({
    message: "Please enter  a valid your email address.",
  }),
});

export default function NwesLettersForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof emailSchema>) {
    console.log(values);
    setLoading(true);
    // call api
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full pr-8 lg:pr-0"
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative space-y-0">
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="furniture@gmail.com"
                  {...field}
                  className="pr-12"
                />
              </FormControl>
              <FormMessage />
              <Button
                size="icon"
                className="absolute top-[4px] right-[3.5px] z-20 size-7"
              >
                {loading ? (
                  <Loader2  className="animate-spin"/>
                ) : (
                  <Icons.paperPlane className="size-3" aria-hidden="true" />
                )}
                <span className="sr-only">Join newsLetter</span>
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
