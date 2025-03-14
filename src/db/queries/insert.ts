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
import { SelectFaq } from "./select";

export async function CreateFaq(data: NewQuestion) {
  await db.insert(faq).values(data).execute();
  return await SelectFaq();
}

export async function CreateCategory(Data: NewCategory) {
  await db.insert(categories).values(Data).execute();
}

export async function CreateCustomer(Data: NewCustomer) {
  await db.insert(customers).values(Data).execute();
}

export async function CreateDateEvent(Data: NewDatebook) {
  await db.insert(datebook).values(Data).execute();
}
