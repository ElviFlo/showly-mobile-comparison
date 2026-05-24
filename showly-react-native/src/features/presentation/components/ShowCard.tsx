import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Show } from "../../shows/domain/entities/show";
import { colors } from "../../../core/theme/colors";

type ShowCardProps = {
  show: Show;
  onPress: () => void;
};

export function ShowCard({ show, onPress }: ShowCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: show.imageUrl }} style={styles.image} />

      <LinearGradient
        colors={["transparent", "rgba(15,16,32,0.96)"]}
        style={styles.gradient}
      />

      <View style={styles.content}>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>
            {show.rating ? `★ ${show.rating}` : "★ N/A"}
          </Text>
        </View>

        <Text numberOfLines={1} style={styles.title}>
          {show.name}
        </Text>

        <Text numberOfLines={1} style={styles.subtitle}>
          {show.genres.length > 0 ? show.genres.join(" · ") : "No genres"}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.status}>{show.status}</Text>
          {show.isLocal && <Text style={styles.localTag}>Local</Text>}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 260,
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: colors.surface,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  gradient: {
    ...StyleSheet.absoluteFill,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 18,
  },
  ratingBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(15,16,32,0.75)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ratingText: {
    color: colors.warning,
    fontWeight: "800",
    fontSize: 13,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: -0.4,
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 14,
    marginTop: 4,
  },
  footer: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  status: {
    color: colors.accent,
    fontWeight: "700",
  },
  localTag: {
    color: colors.text,
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    overflow: "hidden",
    fontSize: 12,
    fontWeight: "800",
  },
});