"use server";
import { db } from "../index";
import { categories, customers, datebook, faq, images } from "../schema";
import { eq } from "drizzle-orm";

export async function SelectFaq() {
  return await db
    .select({
      id: faq.id,
      questions: faq.questions,
      answers: faq.answers,
    })
    .from(faq);
}

export async function SelectImageCategory() {
  return await db
    .select({
      id: images.id,
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

export async function SelectCustomer() {
  return await db
    .select({
      id: customers.id,
      name: customers.name,
      email: customers.email,
      comments: customers.comments,
    })
    .from(customers);
}

export async function SelectDateEvent() {
  return await db
    .select({
      id: datebook.id,
      date: datebook.date,
      eventname: datebook.eventname,
      notes: datebook.notes,
    })
    .from(datebook);
}
