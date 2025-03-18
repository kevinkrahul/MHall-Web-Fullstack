"use client"
import {create} from "zustand";

type EditingItem = {
    id: number;
    type: string;
    data: any;
  } | null;

  type EditingStore = {
    editingItem: EditingItem;
    setEditingItem: (item: EditingItem) => void;
    clearEditingItem: () => void;
  };

  export const useEditing = create<EditingStore>((set) => ({
    editingItem: null,
    setEditingItem: (item) => set({ editingItem: item }),
    clearEditingItem: () => set({ editingItem: null }),
  }));

