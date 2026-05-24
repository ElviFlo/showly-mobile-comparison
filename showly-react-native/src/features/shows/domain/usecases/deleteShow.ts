import { Show } from "../entities/show";

export function deleteShow(shows: Show[], showId: number): Show[] {
  return shows.filter((show) => show.id !== showId);
}