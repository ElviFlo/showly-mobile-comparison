import '../entities/show.dart';

class DeleteShow {
  List<Show> execute(List<Show> shows, int showId) {
    return shows.where((show) => show.id != showId).toList();
  }
}
