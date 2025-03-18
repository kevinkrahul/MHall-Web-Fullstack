"use client";
import { useState } from "react";
import DynamicForm from "@/components/form/DynamicForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useCategories from "./Actions/useCategories";
import useFaq from "./Actions/useFaq";
import useCustomer from "./Actions/useCustomer";
import useImage from "./Actions/useImage";
import useDateEvent from "./Actions/useDateEvent";
import { useEditing } from "./Actions/editingHook";

export default function Admin() {
  const {
    categories,
    categoryLoading,
    handleCategorySubmit,
    handleDeleteCategory,
    categorySchema,
  } = useCategories();
  const { faqSchema, faqs, handleDeleteFaq, handleFaqSubmit, faqloading } =
    useFaq();
  const { customer, handleDeleteCustomer } = useCustomer();
  const {
    imageLoading,
    image,
    setFile,
    handleDeleteImage,
    setCatid,
    message,
    catid,
    handleImageSubmit,
  } = useImage();
  const {
    dateLoading,
    dateSchema,
    dateEvents,
    handleDateSubmit,
    handleDeleteDateEvent,
  } = useDateEvent();

  const { editingItem, setEditingItem, clearEditingItem } = useEditing();

  return (
    <>
      {/* FAQ */}
      <div>
        <h1 className="text-xl font-bold mb-4">
          {editingItem?.type === "faq" ? "Edit FAQ" : "Create FAQ"}
        </h1>
        <DynamicForm
          key={editingItem?.id || "new"}
          schema={faqSchema}
          defaultValues={
            editingItem?.type === "faq"
              ? {
                  question: editingItem.data.questions,
                  answer: editingItem.data.answers,
                }
              : { question: "", answer: "" }
          }
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
          loading={faqloading}
          editing={editingItem?.type === "faq"}
        />
        <div>
          {faqs.map((faq) => (
            <div key={faq.id} className="flex justify-between p-2 border">
              <span>
                {faq.questions} - {faq.answers}
              </span>
              <Button
                type="submit"
                variant="outline"
                onClick={() =>
                  setEditingItem({ id: faq.id, type: "faq", data: faq })
                }
              >
                Update
              </Button>
              <Button
                type="submit"
                variant="outline"
                onClick={() => handleDeleteFaq(faq.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Category */}
      <div>
        <h1 className="text-xl font-bold mb-4">
          {editingItem?.type === "category"
            ? "Edit Category"
            : "Create Category"}
        </h1>
        <DynamicForm
          key={editingItem?.id || "new"}
          schema={categorySchema}
          defaultValues={
            editingItem?.type === "category"
              ? { name: editingItem.data.name }
              : { name: "" }
          }
          fields={[
            {
              name: "name",
              label: "Category",
              placeholder: "Create a new category",
            },
          ]}
          submitHandler={handleCategorySubmit}
          loading={categoryLoading}
          editing={editingItem?.type === "category"}
        />
        {categories.map((category) => (
          <div key={category.id} className="flex justify-between p-2 border">
            <span>{category.name}</span>
            <Button
              type="submit"
              variant="outline"
              onClick={() =>
                setEditingItem({
                  id: category.id,
                  type: "category",
                  data: category,
                })
              }
            >
              Update
            </Button>
            <Button
              type="submit"
              variant="outline"
              onClick={() => handleDeleteCategory(category.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      {/* DAte */}
      <div>
        <h1 className="text-xl font-bold mb-4">
          {editingItem?.type === "dateEvent"
            ? "Edit DateEvent"
            : "Create DateEvent"}
        </h1>
        <DynamicForm
          key={editingItem?.id || "new"}
          schema={dateSchema}
          defaultValues={
            editingItem?.type === "dateEvent"
              ? {
                  date: editingItem.data.date
                    ? new Date(editingItem.data.date)
                        .toISOString()
                        .split("T")[0]
                    : new Date().toISOString().split("T")[0],
                  eventname: editingItem.data.eventname,
                  notes: editingItem.data.notes,
                }
              : {
                  date: new Date().toISOString(),
                  eventname: "",
                  notes: "",
                }
          }
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
          editing={editingItem?.type === "dateEvent"}
        />
        {dateEvents.map((event) => (
          <div key={event.id} className="flex justify-between p-2 border">
            <span>
              {new Date(event.date).toLocaleDateString()} - {event.eventname}
            </span>
            <Button
              type="submit"
              variant={"outline"}
              onClick={() =>
                setEditingItem({ id: event.id, type: "dateEvent", data: event })
              }
            >
              Update
            </Button>
            <Button
              type="submit"
              variant={"outline"}
              onClick={() => handleDeleteDateEvent(event.id)}
            >
              Delete
            </Button>
          </div>
        ))}
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

      {/* Customer Reply */}
      <div>
        <h1 className="text-xl font-bold mb-4">Delete Customer review</h1>
        <div className="grid grid-cols-3 gap-4 p-3">
          {customer.length > 0 ? (
            customer.map((customer) => (
              <div
                key={customer.id}
                className="flex flex-col gap-2 justify-between p-2 border"
              >
                <h3>{customer.name}</h3>
                <span>{customer.email}</span>
                <p>{customer.comments}</p>
                <Button
                  type="submit"
                  variant="outline"
                  onClick={() => handleDeleteCustomer(customer.id)}
                >
                  Delete
                </Button>
              </div>
            ))
          ) : (
            <h3>No customer review found!!</h3>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {image
          .filter((img) => img.catid === 5)
          .map((img) => (
            <div key={img.id} className="flex flex-col gap-2 p-2 border">
              <Image
                src={img.url.startsWith("http") ? img.url : `/${img.url}`}
                width={300}
                height={300}
                alt="uploded"
              />
              <Button
                type="submit"
                variant={"outline"}
                onClick={() => handleDeleteImage(img.id)}
              >
                Delete
              </Button>
            </div>
          ))}
      </div>
    </>
  );
}
