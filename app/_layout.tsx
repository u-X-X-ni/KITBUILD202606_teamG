import { useColorScheme } from '@/hooks/use-color-scheme'
import config from '@/tamagui.config'
import { TamaguiProvider } from '@tamagui/core'
import { Stack } from 'expo-router'

export const unstable_settings = { anchor: '(tabs)' }

export default function RootLayout() {
  const colorScheme = useColorScheme()
  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme ?? 'light'}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </TamaguiProvider>
  )
}