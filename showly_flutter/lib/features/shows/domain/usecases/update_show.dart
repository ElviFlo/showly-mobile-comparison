import '../entities/show.dart';

class UpdateShow {
  List<Show> execute(List<Show> shows, Show updatedShow) {
    return shows
        .map((show) => show.id == updatedShow.id ? updatedShow : show)
        .toList();
  }
}
