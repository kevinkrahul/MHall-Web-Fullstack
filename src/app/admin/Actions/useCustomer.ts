"use client";
import { useState, useEffect } from "react";
import { SelectCustomer } from "@/db/queries/select";
import { DeleteCustomer } from "@/db/queries/delete";

type Customer = { id: number; name: string; email: string; comments: string };

export default function useCustomer() {
  const [customer, setCustomer] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchCustomers() {
      try {
        setCustomer(await SelectCustomer());
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  async function handleDeleteCustomer(id: number) {
    await DeleteCustomer({ id, name: "", email: "", comments: "" });
    setCustomer(await SelectCustomer());
  }

  return {
    customer,
    handleDeleteCustomer,
    loading,
  };
}
