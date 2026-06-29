import { desc, eq, like } from 'drizzle-orm';
import { db } from '../client';
import { eventsTable, } from '../schema';

export type Event =  typeof eventsTable.$inferSelect

export type NewEvent = Omit<typeof eventsTable.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>;

export const listAll = () =>
    db.select().from(eventsTable).orderBy(desc(eventsTable.createdAt));

export const datesInMonth = (ym: string) => {
    const searchPattern = `${ym}-%`
    return  db.selectDistinct({
        date: eventsTable.date,
    })
    .from(eventsTable).where(like(eventsTable.date, searchPattern));
}

export const create = (data: NewEvent) => {
    const now = (new Date())
    return  db.insert(eventsTable).values({
     ...data,
     createdAt: now,
     updatedAt: now,   
    }).returning();
}

export const update = ( id: number, data: Partial<NewEvent>) => {
    const now = new Date();
    return db.update(eventsTable).set({
     ...data,
     updatedAt: now,   
    }).where(eq(eventsTable.id, id)).returning();
}

export const remove = (id: number) => {
    return db.delete(eventsTable).where(eq(eventsTable.id, id))
}