"use client"
import { z } from "zod";
import { useState } from "react";
import { CreateFaq } from "../../db/queries/insert";
import DynamicForm from "@/components/form/DynamicForm";

const faqSchema = z.object({
  question: z.string().min(5, { message: "Question must be at least 5 characters." }),
  answer: z.string().min(2, { message: "Answer must be at least 2 characters." }),
});

export default function Admin() {
  const [loading, setLoading] = useState(false);

  async function handleFaqSubmit(values: z.infer<typeof faqSchema>) {
    setLoading(true);
    try {
      await CreateFaq({
        questions: values.question,
        answers: values.answer,
      });
    } catch (error) {
      console.error("Error creating FAQ:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">FAQ Form</h1>
      <DynamicForm
        schema={faqSchema}
        defaultValues={{ question: "", answer: "" }}
        fields={[
          { name: "question", label: "Question", placeholder: "Enter your question" },
          { name: "answer", label: "Answer", placeholder: "Enter your answer" },
        ]}
        submitHandler={handleFaqSubmit}
        loading={loading}
      />
    </div>
  );
}
