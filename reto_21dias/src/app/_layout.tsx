import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import { HabitsProvider } from '@/hooks/use-habits';
import { ThemeProvider, useTheme, useThemeMode } from '@/hooks/use-theme';

function RootLayoutContent() {
  const theme = useTheme();
  const { resolvedScheme } = useThemeMode();

  return (
    <>
      <StatusBar style={resolvedScheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
        }}>
        <Stack.Screen name="(drawer)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <HabitsProvider>
          <RootLayoutContent />
        </HabitsProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
