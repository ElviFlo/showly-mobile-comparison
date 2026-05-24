import { Show } from "../../domain/entities/show";
import { ShowRepository } from "../../domain/repositories/showRepository";
import { TvMazeRemoteDataSource } from "../datasources/tvMazeRemoteDataSource";
import { mapTvMazeShowToEntity } from "../models/showModel";

export class ShowRepositoryImpl implements ShowRepository {
  constructor(private readonly remoteDataSource: TvMazeRemoteDataSource) {}

  async getShows(): Promise<Show[]> {
    const shows = await this.remoteDataSource.getShows();
    return shows.slice(0, 40).map(mapTvMazeShowToEntity);
  }
}