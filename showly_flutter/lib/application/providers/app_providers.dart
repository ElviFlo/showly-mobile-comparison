import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../features/shows/data/datasources/tvmaze_remote_datasource.dart';
import '../../features/shows/data/repositories/show_repository_impl.dart';
import '../../features/shows/domain/usecases/create_show.dart';
import '../../features/shows/domain/usecases/delete_show.dart';
import '../../features/shows/domain/usecases/get_shows.dart';
import '../../features/shows/domain/usecases/update_show.dart';
import '../../features/shows/presentation/state/shows_provider.dart';

class AppProviders extends StatelessWidget {
  final Widget child;

  const AppProviders({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    final remoteDataSource = TvMazeRemoteDataSource();
    final repository = ShowRepositoryImpl(remoteDataSource);

    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) => ShowsProvider(
            getShowsUseCase: GetShows(repository),
            createShowUseCase: CreateShow(),
            updateShowUseCase: UpdateShow(),
            deleteShowUseCase: DeleteShow(),
          )..loadShows(),
        ),
      ],
      child: child,
    );
  }
}
