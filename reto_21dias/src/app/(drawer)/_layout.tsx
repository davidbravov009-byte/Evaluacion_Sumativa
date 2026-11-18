import { Drawer } from 'expo-router/drawer';
import { useTheme } from '@/hooks/use-theme';

export default function DrawerLayout() {
  const theme = useTheme();
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: theme.background, width: 280 },
        drawerActiveBackgroundColor: theme.backgroundSelected,
        drawerActiveTintColor: '#5B67F1',
        drawerInactiveTintColor: theme.textSecondary,
        drawerLabelStyle: { fontWeight: '700' },
      }}>
      <Drawer.Screen name="(tabs)" options={{ title: 'Reto 21 días' }} />
      <Drawer.Screen name="profile" options={{ title: 'Perfil y ajustes' }} />
    </Drawer>
  );
}
