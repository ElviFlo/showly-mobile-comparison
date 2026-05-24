import { Show } from "../entities/show";

export function updateShow(shows: Show[], updatedShow: Show): Show[] {
  return shows.map((show) => (show.id === updatedShow.id ? updatedShow : show));
}