"use client";
import { z } from "zod";
import { useState, useEffect } from "react";
import { SelectCategory } from "@/db/queries/select";
import { UpdateCategory } from "@/db/queries/update";
import { CreateCategory } from "@/db/queries/insert";
import { DeleteCategory } from "@/db/queries/delete";
import { useEditing } from "./editingHook";

type Category = {
  id: number;
  name: string;
};

const categorySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Category must be at least 2 characters." }),
});

export default function useCategories() {
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { editingItem, setEditingItem } = useEditing();

  useEffect(() => {
    async function fetchCategories() {
      const data = await SelectCategory();
      setCategories(
        data.filter((category) => category.name !== null) as Category[]
      );
    }
    fetchCategories();
  }, []);

  async function handleCategorySubmit(
    values: z.infer<typeof categorySchema>,
    reset: () => void
  ) {
    setCategoryLoading(true);
    try {
      if (editingItem?.type === "category") {
        await UpdateCategory({ id: editingItem.id, name: values.name });
      } else {
        await CreateCategory({
          name: values.name,
        });
      }
      setEditingItem(null);
      const categories = await SelectCategory();
      setCategories(
        categories.filter((category) => category.name !== null) as Category[]
      ); // Filter out null names
      reset();
    } catch (error) {
      console.error("Error creating Category:", error);
    } finally {
      setCategoryLoading(false);
    }
  }

  async function handleDeleteCategory(id: number) {
    await DeleteCategory({ id });
    const data = await SelectCategory();
    setCategories(
      data.filter((category) => category.name !== null) as Category[]
    );
  }

  return {
    categories,
    categoryLoading,
    handleCategorySubmit,
    handleDeleteCategory,
    categorySchema,
  };
}
