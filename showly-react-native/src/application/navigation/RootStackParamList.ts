import { Show } from "../../features/shows/domain/entities/show";

export type RootStackParamList = {
  Shows: undefined;
  ShowDetail: {
    showId: number;
  };
  ShowForm: {
    mode: "create" | "edit";
    show?: Show;
  };
  Metrics: undefined;
};