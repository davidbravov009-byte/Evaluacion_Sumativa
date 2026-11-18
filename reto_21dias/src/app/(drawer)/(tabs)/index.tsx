import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Check, Clock3 } from 'lucide-react-native';

import { HabitCard } from '@/components/habit-card';
import { ProgressCard } from '@/components/progress-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useHabits } from '@/hooks/use-habits';
import { useTheme } from '@/hooks/use-theme';

export default function TodayScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const {
    habits,
    dayPlan,
    currentDay,
    setCurrentDay,
    toggleHabit,
    isHabitCompleted,
    toggleTask,
    isTaskCompleted,
    completedCount,
    dailyProgress,
    taskCompletedCount,
    taskProgress,
  } = useHabits();

  return (
    <ThemedView style={styles.page}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 18, paddingBottom: insets.bottom + 100 }]}>
        <View style={styles.header}>
          <View>
            <ThemedText type="small" themeColor="textSecondary">Reto personal</ThemedText>
            <ThemedText type="subtitle">Día {currentDay}</ThemedText>
          </View>
          <View style={[styles.dayBadge, { backgroundColor: theme.backgroundSelected }]}>
            <ThemedText type="smallBold" style={{ color: '#5B67F1' }}>{taskCompletedCount}/5 tareas</ThemedText>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayStrip}>
          {Array.from({ length: 21 }, (_, index) => index + 1).map((day) => (
            <Pressable
              key={day}
              onPress={() => setCurrentDay(day)}
              style={[styles.dayButton, day === currentDay && { backgroundColor: '#5B67F1' }]}>
              <ThemedText type="smallBold" style={day === currentDay ? styles.dayButtonText : undefined}>{day}</ThemedText>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.progressRow}>
          <View style={styles.progressHalf}><ProgressCard title="Hábitos" value={dailyProgress} detail={`${completedCount} completados`} /></View>
          <View style={styles.progressHalf}><ProgressCard title="Tareas" value={taskProgress} detail={`${taskCompletedCount} completadas`} accent="#38A3A5" /></View>
        </View>

        <View style={styles.sectionTitle}>
          <ThemedText type="smallBold">Tareas del día</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">{dayPlan[currentDay].length} materias</ThemedText>
        </View>

        <View style={styles.list}>
          {dayPlan[currentDay].map((task) => {
            const completed = isTaskCompleted(task.id);
            return (
              <Pressable
                key={task.id}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: completed }}
                onPress={() => toggleTask(task.id)}
                style={({ pressed }) => [styles.taskCard, { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.75 : 1 }]}>
                <View style={[styles.taskIcon, { backgroundColor: `${task.color}20` }]}>
                  <ThemedText type="smallBold" style={{ color: task.color }}>{task.subject.slice(0, 2).toUpperCase()}</ThemedText>
                </View>
                <View style={styles.taskCopy}>
                  <ThemedText type="smallBold">{task.subject}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">{task.title}</ThemedText>
                  <View style={styles.duration}><Clock3 size={13} /><ThemedText type="small" themeColor="textSecondary">{task.duration}</ThemedText></View>
                </View>
                <View style={[styles.check, completed && { backgroundColor: task.color, borderColor: task.color }]}>
                  {completed ? <Check size={16} /> : null}
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.sectionTitle}>
          <ThemedText type="smallBold">Rutina diaria</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">4 hábitos</ThemedText>
        </View>

        <View style={styles.list}>
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} completed={isHabitCompleted(habit.id)} onToggle={toggleHabit} />
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  content: { width: '100%', maxWidth: 800, alignSelf: 'center', paddingHorizontal: 20, gap: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dayBadge: { borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 },
  dayStrip: { gap: 8, paddingVertical: 2 },
  dayButton: { width: 44, height: 44, borderRadius: 8, borderWidth: 1, borderColor: '#AAB0BE', alignItems: 'center', justifyContent: 'center' },
  dayButtonText: { color: '#FFFFFF' },
  progressRow: { flexDirection: 'row', gap: 10 },
  progressHalf: { flex: 1 },
  sectionTitle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  list: { gap: 10 },
  taskCard: { flexDirection: 'row', alignItems: 'center', minHeight: 94, borderRadius: 8, padding: 12, gap: 12 },
  taskIcon: { width: 48, height: 48, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  taskCopy: { flex: 1, gap: 2 },
  duration: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  check: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: '#98A0AE', alignItems: 'center', justifyContent: 'center' },
});
