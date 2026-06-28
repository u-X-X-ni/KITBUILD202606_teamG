import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";


//diarees
export const diariesTable = sqliteTable("diaries_table", {
  id: integer().primaryKey({ autoIncrement: true }),
  date: text().notNull().unique(),
  body: text().default("").notNull(),
  createdAt: integer("created_at", {mode: "timestamp"})
  .notNull().$defaultFn(()=> new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp"})
  .notNull().$defaultFn(()=> new Date()),
})


export const todosTable = sqliteTable("todos_table", {
  id: integer().primaryKey({ autoIncrement: true }),
  text: text().notNull(),
  date: text(),
  done: integer('done', { mode: 'boolean'}),
  createdAt: integer("created_at", {mode: "timestamp"})
  .notNull().$defaultFn(()=> new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp"})
  .notNull().$defaultFn(()=> new Date()),
})

//events
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

//useres
// example schema
export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});

