import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from './themed-text';

export type ProgressCardProps = {
  title: string;
  value: number;
  detail: string;
  accent?: string;
};

export function ProgressCard({ title, value, detail, accent = '#5B67F1' }: ProgressCardProps) {
  const theme = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
      <View style={styles.heading}>
        <ThemedText type="smallBold">{title}</ThemedText>
        <ThemedText type="subtitle" style={{ color: accent }}>{value}%</ThemedText>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.max(0, Math.min(value, 100))}%`, backgroundColor: accent }]} />
      </View>
      <ThemedText type="small" themeColor="textSecondary">{detail}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 8, padding: 18, gap: 12 },
  heading: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  track: { height: 8, borderRadius: 4, backgroundColor: '#D8DCE5', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4 },
});
