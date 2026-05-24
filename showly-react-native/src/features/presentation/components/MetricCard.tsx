import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../core/theme/colors";

type MetricCardProps = {
  label: string;
  value: string;
  helper?: string;
};

export function MetricCard({ label, value, helper }: MetricCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {helper && <Text style={styles.helper}>{helper}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  label: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  value: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900",
    marginTop: 8,
  },
  helper: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
});