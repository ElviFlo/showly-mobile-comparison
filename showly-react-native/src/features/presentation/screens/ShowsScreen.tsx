import { useMemo, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "../../../application/navigation/RootStackParamList";
import { colors } from "../../../core/theme/colors";
import { useShows } from "../state/showsContext";
import { ShowCard } from "../components/ShowCard";
import { EmptyState } from "../components/EmptyState";

type Props = NativeStackScreenProps<RootStackParamList, "Shows">;

export function ShowsScreen({ navigation }: Props) {
  const { shows, isLoading, error, loadShows } = useShows();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [openDropdown, setOpenDropdown] = useState<
    "genre" | "status" | "language" | null
  >(null);

  const genres = useMemo(() => {
    const uniqueGenres = new Set<string>();

    shows.forEach((show) => {
      show.genres.forEach((genre) => uniqueGenres.add(genre));
    });

    return ["All", ...Array.from(uniqueGenres).sort()];
  }, [shows]);

  const statuses = useMemo(() => {
    const uniqueStatuses = new Set(shows.map((show) => show.status));
    return ["All", ...Array.from(uniqueStatuses).sort()];
  }, [shows]);

  const languages = useMemo(() => {
    const uniqueLanguages = new Set(shows.map((show) => show.language));
    return ["All", ...Array.from(uniqueLanguages).sort()];
  }, [shows]);

  const filteredShows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return shows.filter((show) => {
      const matchesTitle = show.name.toLowerCase().includes(query);

      const matchesGenre =
        selectedGenre === "All" || show.genres.includes(selectedGenre);

      const matchesStatus =
        selectedStatus === "All" || show.status === selectedStatus;

      const matchesLanguage =
        selectedLanguage === "All" || show.language === selectedLanguage;

      return matchesTitle && matchesGenre && matchesStatus && matchesLanguage;
    });
  }, [shows, searchQuery, selectedGenre, selectedStatus, selectedLanguage]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedGenre !== "All" ||
    selectedStatus !== "All" ||
    selectedLanguage !== "All";

  function clearFilters() {
    setSearchQuery("");
    setSelectedGenre("All");
    setSelectedStatus("All");
    setSelectedLanguage("All");
    setOpenDropdown(null);
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(167,139,250,0.32)", "transparent"]}
        style={styles.heroGlow}
      />

      <View style={styles.header}>
        <Text style={styles.eyebrow}>Series catalog</Text>
        <Text style={styles.title}>Showly</Text>
        <Text style={styles.subtitle}>
          Discover, edit and curate your own local show collection.
        </Text>

        <View style={styles.searchWrapper}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by title..."
            placeholderTextColor={colors.mutedText}
            style={styles.searchInput}
          />

          {searchQuery.length > 0 && (
            <Pressable
              style={styles.clearButton}
              onPress={() => setSearchQuery("")}
            >
              <Text style={styles.clearButtonText}>×</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.filtersRow}>
          <Dropdown
            label="Genre"
            value={selectedGenre}
            options={genres}
            isOpen={openDropdown === "genre"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "genre" ? null : "genre")
            }
            onSelect={(value) => {
              setSelectedGenre(value);
              setOpenDropdown(null);
            }}
          />

          <Dropdown
            label="Status"
            value={selectedStatus}
            options={statuses}
            isOpen={openDropdown === "status"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "status" ? null : "status")
            }
            onSelect={(value) => {
              setSelectedStatus(value);
              setOpenDropdown(null);
            }}
          />

          <Dropdown
            label="Language"
            value={selectedLanguage}
            options={languages}
            isOpen={openDropdown === "language"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "language" ? null : "language")
            }
            onSelect={(value) => {
              setSelectedLanguage(value);
              setOpenDropdown(null);
            }}
          />
        </View>

        <View style={styles.actions}>
          <Pressable
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() => navigation.navigate("ShowForm", { mode: "create" })}
          >
            <Text style={styles.primaryButtonText}>+ Add show</Text>
          </Pressable>

          <Pressable
            style={styles.actionButton}
            onPress={() => navigation.navigate("Metrics")}
          >
            <Text style={styles.actionButtonText}>Metrics</Text>
          </Pressable>

          {hasActiveFilters && (
            <Pressable style={styles.clearFiltersButton} onPress={clearFilters}>
              <Text style={styles.clearFiltersText}>Clear</Text>
            </Pressable>
          )}
        </View>
      </View>

      {isLoading && shows.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} size="large" />
          <Text style={styles.loadingText}>Loading shows...</Text>
        </View>
      ) : error ? (
        <View style={styles.content}>
          <EmptyState title="Something went wrong" message={error} />

          <Pressable style={styles.retryButton} onPress={loadShows}>
            <Text style={styles.retryText}>Try again</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={filteredShows}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshing={isLoading}
          onRefresh={loadShows}
          renderItem={({ item }) => (
            <ShowCard
              show={item}
              onPress={() =>
                navigation.navigate("ShowDetail", { showId: item.id })
              }
            />
          )}
          ListHeaderComponent={
            <Text style={styles.resultsText}>
              {filteredShows.length}{" "}
              {filteredShows.length === 1 ? "show found" : "shows found"}
            </Text>
          }
          ListEmptyComponent={
            hasActiveFilters ? (
              <EmptyState
                title="No matches found"
                message="Try another title or change the selected filters."
              />
            ) : (
              <EmptyState
                title="No shows yet"
                message="Add your first show to start building your local catalog."
              />
            )
          }
        />
      )}
    </View>
  );
}

type DropdownProps = {
  label: string;
  value: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
};

function Dropdown({
  label,
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
}: DropdownProps) {
  const [scrollY, setScrollY] = useState(0);
  const [contentHeight, setContentHeight] = useState(1);
  const [containerHeight, setContainerHeight] = useState(1);

  const canScroll = contentHeight > containerHeight;

  const scrollbarHeight = Math.max(
    36,
    (containerHeight / contentHeight) * containerHeight
  );

  const maxScrollY = Math.max(1, contentHeight - containerHeight);
  const maxScrollbarTop = Math.max(0, containerHeight - scrollbarHeight);

  const scrollbarTop = canScroll
    ? (scrollY / maxScrollY) * maxScrollbarTop
    : 0;

  return (
    <View style={styles.dropdownWrapper}>
      <Text style={styles.dropdownLabel}>{label}</Text>

      <Pressable style={styles.dropdownButton} onPress={onToggle}>
        <Text numberOfLines={1} style={styles.dropdownValue}>
          {value}
        </Text>

        <View style={styles.dropdownIconBox}>
          {isOpen ? (
            <ChevronUp size={17} color={colors.accent} strokeWidth={3} />
          ) : (
            <ChevronDown size={17} color={colors.accent} strokeWidth={3} />
          )}
        </View>
      </Pressable>

      {isOpen && (
        <View style={styles.dropdownMenu}>
          <ScrollView
            nestedScrollEnabled
            style={styles.dropdownScroll}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={(event) => {
              setScrollY(event.nativeEvent.contentOffset.y);
            }}
            onContentSizeChange={(_, height) => {
              setContentHeight(height);
            }}
            onLayout={(event) => {
              setContainerHeight(event.nativeEvent.layout.height);
            }}
          >
            {options.map((option) => {
              const selected = option === value;

              return (
                <Pressable
                  key={option}
                  style={[
                    styles.dropdownOption,
                    selected && styles.dropdownOptionSelected,
                  ]}
                  onPress={() => onSelect(option)}
                >
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.dropdownOptionText,
                      selected && styles.dropdownOptionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {canScroll && (
            <View style={styles.customScrollbarTrack}>
              <View
                style={[
                  styles.customScrollbarThumb,
                  {
                    height: scrollbarHeight,
                    transform: [{ translateY: scrollbarTop }],
                  },
                ]}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heroGlow: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 260,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 10,
    zIndex: 20,
  },
  eyebrow: {
    color: colors.accent,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    fontSize: 12,
  },
  title: {
    color: colors.text,
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: -1.6,
    marginTop: 2,
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 360,
    marginTop: 4,
  },
  searchWrapper: {
    marginTop: 14,
    minHeight: 50,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    maxWidth: 560,
  },
  searchIcon: {
    color: colors.accent,
    fontSize: 21,
    fontWeight: "900",
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    paddingVertical: 13,
    outlineStyle: "none" as never,
  },
  clearButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  clearButtonText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900",
    lineHeight: 22,
  },
  filtersRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
    maxWidth: 760,
    zIndex: 30,
  },
  dropdownWrapper: {
    flex: 1,
    minWidth: 0,
    zIndex: 40,
  },
  dropdownLabel: {
    color: colors.mutedText,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  dropdownButton: {
    minHeight: 44,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800",
    flex: 1,
    marginRight: 8,
  },
  dropdownIconBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(56,189,248,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  dropdownMenu: {
    position: "absolute",
    top: 68,
    left: 0,
    right: 0,
    maxHeight: 210,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    overflow: "hidden",
    zIndex: 999,
  },
  dropdownScroll: {
    maxHeight: 210,
    paddingRight: 10,
  },
  dropdownOption: {
    paddingHorizontal: 13,
    paddingVertical: 12,
    paddingRight: 22,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  dropdownOptionSelected: {
    backgroundColor: "rgba(167,139,250,0.18)",
  },
  dropdownOptionText: {
    color: colors.whiteSoft,
    fontSize: 13,
    fontWeight: "700",
  },
  dropdownOptionTextSelected: {
    color: colors.primary,
    fontWeight: "900",
  },
  customScrollbarTrack: {
    position: "absolute",
    top: 8,
    bottom: 8,
    right: 6,
    width: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  customScrollbarThumb: {
    width: 5,
    borderRadius: 999,
    backgroundColor: colors.accent,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
    marginBottom: 4,
    flexWrap: "wrap",
  },
  actionButton: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  primaryButtonText: {
    color: colors.background,
    fontWeight: "900",
  },
  actionButtonText: {
    color: colors.text,
    fontWeight: "900",
  },
  clearFiltersButton: {
    backgroundColor: "rgba(56,189,248,0.12)",
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.24)",
  },
  clearFiltersText: {
    color: colors.accent,
    fontWeight: "900",
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 48,
  },
  resultsText: {
    color: colors.mutedText,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 12,
  },
  content: {
    padding: 20,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: colors.mutedText,
    marginTop: 12,
    fontWeight: "700",
  },
  retryButton: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    padding: 15,
    alignItems: "center",
    marginTop: 16,
  },
  retryText: {
    color: colors.background,
    fontWeight: "900",
  },
});