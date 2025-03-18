"use server";
import { db } from "../index";
import {
  NewQuestion,
  faq,
  NewCategory,
  categories,
  NewCustomer,
  customers,
  NewDatebook,
  datebook,
} from "../schema";
import { SelectCategory, SelectFaq } from "./select";
import { eq } from "drizzle-orm";

export async function UpdateFaq(data: NewQuestion) {
  if (data.id === undefined) {
    throw new Error("FAQ ID is required for updating.");
  }
  await db.update(faq).set(data).where(eq(faq.id, data.id)).execute();
  return await SelectFaq();
}

export async function UpdateCategory(Data: NewCategory) {
  if (Data.id === undefined) {
    throw new Error("FAQ ID is required for updating.");
  }
  await db
    .update(categories)
    .set(Data)
    .where(eq(categories.id, Data.id))
    .execute();
  return await SelectCategory();
}

export async function UpdateDateEvent(Data: NewDatebook) {
  if (Data.id === undefined) {
    throw new Error("FAQ ID is required for updating.");
  }
  await db.update(datebook).set(Data).where(eq(datebook.id, Data.id)).execute();
}
