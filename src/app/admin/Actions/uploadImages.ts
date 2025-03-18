"use server";
import { supabase } from "@/db/supabase";
import { db } from "@/db";
import { images } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SelectImageCategory } from "@/db/queries/select";

export async function uploadImageAction(file: File, catid: number) {
  try {
    if (!file || !catid) return { error: "File and category are required" };

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`; // Store inside `uploads/` folder in Supabase Storage

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("image") // Replace "image" with your bucket name
      .upload(filePath, file);

    if (error) throw error;

    // Get the public URL of the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from("image")
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    // Store the image URL in the database
    await db.insert(images).values({ url: filePath, catid }).execute(); // Replace '1' with the appropriate category ID

    return { success: "Image uploaded successfully", url: publicUrl };
  } catch (err) {
    console.error("Upload failed:", err);
    return { error: "Failed to upload image" };
  }
}

export async function deleteImageAction(imageId: number) {
  try {
    // Fetch the image record from the database
    const imageRecord = await db
      .select({ url: images.url })
      .from(images)
      .where(eq(images.id, imageId))
      .limit(1);

    if (!imageRecord.length) {
      return { error: "Image not found" };
    }

    const filePath = imageRecord[0].url; // Ensure we stored only the path, not the full URL

    // Delete the file from Supabase Storage
    const { error: deleteError } = await supabase.storage
      .from("image")
      .remove([filePath]);

    if (deleteError) {
      console.error("Supabase delete error:", deleteError);
      return { error: "Failed to delete image from storage" };
    }

    // Remove the record from the database
    await db.delete(images).where(eq(images.id, imageId)).execute();

    return { success: "Image deleted successfully" };
  } catch (err) {
    console.error("Delete failed:", err);
    return { error: "Failed to delete image" };
  }
}

export async function fetchImages() {
  const data = await SelectImageCategory();

  return data.map((file) => ({
    id: file.id,
    name: file.url,
    catid:file.catid,
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/image/${file.url}`,
  }));
}
