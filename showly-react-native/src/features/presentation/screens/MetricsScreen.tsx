import { ScrollView, StyleSheet, Text } from "react-native";
import { colors } from "../../../core/theme/colors";
import { useShows } from "../state/showsContext";
import { MetricCard } from "../components/MetricCard";

export function MetricsScreen() {
  const { apiResponseTimeMs, coldStartTimeMs, shows } = useShows();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Comparison metrics</Text>
      <Text style={styles.subtitle}>
        These values help compare Showly React Native against the future Flutter
        implementation.
      </Text>

      <MetricCard
        label="API response time"
        value={
          apiResponseTimeMs !== null ? `${apiResponseTimeMs} ms` : "Pending"
        }
        helper="Measured from the moment the request starts until the API data is received and placed in state."
      />

      <MetricCard
        label="Cold start"
        value={coldStartTimeMs !== null ? `${coldStartTimeMs} ms` : "Pending"}
        helper="Approximate time from app startup until the first functional screen is ready."
      />

      <MetricCard
        label="Items in memory"
        value={String(shows.length)}
        helper="All records are stored in RAM through Context API and useReducer. No local database is used."
      />

      <MetricCard
        label="Final APK/AAB size"
        value="Pending"
        helper="Fill this after generating the release build with EAS."
      />

      <MetricCard
        label="Release build time"
        value="Pending"
        helper="Measure this with PowerShell Measure-Command or a terminal timer."
      />

      <MetricCard
        label="Interface fluidity"
        value="Manual review"
        helper="Evaluate scroll behavior, navigation smoothness, and visual stability during interaction."
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 48,
  },
  title: {
    color: colors.text,
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: -1.2,
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 16,
    lineHeight: 23,
    marginTop: 8,
    marginBottom: 22,
  },
});