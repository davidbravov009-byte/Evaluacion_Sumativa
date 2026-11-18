import { Pressable, StyleSheet, View } from 'react-native';
import { BookOpen, Check, Code2, Droplets, Dumbbell } from 'lucide-react-native';
import type { Habit } from '@/hooks/use-habits';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from './themed-text';

export type HabitCardProps = {
  habit: Habit;
  completed: boolean;
  onToggle: (habitId: string) => void;
};

export function HabitCard({ habit, completed, onToggle }: HabitCardProps) {
  const theme = useTheme();
  const Icon = {
    code: Code2,
    book: BookOpen,
    exercise: Dumbbell,
    water: Droplets,
  }[habit.icon];

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: completed }}
      onPress={() => onToggle(habit.id)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.75 : 1 },
      ]}>
      <View style={[styles.icon, { backgroundColor: `${habit.color}20` }]}>
        <Icon size={23} />
      </View>
      <View style={styles.copy}>
        <ThemedText type="smallBold">{habit.title}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">{habit.description}</ThemedText>
      </View>
      <View style={[styles.check, completed && { backgroundColor: habit.color, borderColor: habit.color }]}>
        {completed ? <Check size={16} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', minHeight: 84, borderRadius: 8, padding: 14, gap: 12 },
  icon: { width: 48, height: 48, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1, gap: 2 },
  check: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: '#98A0AE', alignItems: 'center', justifyContent: 'center' },
  checkMark: { color: '#FFFFFF', fontSize: 15, lineHeight: 18, fontWeight: '800' },
});
