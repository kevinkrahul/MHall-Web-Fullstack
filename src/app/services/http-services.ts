"use server";
// import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";
import { Database } from "../../database.types";


// Get Record
export const getRecord = async <T>(model: {
  findMany: () => Promise<T[]>;
}): Promise<T[]> => {
  try {
    return await model.findMany();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Add Record
export const addRecord = async <T>(
  model: { create: (args: { data: Omit<T, "id"> }) => Promise<T> },
  data: Omit<T, "id">
): Promise<T> => {
  try {
    return await model.create({ data });
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Failed to add record: ${(error as Error).message}`);
  }
};

// Delete Record
export const deleteRecord = async <T>(
  model: {
    findUnique: (args: { where: { id: number } }) => Promise<T | null>;
    delete: (args: { where: { id: number } }) => Promise<T>;
  },
  where: { id: number }
): Promise<T | null> => {
  try {
    const existingRecord = await model.findUnique({ where });
    if (!existingRecord) {
      console.log(`Record with ID ${where.id} does not exist.`);
      return null;
    }
    return await model.delete({ where });
  } catch (error) {
    console.error("Error deleting record:", error);
    throw error;
  }
};

// Update Record
export const updateRecord = async <T>(
  model: {findUnique: (args: { where: { id: number } }) => Promise<T | null>;
    update: (args: { where:{id:number}; data: Partial<T> }) => Promise<T>;
  },
  where: {id:number},
  data: Partial<T>
): Promise<T | null > => {
  try {
    const exist= await model.findUnique({ where});
    if(!exist)
    {
      return null;
    }
    return await model.update({ where, data });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// model:{obj:()=>Promise<T[]>}
