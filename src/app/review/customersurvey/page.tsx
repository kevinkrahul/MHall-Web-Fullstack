"use client";
import { z } from "zod";
import { useState } from "react";
import { CreateCustomer } from "@/db/queries/insert";
import DynamicForm from "@/components/form/DynamicForm";

const customerSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters" })
    .max(20, "Name must be less than 20 chracters"),
  email: z.string().email({ message: "Invalid email address" }),
  comments: z
    .string()
    .min(100, { message: "Comments must be at least 100 characters" })
    .max(250, { message: "Comments must be less than 250 characters" }),
});

const customersurvey = () => {
  const [loading, setLoading] = useState(false);

  async function handleCustomerSubmit(
    values: z.infer<typeof customerSchema>,
    reset: () => void
  ) {
    setLoading(true);
    try {
      await CreateCustomer({
        name: values.name,
        email: values.email,
        comments: values.comments,
      });
      reset();
    } catch (error) {
      console.error("Error creating Customer:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center p-4">
      <h1 className="text-xl font-bold mb-4">Please enter your thoughts </h1>
      <DynamicForm
                schema={customerSchema}
                defaultValues={{ name: "", email: "",comments:"" }}
                fields={[
                  {
                    name: "name",
                    label: "Your Name",
                    placeholder: "Enter your name",
                  },
                  {
                    name: "email",
                    label: "Your Email",
                    placeholder: "Enter your email address",
                  },
                  {
                    name: "comments",
                    label: "Review",
                    placeholder: "Enter your Thoughts here!!",
                  },
                ]}
                submitHandler={handleCustomerSubmit}
                loading={loading}
              />
    </div>
  );
};

export default customersurvey;
