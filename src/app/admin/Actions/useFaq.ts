"use client";
import { z } from "zod";
import { useState, useEffect } from "react";
import { SelectFaq } from "@/db/queries/select";
import { UpdateFaq } from "@/db/queries/update";
import { CreateFaq } from "@/db/queries/insert";
import { DeleteFaq } from "@/db/queries/delete";
import { useEditing } from "./editingHook";

type Faq = { id: number; questions: string; answers: string };

const faqSchema = z.object({
  question: z
    .string()
    .min(5, { message: "Question must be at least 5 characters." }),
  answer: z
    .string()
    .min(5, { message: "Answer must be at least 5 characters." }),
});

export default function useFaq() {
  const [faqloading, setFaqLoading] = useState(false);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const { editingItem, setEditingItem} = useEditing();


  useEffect(() => {
    async function fetchCategories() {
      setFaqs(await SelectFaq());
    }
    fetchCategories();
  }, []);

  async function handleFaqSubmit(
    values: z.infer<typeof faqSchema>,
    reset: () => void
  ) {
    setFaqLoading(true);
    try {
      if (editingItem?.type === "faq") {
        await UpdateFaq({
          id: editingItem.id,
          questions: values.question,
          answers: values.answer,
        });
      } else {
        await CreateFaq({
          questions: values.question,
          answers: values.answer,
        });
      }
      setFaqs(await SelectFaq());
      setEditingItem(null);
      reset();
    } catch (error) {
      console.error("Error creating FAQ:", error);
    } finally {
      setFaqLoading(false);
    }
  }

  async function handleDeleteFaq(id: number) {
    await DeleteFaq({
      id,
      questions: "",
      answers: "",
    });
    setFaqs(await SelectFaq());
  }

  return {
    faqSchema,
    faqs,
    handleDeleteFaq,
    handleFaqSubmit,
    faqloading,
  };
}
