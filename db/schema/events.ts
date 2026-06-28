import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const eventsTable = sqliteTable("events_table", {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  date: text('YYYY-MM-DD').notNull(),
  start_time: text('HH:mm'),
  end_time: text('HH:mm'),
  memo: text(),
  createdAt: integer("created_at", {mode: "timestamp"})
  .notNull().$defaultFn(()=> new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp"})
  .notNull().$defaultFn(()=> new Date()),
});