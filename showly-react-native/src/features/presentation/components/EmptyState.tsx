import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../core/theme/colors";

type EmptyStateProps = {
  title: string;
  message: string;
};

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🎬</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    borderRadius: 28,
    backgroundColor: colors.surface,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: {
    fontSize: 44,
    marginBottom: 8,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 6,
  },
  message: {
    color: colors.mutedText,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
});