import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { useEffect, useState } from 'react';
import { db } from '../db/client';
import { getUsers, insertUsers, type NewUser, type User } from '../db/users';
import migrations from '../drizzle/migrations';

// example file
export function useUsers() {
  const { success, error } = useMigrations(db, migrations);
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    if (!success) return;
    (async () => {
      setUsers(await getUsers());
    })();
  }, [success]);

  const addUser = async (input: NewUser) => {
    await insertUsers([input]);
    setUsers(await getUsers());
  };

  return { users, success, error, addUser };
}