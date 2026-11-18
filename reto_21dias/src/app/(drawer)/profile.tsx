import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MenuItem } from '@/components/menu-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeMode, type ThemeMode } from '@/hooks/use-theme';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { mode, setMode, resolvedScheme } = useThemeMode();

  const options: { label: string; value: ThemeMode }[] = [
    { label: 'Sistema', value: 'system' },
    { label: 'Claro', value: 'light' },
    { label: 'Oscuro', value: 'dark' },
  ];

  return (
    <ThemedView style={styles.page}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 18, paddingBottom: insets.bottom + 30 }]}>
        <View>
          <ThemedText type="small" themeColor="textSecondary">Configuración</ThemedText>
          <ThemedText type="subtitle">Perfil</ThemedText>
        </View>

        <View style={styles.profile}>
          <View style={styles.avatar}><ThemedText type="subtitle" style={styles.avatarText}>21</ThemedText></View>
          <View>
            <ThemedText type="smallBold">Mi reto</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">21 días de constancia</ThemedText>
          </View>
        </View>

        <ThemedText type="smallBold">Apariencia</ThemedText>
        <View style={styles.themeOptions}>
          {options.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => setMode(option.value)}
              style={({ pressed }) => [styles.themeOption, mode === option.value && styles.themeSelected, pressed && { opacity: 0.7 }]}>
              <ThemedText type="smallBold" style={mode === option.value ? styles.themeLabelSelected : undefined}>{option.label}</ThemedText>
            </Pressable>
          ))}
        </View>

        <View style={styles.menu}>
          <MenuItem icon="◷" label="Duración" value="21 días" />
          <MenuItem icon="◎" label="Estado del tema" value={resolvedScheme === 'dark' ? 'Oscuro' : 'Claro'} />
          <MenuItem icon="i" label="Acerca del reto" value="Versión 1.0" />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  content: { width: '100%', maxWidth: 800, alignSelf: 'center', paddingHorizontal: 20, gap: 18 },
  profile: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#5B67F1', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#FFFFFF' },
  themeOptions: { flexDirection: 'row', gap: 8 },
  themeOption: { flex: 1, height: 48, borderRadius: 8, borderWidth: 1, borderColor: '#AAB0BE', alignItems: 'center', justifyContent: 'center' },
  themeSelected: { backgroundColor: '#5B67F1', borderColor: '#5B67F1' },
  themeLabelSelected: { color: '#FFFFFF' },
  menu: { gap: 8 },
});
