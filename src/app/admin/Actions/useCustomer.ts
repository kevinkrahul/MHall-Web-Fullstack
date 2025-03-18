"use client";
import { useState, useEffect } from "react";
import { SelectCustomer } from "@/db/queries/select";
import { DeleteCustomer } from "@/db/queries/delete";

type Customer = { id: number; name: string; email: string; comments: string };

export default function useCustomer() {
  const [customer, setCustomer] = useState<Customer[]>([]);

  useEffect(() => {
    async function fetchCustomers() {
      setCustomer(await SelectCustomer());
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
  };
}
