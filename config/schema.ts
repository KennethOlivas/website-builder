import {
  integer,
  json,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { fr } from "zod/v4/locales";

export const usersTable = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer().default(2),
});

export const projectTable = pgTable("projects", {
  id: uuid().defaultRandom().primaryKey(),
  projectId: uuid().unique(),
  createdBy: varchar()
    .references(() => usersTable.email)
    .notNull(),
  createdOn: timestamp().defaultNow().notNull(),
});

export const frameTable = pgTable("frames", {
  id: uuid().defaultRandom().primaryKey(),
  frameId: uuid().unique(),
  designCore: text(),
  projectId: uuid().references(() => projectTable.projectId),
  createdOn: timestamp().defaultNow().notNull(),
});

export const chatTable = pgTable("chats", {
  id: uuid().defaultRandom().primaryKey(),
  chatMessages: json(),
  frameId: uuid().references(() => frameTable.frameId),
  createdBy: varchar()
    .references(() => usersTable.email)
    .notNull(),
  createdOn: timestamp().defaultNow().notNull(),
});
