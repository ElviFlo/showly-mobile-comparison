import 'package:flutter/material.dart';
import 'application/providers/app_providers.dart';
import 'application/navigation/app_router.dart';
import 'core/theme/app_theme.dart';

void main() {
  runApp(const ShowlyApp());
}

class ShowlyApp extends StatelessWidget {
  const ShowlyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return AppProviders(
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Showly',
        theme: AppTheme.darkTheme,
        initialRoute: AppRouter.shows,
        onGenerateRoute: AppRouter.onGenerateRoute,
      ),
    );
  }
}
