import { Show } from "../entities/show";

export interface ShowRepository {
  getShows(): Promise<Show[]>;
}