"use client";

import { z } from "zod";
import { useForm,Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

type FormFieldType <T>= {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
};

type DynamicFormProps<T extends z.ZodType<any, any>> = {
  schema: T;
  defaultValues: z.infer<T>;
  fields: FormFieldType<z.infer<T>>[];
  submitHandler: (values: z.infer<T>,reset:()=>void) => Promise<void>;
  loading?: boolean;
};

export default function DynamicForm<T extends z.ZodType<any, any>>({
  schema,
  defaultValues,
  fields,
  submitHandler,
  loading = false,
}: DynamicFormProps<T>) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values)=>submitHandler(values,form.reset))}
        className="space-y-4 flex flex-col items-start justify-center px-6 pb-5"
      >
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as Path<z.infer<T>>}
            render={({ field: fieldProps }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    type={field.type || "text"}
                    placeholder={field.placeholder || ""}
                    {...fieldProps}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" variant="outline">
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>

  );
}
