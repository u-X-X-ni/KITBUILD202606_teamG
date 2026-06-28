import { eq } from 'drizzle-orm';
import { db } from '../client';
import { diariesTable } from '../schema';

export const getByDate = (date: string) =>{
    db.select().from(diariesTable).where(eq(diariesTable.date,date))
}
export const upsert = (date: string, body: string) =>{
    const now = (new Date())
    db.insert(diariesTable).values({
        date: date, 
        body: body, 
        createdAt: now,
        updatedAt : now})
        .onConflictDoUpdate({
        target: diariesTable.date,
        set: {
            body: body,
            updatedAt: now,
        }
        })
        .returning();
}
