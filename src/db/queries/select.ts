"use server";
import { db } from "../index";
import { faq } from "../schema";

export async function SelectFaq() {
  return await db
    .select({
      questions: faq.questions,
      answers: faq.answers,
    })
    .from(faq);
}
