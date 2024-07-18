import {
  boolean,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const geese = pgTable("geese", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  isFlockLeader: boolean("is_leader"),
  programmingLanguage: text("programming_language"),
  motivations: jsonb("motivations"),
  location: text("location"),
  bio: text("bio"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const selectGeeseSchema = createSelectSchema(geese);
export const insertGeeseSchema = createInsertSchema(geese);

export type GooseSelect = z.infer<typeof selectGeeseSchema>;
export type GooseInsert = z.infer<typeof insertGeeseSchema>;
