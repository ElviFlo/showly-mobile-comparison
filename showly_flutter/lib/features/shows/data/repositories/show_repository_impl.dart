import '../../domain/entities/show.dart';
import '../../domain/repositories/show_repository.dart';
import '../datasources/tvmaze_remote_datasource.dart';
import '../models/show_model.dart';

class ShowRepositoryImpl implements ShowRepository {
  final TvMazeRemoteDataSource remoteDataSource;

  ShowRepositoryImpl(this.remoteDataSource);

  @override
  Future<List<Show>> getShows() async {
    final response = await remoteDataSource.getShows();

    return response
        .take(40)
        .map((json) => ShowModel(json as Map<String, dynamic>).toEntity())
        .toList();
  }
}
