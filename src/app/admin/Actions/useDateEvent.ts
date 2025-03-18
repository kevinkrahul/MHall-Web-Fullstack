"use client";
import { z } from "zod";
import { useState, useEffect } from "react";
import { SelectDateEvent } from "@/db/queries/select";
import { DeleteDateEvent } from "@/db/queries/delete";
import { UpdateDateEvent } from "@/db/queries/update";
import { CreateDateEvent } from "@/db/queries/insert";
import { useEditing } from "./editingHook";


type DateEvent = { id: number; date: Date; eventname: string; notes: string };

const dateSchema = z.object({
  date: z.string(),
  eventname: z
    .string()
    .min(5, { message: "Event must be at least 5 characters." }),
  notes: z
    .string()
    .min(20, { message: "Notes must be at least 20 characters." }),
});

export default function useDateEvent() {
  const [dateLoading, setDateLoading] = useState(false);
  const [dateEvents, setDateEvents] = useState<DateEvent[]>([]);
  const { editingItem, setEditingItem} = useEditing();


  useEffect(() => {
    async function fetchCategories() {
      const formatDate = (isoString: string) => {
        return new Date(isoString).toISOString().split("T")[0];
      };
      setDateEvents(
        (await SelectDateEvent()).map((event) => ({
          ...event,
          date: new Date(event.date),
          eventname: event.eventname || "",
          notes: event.notes || "",
        }))
      );
    }
    fetchCategories();
  }, []);

  async function handleDateSubmit(
    values: z.infer<typeof dateSchema>,
    reset: () => void
  ) {
    setDateLoading(true);
    try {
      if (editingItem?.type === "dateEvent") {
        await UpdateDateEvent({
          id: editingItem.id,
          date: new Date(values.date),
          eventname: values.eventname,
          notes: values.notes,
        });
      } else {
        await CreateDateEvent({
          date: new Date(values.date),
          eventname: values.eventname,
          notes: values.notes,
        });
      }
      setEditingItem(null);
      setDateEvents(
        (await SelectDateEvent()).map((event) => ({
          ...event,
          eventname: event.eventname || "",
          notes: event.notes || "",
        }))
      );

      reset();
    } catch (error) {
      console.error("Error creating Date Event:", error);
    } finally {
      setDateLoading(false);
    }
  }

  async function handleDeleteDateEvent(id: number) {
    await DeleteDateEvent({
      id,
      date: new Date(),
    });
    setDateEvents(
      (await SelectDateEvent()).map((event) => ({
        ...event,
        eventname: event.eventname || "",
        notes: event.notes || "",
      }))
    );
  }
  return {
    dateLoading,
    dateSchema,
    dateEvents,
    handleDateSubmit,
    handleDeleteDateEvent,
  };
}
