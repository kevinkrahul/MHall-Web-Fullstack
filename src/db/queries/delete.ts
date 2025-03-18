"use server";
import { eq } from "drizzle-orm";
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
  NewImage,
  images,
} from "../schema";
import { SelectCategory, SelectFaq } from "./select";


export async function DeleteFaq(data: NewQuestion) {
  if (data.id !== undefined) {
    await db.delete(faq).where(eq(faq.id, data.id)).execute();
  } else {
    throw new Error("Invalid data: 'id' is undefined");
  }
  return await SelectFaq();
}

export async function DeleteCategory(Data: NewCategory) {
    if (Data.id !== undefined) {

  await db.delete(categories).where(eq(categories.id,Data.id)).execute();
} else {
    throw new Error("Invalid data: 'id' is undefined");
  }
  return await SelectCategory();
}

export async function DeleteCustomer(Data: NewCustomer) {
    if (Data.id !== undefined) {

  await db.delete(customers).where(eq(customers.id, Data.id)).execute();
} else {
    throw new Error("Invalid data: 'id' is undefined");
  }
}

export async function DeleteDateEvent(Data: NewDatebook) {
    if (Data.id !== undefined) {

  await db.delete(datebook).where(eq(datebook.id,Data.id)).execute();
} else {
    throw new Error("Invalid data: 'id' is undefined");
  }
}