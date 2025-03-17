"use server";
import { url } from "inspector";
import { db } from "../index";
import { categories, faq, images } from "../schema";
import { eq } from "drizzle-orm"; // Adjust the import path based on your setup
import { number } from "zod";

export async function SelectFaq() {
  return await db
    .select({
      questions: faq.questions,
      answers: faq.answers,
    })
    .from(faq);
}

export async function SelectImageCategory() {
  return await db
    .select({
      catid: images.catid,
      url: images.url,
      categories_name: categories.name,
    })
    .from(images)
    .innerJoin(categories, eq(images.catid, categories.id));
}

export async function SelectCategory() {
  return await db
    .select({ id: categories.id, name: categories.name })
    .from(categories);
}
