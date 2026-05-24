import { ShowRepository } from "../repositories/showRepository";

export class GetShows {
  constructor(private readonly repository: ShowRepository) {}

  execute() {
    return this.repository.getShows();
  }
}