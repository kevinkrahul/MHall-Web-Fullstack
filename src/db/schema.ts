import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

// Category Table
export const categories = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).unique(),
});

// Image Table
export const images = pgTable("image", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  catid: integer("catid")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
});

// Customer Table
export const customers = pgTable("customer", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: text("email").unique().notNull(),
  comments: text("comments").notNull(),
});

// Datebook Table
export const datebook = pgTable("datebook", {
  id: serial("id").primaryKey(),
  date: timestamp("date", { withTimezone: true }).unique().notNull(),
  eventname: text("eventname"),
  notes: text("notes"),
});

// Question Table
export const faq = pgTable("faq", {
  id: serial("id").primaryKey(),
  questions: text("questions").notNull(),
  answers: text("answers").notNull(),
});

// User Table
export const users = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
});

// Type for selecting rows (retrieving from DB)
export type Category = InferSelectModel<typeof categories>;
export type Image = InferSelectModel<typeof images>;
export type Customer = InferSelectModel<typeof customers>;
export type Datebook = InferSelectModel<typeof datebook>;
export type Question = InferSelectModel<typeof faq>;
export type User = InferSelectModel<typeof users>;

// Type for inserting new records (creating in DB)
export type NewCategory = InferInsertModel<typeof categories>;
export type NewImage = InferInsertModel<typeof images>;
export type NewCustomer = InferInsertModel<typeof customers>;
export type NewDatebook = InferInsertModel<typeof datebook>;
export type NewQuestion = InferInsertModel<typeof faq>;
export type NewUser = InferInsertModel<typeof users>;
