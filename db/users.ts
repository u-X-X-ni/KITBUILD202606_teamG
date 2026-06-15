import { db } from './client';
import { usersTable } from './schema';

// example file
export type User = typeof usersTable.$inferSelect; // get用の型<-全要素（id, name, age, gmail）を含む
export type NewUser = typeof usersTable.$inferInsert; // insert用の型<-いくつかの要素（name, age, gmail）を含む<-insert時にidいらんから

export const getUsers = () => db.select().from(usersTable);

export const insertUsers = (users: NewUser[]) =>
  db.insert(usersTable).values(users);

export const clearUsers = () => db.delete(usersTable);