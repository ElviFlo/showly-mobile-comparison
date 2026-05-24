import { API_CONFIG } from "../../../../core/constants/api";
import { TvMazeShowModel } from "../models/showModel";

export class TvMazeRemoteDataSource {
  async getShows(): Promise<TvMazeShowModel[]> {
    const response = await fetch(
      `${API_CONFIG.TV_MAZE_BASE_URL}${API_CONFIG.SHOWS_ENDPOINT}`
    );

    if (!response.ok) {
      throw new Error("Could not fetch TVMaze shows.");
    }

    return response.json();
  }
}