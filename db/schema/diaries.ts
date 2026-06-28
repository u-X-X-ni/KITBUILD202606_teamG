import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const diariesTable = sqliteTable("diaries_table", {
  id: integer().primaryKey({ autoIncrement: true }),
  date: text().notNull().unique(),
  body: text().default("").notNull(),
  createdAt: integer("created_at", {mode: "timestamp"})
  .notNull().$defaultFn(()=> new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp"})
  .notNull().$defaultFn(()=> new Date()),
})


export const todos = sqliteTable("todos_table", {
  id: integer().primaryKey({ autoIncrement: true }),
  text: text().notNull(),
  date: text(),
  done: integer('done', { mode: 'boolean'}),
  createdAt: integer("created_at", {mode: "timestamp"})
  .notNull().$defaultFn(()=> new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp"})
  .notNull().$defaultFn(()=> new Date()),
})