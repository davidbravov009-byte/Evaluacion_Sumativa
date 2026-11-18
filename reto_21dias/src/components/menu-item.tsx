import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from './themed-text';

export type MenuItemProps = {
  icon: string;
  label: string;
  value?: string;
  onPress?: () => void;
};

export function MenuItem({ icon, label, value, onPress }: MenuItemProps) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.item, { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.7 : 1 }]}>
      <ThemedText type="smallBold" style={styles.icon}>{icon}</ThemedText>
      <ThemedText type="smallBold" style={styles.label}>{label}</ThemedText>
      {value ? <ThemedText type="small" themeColor="textSecondary">{value}</ThemedText> : null}
      <ThemedText themeColor="textSecondary">›</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: { minHeight: 58, borderRadius: 8, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  icon: { width: 28, textAlign: 'center' },
  label: { flex: 1 },
});
