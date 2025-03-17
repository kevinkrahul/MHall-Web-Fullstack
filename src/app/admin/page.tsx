"use client";
import { z } from "zod";
import { useState, useEffect } from "react";
import {
  CreateCategory,
  CreateFaq,
  CreateDateEvent,
} from "../../db/queries/insert";
import DynamicForm from "@/components/form/DynamicForm";
import {
  uploadImageAction,
  fetchCategoriesAction,
} from "@/app/admin/ImageAction/uploadImages";
import { Button } from "@/components/ui/button";

type Category = {
  id: number;
  name: string;
};

const faqSchema = z.object({
  question: z
    .string()
    .min(5, { message: "Question must be at least 5 characters." }),
  answer: z
    .string()
    .min(5, { message: "Answer must be at least 5 characters." }),
});
const dateSchema = z.object({
  date: z.string(),
  eventname: z
    .string()
    .min(5, { message: "Event must be at least 5 characters." }),
  notes: z
    .string()
    .min(20, { message: "Notes must be at least 20 characters." }),
});

const categorySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Category must be at least 2 characters." }),
});

export default function Admin() {
  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [dateLoading, setDateLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [catid, setCatid] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      const data = await fetchCategoriesAction();
      setCategories(
        data.filter((category) => category.name !== null) as Category[]
      );
    }
    fetchCategories();
  }, []);

  async function handleImageSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!file || !catid) {
      setMessage("Please select a file and category.");
      return;
    }

    setImageLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("catid", catid);

    const result = await uploadImageAction(formData);

    if (result.success) {
      setMessage("Image uploaded successfully!");
      setFile(null);
      setCatid("");
    } else {
      setMessage("Upload failed.");
    }

    setImageLoading(false);
  }

  async function handleFaqSubmit(
    values: z.infer<typeof faqSchema>,
    reset: () => void
  ) {
    setLoading(true);
    try {
      await CreateFaq({
        questions: values.question,
        answers: values.answer,
      });
      reset();
    } catch (error) {
      console.error("Error creating FAQ:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCategorySubmit(
    values: z.infer<typeof categorySchema>,
    reset: () => void
  ) {
    setCategoryLoading(true);
    try {
      await CreateCategory({
        name: values.name,
      });
      reset();
    } catch (error) {
      console.error("Error creating Category:", error);
    } finally {
      setCategoryLoading(false);
    }
  }

  async function handleDateSubmit(
    values: z.infer<typeof dateSchema>,
    reset: () => void
  ) {
    setDateLoading(true);
    try {
      await CreateDateEvent({
        date: new Date(values.date),
        eventname: values.eventname,
        notes: values.notes,
      });
      reset();
    } catch (error) {
      console.error("Error creating Date Event:", error);
    } finally {
      setDateLoading(false);
    }
  }

  return (
    <>
      {/* FAQ */}
      <div>
        <h1 className="text-xl font-bold mb-4">FAQ Form</h1>
        <DynamicForm
          schema={faqSchema}
          defaultValues={{ question: "", answer: "" }}
          fields={[
            {
              name: "question",
              label: "Question",
              placeholder: "Enter your question",
            },
            {
              name: "answer",
              label: "Answer",
              placeholder: "Enter your answer",
            },
          ]}
          submitHandler={handleFaqSubmit}
          loading={loading}
        />
      </div>
      {/* Category */}
      <div>
        <h1 className="text-xl font-bold mb-4">Category Form</h1>
        <DynamicForm
          schema={categorySchema}
          defaultValues={{ name: "" }}
          fields={[
            {
              name: "name",
              label: "Category",
              placeholder: "Create a new category",
            },
          ]}
          submitHandler={handleCategorySubmit}
          loading={categoryLoading}
        />
      </div>
      {/* DAte */}
      <div>
        <h1 className="text-xl font-bold mb-4">FAQ Form</h1>
        <DynamicForm
          schema={dateSchema}
          defaultValues={{
            date: new Date().toISOString(),
            eventname: "",
            notes: "",
          }}
          fields={[
            {
              name: "date",
              label: "Pick a Date",
              placeholder: "Select the date",
              type: "date",
            },
            {
              name: "eventname",
              label: "Eventname",
              placeholder: "Enter the eventname",
            },
            {
              name: "notes",
              label: "Notes",
              placeholder: "Enter the Summery of the event",
            },
          ]}
          submitHandler={handleDateSubmit}
          loading={dateLoading}
        />
      </div>
      {/* Image */}
      <div>
        <h1 className="text-xl font-bold mb-4">Upload Image</h1>
        {message && <p className="text-red-500">{message}</p>}
        <form
          onSubmit={handleImageSubmit}
          className="space-y-4 flex flex-col items-start justify-center px-6 pb-5"
        >
          {/* File Input */}
          <div className="flex flex-col gap-3">
            <label className="block text-sm font-medium">Choose a Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0] || null;
                setFile(selectedFile);
              }}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col gap-3">
            <label className="block text-sm font-medium">Select Category</label>
            <select
              value={catid}
              onChange={(e) => setCatid(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="">Choose a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="outline">
            {imageLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </>
  );
}
