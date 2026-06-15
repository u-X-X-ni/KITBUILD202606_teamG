import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { View } from "react-native";
import { Text } from "tamagui";
import { db } from '../../db/client';
import migrations from '../../drizzle/migrations';

export default function App() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return(
    <View>
        <Text>Migration is completed</Text>
    </View>
  );
}