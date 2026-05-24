import 'package:flutter/material.dart';

import '../../../../core/utils/performance.dart';
import '../../domain/entities/show.dart';
import '../../domain/usecases/create_show.dart';
import '../../domain/usecases/delete_show.dart';
import '../../domain/usecases/get_shows.dart';
import '../../domain/usecases/update_show.dart';

class ShowsProvider extends ChangeNotifier {
  final GetShows getShowsUseCase;
  final CreateShow createShowUseCase;
  final UpdateShow updateShowUseCase;
  final DeleteShow deleteShowUseCase;

  ShowsProvider({
    required this.getShowsUseCase,
    required this.createShowUseCase,
    required this.updateShowUseCase,
    required this.deleteShowUseCase,
  }) {
    _appStartedAt = nowMs();
  }

  late final double _appStartedAt;

  List<Show> _shows = [];
  bool _isLoading = false;
  String? _error;
  double? _apiResponseTimeMs;
  double? _coldStartTimeMs;

  List<Show> get shows => _shows;
  bool get isLoading => _isLoading;
  String? get error => _error;
  double? get apiResponseTimeMs => _apiResponseTimeMs;
  double? get coldStartTimeMs => _coldStartTimeMs;

  Future<void> loadShows() async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();

      final requestStartedAt = nowMs();
      final loadedShows = await getShowsUseCase.execute();
      final requestEndedAt = nowMs();

      _shows = loadedShows;
      _apiResponseTimeMs = roundMetric(requestEndedAt - requestStartedAt);

      final firstFunctionalScreenAt = nowMs();
      _coldStartTimeMs = roundMetric(firstFunctionalScreenAt - _appStartedAt);

      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }

  Show? getShowById(int showId) {
    try {
      return _shows.firstWhere((show) => show.id == showId);
    } catch (_) {
      return null;
    }
  }

  void createShow(Show show) {
    final newShow = show.copyWith(
      id: DateTime.now().millisecondsSinceEpoch,
      isLocal: true,
    );

    _shows = createShowUseCase.execute(_shows, newShow);
    notifyListeners();
  }

  void updateShow(Show updatedShow) {
    _shows = updateShowUseCase.execute(_shows, updatedShow);
    notifyListeners();
  }

  void deleteShow(int showId) {
    _shows = deleteShowUseCase.execute(_shows, showId);
    notifyListeners();
  }
}
