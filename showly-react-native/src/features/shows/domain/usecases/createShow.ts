import { Show } from "../entities/show";

export function createShow(shows: Show[], show: Show): Show[] {
  return [show, ...shows];
}