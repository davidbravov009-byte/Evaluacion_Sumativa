import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  resolvedScheme: 'light' | 'dark';
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>('system');
  const resolvedScheme = mode === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : mode;
  const value = useMemo(() => ({ mode, setMode, resolvedScheme }), [mode, resolvedScheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeMode must be used inside ThemeProvider');
  return context;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  const systemScheme = useColorScheme();
  const resolvedScheme = context?.resolvedScheme ?? (systemScheme === 'dark' ? 'dark' : 'light');
  return Colors[resolvedScheme];
}
