import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Show } from "../../shows/domain/entities/show";
import { colors } from "../../../core/theme/colors";

type ShowFormProps = {
  initialShow?: Show;
  submitLabel: string;
  onSubmit: (show: Omit<Show, "id"> | Show) => void;
};

export function ShowForm({ initialShow, submitLabel, onSubmit }: ShowFormProps) {
  const [name, setName] = useState(initialShow?.name ?? "");
  const [imageUrl, setImageUrl] = useState(initialShow?.imageUrl ?? "");
  const [summary, setSummary] = useState(initialShow?.summary ?? "");
  const [genres, setGenres] = useState(initialShow?.genres.join(", ") ?? "");
  const [rating, setRating] = useState(
    initialShow?.rating ? String(initialShow.rating) : ""
  );
  const [status, setStatus] = useState(initialShow?.status ?? "Running");
  const [language, setLanguage] = useState(initialShow?.language ?? "English");
  const [runtime, setRuntime] = useState(
    initialShow?.runtime ? String(initialShow.runtime) : ""
  );
  const [premiered, setPremiered] = useState(initialShow?.premiered ?? "");
  const [userNote, setUserNote] = useState(initialShow?.userNote ?? "");

  function handleSubmit() {
    const payload = {
      ...(initialShow ? { id: initialShow.id } : {}),
      name: name.trim() || "Untitled show",
      imageUrl:
        imageUrl.trim() ||
        "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png",
      summary: summary.trim() || "No summary available.",
      genres: genres
        .split(",")
        .map((genre) => genre.trim())
        .filter(Boolean),
      rating: rating ? Number(rating) : null,
      status: status.trim() || "Unknown",
      language: language.trim() || "Unknown",
      runtime: runtime ? Number(runtime) : null,
      premiered: premiered.trim() || null,
      userNote: userNote.trim(),
      isLocal: initialShow?.isLocal ?? true,
    };

    onSubmit(payload as Show);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>
        {initialShow ? "Refine your show" : "Add a new show"}
      </Text>

      <Text style={styles.description}>
        Keep your local catalog clean, personal, and easy to compare with the
        Flutter version later.
      </Text>

      <Field label="Name" value={name} onChangeText={setName} />
      <Field label="Image URL" value={imageUrl} onChangeText={setImageUrl} />
      <Field
        label="Summary"
        value={summary}
        onChangeText={setSummary}
        multiline
      />
      <Field
        label="Genres separated by comma"
        value={genres}
        onChangeText={setGenres}
      />
      <Field
        label="Rating"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />
      <Field label="Status" value={status} onChangeText={setStatus} />
      <Field label="Language" value={language} onChangeText={setLanguage} />
      <Field
        label="Runtime"
        value={runtime}
        onChangeText={setRuntime}
        keyboardType="numeric"
      />
      <Field
        label="Premiered"
        value={premiered}
        onChangeText={setPremiered}
        placeholder="YYYY-MM-DD"
      />
      <Field
        label="Personal note"
        value={userNote}
        onChangeText={setUserNote}
        multiline
      />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{submitLabel}</Text>
      </Pressable>
    </ScrollView>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  multiline?: boolean;
  keyboardType?: "default" | "numeric";
  placeholder?: string;
};

function Field({
  label,
  value,
  onChangeText,
  multiline,
  keyboardType = "default",
  placeholder,
}: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedText}
        style={[styles.input, multiline && styles.multiline]}
      />
    </View>
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
  heading: {
    color: colors.text,
    fontSize: 31,
    fontWeight: "900",
    letterSpacing: -0.8,
  },
  description: {
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 22,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    color: colors.whiteSoft,
    fontWeight: "800",
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: colors.text,
    fontSize: 15,
  },
  multiline: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "900",
  },
});