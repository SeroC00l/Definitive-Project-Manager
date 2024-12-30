import { pgSchema, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";
import { z } from "astro:schema";

const authSchema = pgSchema('auth');

const users = authSchema.table('users', {
	id: uuid('id').primaryKey(),
});

export const projectsTable = pgTable("projects", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  user_id: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const createProjectSchema = createInsertSchema(projectsTable).extend({ user_id: z.string().optional() });

export const updateProjectSchema = createUpdateSchema(projectsTable).extend({ user_id: z.string().optional() });