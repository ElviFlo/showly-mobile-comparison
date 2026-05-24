import '../entities/show.dart';
import '../repositories/show_repository.dart';

class GetShows {
  final ShowRepository repository;

  GetShows(this.repository);

  Future<List<Show>> execute() {
    return repository.getShows();
  }
}
