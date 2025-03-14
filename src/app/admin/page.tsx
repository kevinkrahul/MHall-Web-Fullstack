"use client";
import { z } from "zod";
import { useState } from "react";
import {
  CreateCategory,
  CreateFaq,
  CreateDateEvent,
} from "../../db/queries/insert";
import DynamicForm from "@/components/form/DynamicForm";

const faqSchema = z.object({
  question: z
    .string()
    .min(5, { message: "Question must be at least 5 characters." }),
  answer: z
    .string()
    .min(5, { message: "Answer must be at least 5 characters." }),
});
const dateSchema = z.object({
  date: z
    .string(),
    eventname: z
    .string()
    .min(5, { message: "Event must be at least 5 characters." }),
    notes: z
    .string()
    .min(20, { message: "Notes must be at least 20 characters." }),
    
});

const categorySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Category must be at least 2 characters." }),
});

export default function Admin() {
  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [dateLoading,setDateLoading] = useState(false);

  async function handleFaqSubmit(
    values: z.infer<typeof faqSchema>,
    reset: () => void
  ) {
    setLoading(true);
    try {
      await CreateFaq({
        questions: values.question,
        answers: values.answer,
      });
      reset();
    } catch (error) {
      console.error("Error creating FAQ:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCategorySubmit(
    values: z.infer<typeof categorySchema>,
    reset: () => void
  ) {
    setCategoryLoading(true);
    try {
      await CreateCategory({
        name: values.name,
      });
      reset();
    } catch (error) {
      console.error("Error creating Category:", error);
    } finally {
      setCategoryLoading(false);
    }
  }

  async function handleDateSubmit(values:z.infer<typeof dateSchema>,reset:()=>void){
    setDateLoading(true);
    try{
      await CreateDateEvent({
        date: new Date(values.date),
        eventname:values.eventname,
        notes:values.notes,
      })
      reset();
    }
    catch(error){
      console.error("Error creating Date Event:",error)
    }
    finally{
      setDateLoading(false);
    }
  }

  return (
    <>
    {/* FAQ */}
      <div>
        <h1 className="text-xl font-bold mb-4">FAQ Form</h1>
        <DynamicForm
          schema={faqSchema}
          defaultValues={{ question: "", answer: "" }}
          fields={[
            {
              name: "question",
              label: "Question",
              placeholder: "Enter your question",
            },
            {
              name: "answer",
              label: "Answer",
              placeholder: "Enter your answer",
            },
          ]}
          submitHandler={handleFaqSubmit}
          loading={loading}
        />
      </div>
      {/* Category */}
      <div>
        <h1 className="text-xl font-bold mb-4">Category Form</h1>
        <DynamicForm
          schema={categorySchema}
          defaultValues={{ name: "" }}
          fields={[
            {
              name: "name",
              label: "Category",
              placeholder: "Create a new category",
            },
          ]}
          submitHandler={handleCategorySubmit}
          loading={categoryLoading}
        />
      </div>
      {/* DAte */}
      <div>
        <h1 className="text-xl font-bold mb-4">FAQ Form</h1>
        <DynamicForm
          schema={dateSchema}
          defaultValues={{ date: new Date().toISOString(), eventname: "", notes: "" }}
          fields={[
            {
              name: "date",
              label: "Pick a Date",
              placeholder: "Select the date",
              type:"date"
            },
            {
              name: "eventname",
              label: "Eventname",
              placeholder: "Enter the eventname",
            },
            {
              name: "notes",
              label: "Notes",
              placeholder: "Enter the Summery of the event",
            }
          ]}
          submitHandler={handleDateSubmit}
          loading={dateLoading}
        />
      </div>
    </>
  );
}
