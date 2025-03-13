import { relations } from "drizzle-orm/relations";
import { category, image } from "./schema";

export const imageRelations = relations(image, ({one}) => ({
	category: one(category, {
		fields: [image.catid],
		references: [category.id]
	}),
}));

export const categoryRelations = relations(category, ({many}) => ({
	images: many(image),
}));