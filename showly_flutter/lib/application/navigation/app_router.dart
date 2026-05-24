import 'package:flutter/material.dart';

import '../../features/shows/domain/entities/show.dart';
import '../../features/shows/presentation/screens/metrics_screen.dart';
import '../../features/shows/presentation/screens/show_detail_screen.dart';
import '../../features/shows/presentation/screens/show_form_screen.dart';
import '../../features/shows/presentation/screens/shows_screen.dart';

class AppRouter {
  static const String shows = '/';
  static const String detail = '/detail';
  static const String form = '/form';
  static const String metrics = '/metrics';

  static Route<dynamic> onGenerateRoute(RouteSettings settings) {
    switch (settings.name) {
      case shows:
        return MaterialPageRoute(builder: (_) => const ShowsScreen());

      case detail:
        final showId = settings.arguments as int;
        return MaterialPageRoute(
          builder: (_) => ShowDetailScreen(showId: showId),
        );

      case form:
        final args = settings.arguments as ShowFormArgs;
        return MaterialPageRoute(builder: (_) => ShowFormScreen(args: args));

      case metrics:
        return MaterialPageRoute(builder: (_) => const MetricsScreen());

      default:
        return MaterialPageRoute(builder: (_) => const ShowsScreen());
    }
  }
}

class ShowFormArgs {
  final String mode;
  final Show? show;

  const ShowFormArgs({required this.mode, this.show});
}
