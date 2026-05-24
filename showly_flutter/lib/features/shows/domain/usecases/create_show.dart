import '../entities/show.dart';

class CreateShow {
  List<Show> execute(List<Show> shows, Show show) {
    return [show, ...shows];
  }
}
