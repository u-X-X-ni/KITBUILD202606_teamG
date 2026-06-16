import { db } from "@/db/client";
import migrations from "@/drizzle/migrations";
import { useColorScheme } from '@/hooks/use-color-scheme';
import config from '@/tamagui.config';
import { TamaguiProvider } from '@tamagui/core';
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from 'expo-router';
import { View } from "react-native";
import { Text } from "tamagui";

export const unstable_settings = { anchor: '(tabs)' }

function DatabaseProvider({ children }: { children: React.ReactNode }) {
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

  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme ?? 'light'}>
      <DatabaseProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </DatabaseProvider>
    </TamaguiProvider>
  )
}