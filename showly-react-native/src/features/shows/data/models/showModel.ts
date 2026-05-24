import { Show } from "../../domain/entities/show";
import { cleanHtml } from "../../../../core/utils/cleanHtml";

export type TvMazeShowModel = {
  id: number;
  name: string;
  image?: {
    medium?: string;
    original?: string;
  } | null;
  summary?: string | null;
  genres?: string[];
  rating?: {
    average?: number | null;
  };
  status?: string;
  language?: string;
  runtime?: number | null;
  premiered?: string | null;
};

export function mapTvMazeShowToEntity(model: TvMazeShowModel): Show {
  return {
    id: model.id,
    name: model.name,
    imageUrl:
      model.image?.original ??
      model.image?.medium ??
      "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png",
    summary: cleanHtml(model.summary),
    genres: model.genres ?? [],
    rating: model.rating?.average ?? null,
    status: model.status ?? "Unknown",
    language: model.language ?? "Unknown",
    runtime: model.runtime ?? null,
    premiered: model.premiered ?? null,
    isLocal: false,
  };
}