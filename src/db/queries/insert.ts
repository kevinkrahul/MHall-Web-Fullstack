"use server"
import { db } from "../index";
import { NewQuestion, faq } from "../schema";
import { SelectFaq } from "./select";

export async function CreateFaq(data: NewQuestion) {
  await db
    .insert(faq)
    .values(data)
    .execute();
    return await SelectFaq();
}

