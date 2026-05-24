import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../application/navigation/RootStackParamList";
import { ShowForm } from "../components/ShowForm";
import { useShows } from "../state/showsContext";
import { Show } from "../../shows/domain/entities/show";

type Props = NativeStackScreenProps<RootStackParamList, "ShowForm">;

export function ShowFormScreen({ route, navigation }: Props) {
  const { mode, show } = route.params;
  const { createShow, updateShow } = useShows();

  function handleSubmit(payload: Omit<Show, "id"> | Show) {
    if (mode === "edit") {
      updateShow(payload as Show);
    } else {
      createShow(payload as Omit<Show, "id">);
    }

    navigation.goBack();
  }

  return (
    <ShowForm
      initialShow={show}
      submitLabel={mode === "edit" ? "Save changes" : "Create show"}
      onSubmit={handleSubmit}
    />
  );
}