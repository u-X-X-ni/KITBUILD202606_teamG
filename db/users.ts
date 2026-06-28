import { desc, eq } from 'drizzle-orm';
import { db } from './client';
import { usersTable } from './schema';

// テーブルの全カラムを含む型
export type User = typeof usersTable.$inferSelect;

// INSERT 用の型。id / createdAt / updatedAt は自動でセットするので除外
export type NewUser = Omit<typeof usersTable.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>;

// 全ユーザーを作成日時の新しい順で返す
export const listAll = () =>
  db.select().from(usersTable).orderBy(desc(usersTable.createdAt));

// 新しいユーザーを1件作成して、作成した行を返す
export const create = (data: NewUser) => {
  const now = new Date().toISOString();
  return db.insert(usersTable).values({ ...data, createdAt: now, updatedAt: now }).returning();
};

// 指定した id のユーザーを部分更新して、更新後の行を返す
// updatedAt は常に現在時刻に更新する（createdAt は変えない）
export const update = (id: number, data: Partial<NewUser>) => {
  const now = new Date().toISOString();
  return db.update(usersTable)
    .set({ ...data, updatedAt: now })
    .where(eq(usersTable.id, id)) // where を忘れると全行が更新されてしまう
    .returning();
};

// 指定した id のユーザーを1件削除する
export const remove = (id: number) =>
  db.delete(usersTable).where(eq(usersTable.id, id));