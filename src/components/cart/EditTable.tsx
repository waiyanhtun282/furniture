import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { toast } from "sonner";
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";


const quantitySchema = z.object({
  quantity: z.number().min(0).default(1)
});


export default function EditTable() {

  const form = useForm<z.infer<typeof quantitySchema>>({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      quantity: 1,
    },
  });

  function onSubmit(values: z.infer<typeof quantitySchema>) {
    console.log(values);
    toast.success("Product is added to cart successfully")
    // call api
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full gap-4 justify-between"
      >
        <div className="flex items-center">
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="size-8 shrink-0 rounded-r-none"
          >
            <Icons.minus className="size-3" aria-hidden="true" />
            <span className="sr-only">Remove one items</span>
          </Button>
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className=" space-y-0">
                <FormLabel className="sr-only">quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                 min={0}           
                          {...field}
                    className="h-8 w-16 rounded-none broder-x-0"
                  />
                </FormControl>
                <FormMessage />
                
              </FormItem>
            )}
          />
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="size-8 shrink-0 rounded-l-none"
          >
            <Icons.plus className="size-3" aria-hidden="true" />
            <span className="sr-only">Add one items</span>
          </Button>
        </div>
        <div className="space-x-2.5 flex">
          <Button
            type="button"
            aria-label="Delete"
            variant={'outline'}
            size="icon"
            className="size-8"
          >
            <Icons.trash className="size-3" aria-hidden="true" />
            <span className='sr-only'>Delete</span>
          </Button>
         
        </div>
      </form>
    </Form>
  );
}
