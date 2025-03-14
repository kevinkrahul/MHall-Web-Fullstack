"use server"
import { db } from "../index";
import { NewQuestion, faq,NewCategory, categories } from "../schema";
import { SelectFaq } from "./select";

export async function CreateFaq(data: NewQuestion) {
  await db
    .insert(faq)
    .values(data)
    .execute();
    return await SelectFaq();
}

export async function CreateCategory(Data:NewCategory){
  await db.insert(categories)
  .values(Data)
  .execute();
}

