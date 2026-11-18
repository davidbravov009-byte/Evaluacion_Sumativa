import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HabitCard } from '@/components/habit-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useHabits } from '@/hooks/use-habits';

export default function HabitsScreen() {
  const insets = useSafeAreaInsets();
  const { habits, toggleHabit, isHabitCompleted, completedCount } = useHabits();

  return (
    <ThemedView style={styles.page}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 18, paddingBottom: insets.bottom + 100 }]}>
        <View>
          <ThemedText type="small" themeColor="textSecondary">Reto personal</ThemedText>
          <ThemedText type="subtitle">Hábitos</ThemedText>
        </View>
        <View style={styles.summaryRow}>
          <ThemedText type="smallBold">Hoy</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">{completedCount} completados</ThemedText>
        </View>
        <View style={styles.list}>
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              completed={isHabitCompleted(habit.id)}
              onToggle={toggleHabit}
            />
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  content: { width: '100%', maxWidth: 800, alignSelf: 'center', paddingHorizontal: 20, gap: 18 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  list: { gap: 10 },
});
