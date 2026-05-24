import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "../../../application/navigation/RootStackParamList";
import { useShows } from "../state/showsContext";
import { colors } from "../../../core/theme/colors";
import { formatRuntime } from "../../../core/utils/formatRuntime";
import { Show } from "../../shows/domain/entities/show";

type Props = NativeStackScreenProps<RootStackParamList, "ShowDetail">;

export function ShowDetailScreen({ route, navigation }: Props) {
  const { showId } = route.params;
  const { getShowById, deleteShow } = useShows();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const show = getShowById(showId);

  if (!show) {
    return (
      <View style={styles.center}>
        <Text style={styles.missingTitle}>Show not found</Text>
      </View>
    );
  }

  function confirmDelete(selectedShow: Show) {
    deleteShow(selectedShow.id);
    setIsDeleteModalVisible(false);
    navigation.navigate("Shows");
  }

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.posterWrapper}>
          <Image source={{ uri: show.imageUrl }} style={styles.poster} />

          <LinearGradient
            colors={["rgba(15,16,32,0.15)", "rgba(15,16,32,0.35)"]}
            style={styles.posterTopOverlay}
          />

          <LinearGradient
            colors={["transparent", colors.background]}
            style={styles.posterGradient}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{show.name}</Text>

          <View style={styles.badges}>
            <Badge label={show.rating ? `★ ${show.rating}` : "★ N/A"} />
            <Badge label={show.status} />
            <Badge label={formatRuntime(show.runtime)} />
          </View>

          <Text style={styles.sectionTitle}>Story</Text>
          <Text style={styles.summary}>{show.summary}</Text>

          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailsCard}>
            <DetailRow label="Genres" value={show.genres.join(", ") || "N/A"} />
            <DetailRow label="Language" value={show.language} />
            <DetailRow label="Premiered" value={show.premiered ?? "Unknown"} />
            <DetailRow
              label="Source"
              value={show.isLocal ? "Local" : "TVMaze"}
            />
          </View>

          {show.userNote ? (
            <>
              <Text style={styles.sectionTitle}>Personal note</Text>
              <Text style={styles.summary}>{show.userNote}</Text>
            </>
          ) : null}

          <View style={styles.actions}>
            <Pressable
              style={[styles.button, styles.editButton]}
              onPress={() =>
                navigation.navigate("ShowForm", {
                  mode: "edit",
                  show,
                })
              }
            >
              <Text style={styles.editText}>Edit</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.deleteButton]}
              onPress={() => setIsDeleteModalVisible(true)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={isDeleteModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDeleteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconCircle}>
              <Text style={styles.modalIcon}>!</Text>
            </View>

            <Text style={styles.modalTitle}>Delete show?</Text>

            <Text style={styles.modalMessage}>
              Are you sure you want to delete{" "}
              <Text style={styles.modalShowName}>{show.name}</Text>? This action
              will remove it from the local catalog.
            </Text>

            <View style={styles.modalActions}>
              <Pressable
                style={[styles.modalButton, styles.cancelModalButton]}
                onPress={() => setIsDeleteModalVisible(false)}
              >
                <Text style={styles.cancelModalText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, styles.confirmDeleteButton]}
                onPress={() => confirmDelete(show)}
              >
                <Text style={styles.confirmDeleteText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  posterWrapper: {
    height: 440,
    backgroundColor: colors.surface,
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  posterTopOverlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 2,
  },
  posterGradient: {
    ...StyleSheet.absoluteFill,
    zIndex: 3,
  },
  content: {
    padding: 20,
    marginTop: -60,
    zIndex: 5,
  },
  title: {
    color: colors.text,
    fontSize: 38,
    fontWeight: "900",
    letterSpacing: -1.2,
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  },
  badge: {
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badgeText: {
    color: colors.whiteSoft,
    fontWeight: "800",
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 28,
    marginBottom: 10,
  },
  summary: {
    color: colors.mutedText,
    fontSize: 16,
    lineHeight: 25,
  },
  detailsCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  detailRow: {
    marginBottom: 12,
  },
  detailLabel: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  detailValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 30,
    marginBottom: 40,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: colors.primary,
  },
  deleteButton: {
    backgroundColor: "rgba(251,113,133,0.16)",
    borderWidth: 1,
    borderColor: "rgba(251,113,133,0.34)",
  },
  editText: {
    color: colors.background,
    fontWeight: "900",
    fontSize: 16,
  },
  deleteText: {
    color: colors.rose,
    fontWeight: "900",
    fontSize: 16,
  },
  center: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  missingTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(5,6,18,0.72)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(251,113,133,0.16)",
    borderWidth: 1,
    borderColor: "rgba(251,113,133,0.36)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  modalIcon: {
    color: colors.rose,
    fontSize: 24,
    fontWeight: "900",
  },
  modalTitle: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: -0.6,
  },
  modalMessage: {
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
  },
  modalShowName: {
    color: colors.text,
    fontWeight: "900",
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: "center",
  },
  cancelModalButton: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: colors.border,
  },
  confirmDeleteButton: {
    backgroundColor: colors.rose,
  },
  cancelModalText: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 15,
  },
  confirmDeleteText: {
    color: colors.background,
    fontWeight: "900",
    fontSize: 15,
  },
});