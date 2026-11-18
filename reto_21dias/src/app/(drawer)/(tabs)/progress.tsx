import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProgressCard } from '@/components/progress-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useHabits } from '@/hooks/use-habits';
import { useTheme } from '@/hooks/use-theme';

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { habits, completions, taskCompletions, currentDay, dailyProgress, taskProgress, challengeProgress, totalCompleted } = useHabits();

  const taskTotal = Object.values(taskCompletions).reduce(
    (total, day) => total + Object.values(day).filter(Boolean).length,
    0,
  );

  return (
    <ThemedView style={styles.page}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 18, paddingBottom: insets.bottom + 100 }]}>
        <View>
          <ThemedText type="small" themeColor="textSecondary">Resumen del desafío</ThemedText>
          <ThemedText type="subtitle">Progreso</ThemedText>
        </View>

        <ProgressCard title="Reto completo" value={challengeProgress} detail={`${totalCompleted} hábitos completados`} accent="#38A3A5" />
        <ProgressCard title="Hábitos de hoy" value={dailyProgress} detail={`Día ${currentDay} de 21`} />
        <ProgressCard title="Tareas de hoy" value={taskProgress} detail={`${Object.values(taskCompletions[currentDay] ?? {}).filter(Boolean).length} tareas completadas`} accent="#F59E0B" />

        <View style={styles.summaryRow}>
          <View style={[styles.metric, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText type="subtitle" style={{ color: '#5B67F1' }}>{taskTotal}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">Tareas realizadas</ThemedText>
          </View>
          <View style={[styles.metric, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText type="subtitle" style={{ color: '#EF6A67' }}>{21}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">Días disponibles</ThemedText>
          </View>
        </View>

        <View style={styles.week}>
          <ThemedText type="smallBold">Mapa de los 21 días</ThemedText>
          <View style={styles.days}>
            {Array.from({ length: 21 }, (_, index) => index + 1).map((day) => {
              const count = Object.values(completions[day] ?? {}).filter(Boolean).length;
              const percent = count / habits.length;
              return (
                <View key={day} style={styles.dayColumn}>
                  <View style={[styles.dayDot, { backgroundColor: percent >= 1 ? '#38A3A5' : percent > 0 ? '#F59E0B' : theme.backgroundElement }]}>
                    <ThemedText type="smallBold" style={{ color: percent > 0 ? '#FFFFFF' : theme.textSecondary }}>{day}</ThemedText>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  content: { width: '100%', maxWidth: 800, alignSelf: 'center', paddingHorizontal: 20, gap: 18 },
  summaryRow: { flexDirection: 'row', gap: 10 },
  metric: { flex: 1, minHeight: 100, borderRadius: 8, alignItems: 'center', justifyContent: 'center', gap: 4 },
  week: { gap: 12 },
  days: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  dayColumn: { width: 44 },
  dayDot: { width: 44, height: 44, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
});
