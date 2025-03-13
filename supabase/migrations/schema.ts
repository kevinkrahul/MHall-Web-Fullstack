import { pgTable, unique, serial, varchar, text, timestamp, foreignKey, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const customer = pgTable("customer", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: text().notNull(),
	comments: text().notNull(),
}, (table) => [
	unique("customer_email_unique").on(table.email),
]);

export const datebook = pgTable("datebook", {
	id: serial().primaryKey().notNull(),
	date: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
	eventname: text(),
	notes: text(),
}, (table) => [
	unique("datebook_date_unique").on(table.date),
]);

export const faq = pgTable("faq", {
	id: serial().primaryKey().notNull(),
	questions: text().notNull(),
	answers: text().notNull(),
});

export const user = pgTable("user", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: text().notNull(),
	password: text().notNull(),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);

export const category = pgTable("category", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }),
}, (table) => [
	unique("category_name_unique").on(table.name),
]);

export const image = pgTable("image", {
	id: serial().primaryKey().notNull(),
	url: text().notNull(),
	catid: integer().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.catid],
			foreignColumns: [category.id],
			name: "image_catid_category_id_fk"
		}).onDelete("cascade"),
]);
