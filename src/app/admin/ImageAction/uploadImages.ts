"use server";

import fs from "fs";
import path from "path";
import { promisify } from "util";
import { CreateImage } from "@/db/queries/insert";
import { SelectCategory } from "@/db/queries/select";
import { z } from "zod";

const writeFile = promisify(fs.writeFile);

// Define schema for validation
const imageSchema = z.object({
  file: z.instanceof(File, { message: "File is required" }),
  catid: z.string().min(1, "Category is required"),
});

export async function uploadImageAction(formData: FormData) {
  const file = formData.get("file") as File;
  const catid = formData.get("catid") as string;

  // Validate input
  const validationResult = imageSchema.safeParse({ file, catid });
  if (!validationResult.success) {
    return { error: validationResult.error.format() };
  }

  try {
    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    // Save the file to `public/uploads/`
    await writeFile(filePath, buffer);

    // Store the file path in the database
    const imageUrl = `/uploads/${fileName}`;
    await CreateImage({ url: imageUrl, catid: Number(catid) });

    return { success: "Image uploaded successfully", url: imageUrl };
  } catch (err) {
    console.error("Upload failed:", err);
    return { error: "Failed to upload image" };
  }
}

export async function fetchCategoriesAction() {
  return await SelectCategory();
}
