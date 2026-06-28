import { desc, eq } from 'drizzle-orm';
import { db } from '../client';
import { todosTable } from '../schema';

export const listAll = () => {
    return db.select().from(todosTable).orderBy(desc(todosTable.createdAt));
}

export const create = (data: typeof todosTable.$inferInsert) => {
    const now = (new Date())
        return  db.insert(todosTable).values({
         ...data,
         createdAt: now,
         updatedAt: now,   
        }).returning();
}

export const toggle = (id: number, done: boolean) => {
   const now = new Date();
   const doneValue = done ? 1 : 0;
   db.update(todosTable).set({
     done: done,
     updatedAt: now,
   }).where(eq(todosTable.id, id)).returning()
}

export const update = (id: number, data: any) => {
     const now = new Date();
        return db.update(todosTable).set({
         ...data,
         updatedAt: now,   
        }).where(eq(todosTable.id, id)).returning();
}
    
export const remove = (id: number) => {
    db.delete(todosTable).where(eq(todosTable.id, id))
}