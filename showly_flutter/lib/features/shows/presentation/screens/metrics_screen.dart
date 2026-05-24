import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../../core/theme/app_colors.dart';
import '../components/metric_card.dart';
import '../state/shows_provider.dart';

class MetricsScreen extends StatelessWidget {
  const MetricsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<ShowsProvider>();

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Metrics')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(20, 20, 20, 48),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Comparison metrics',
              style: TextStyle(
                color: AppColors.text,
                fontSize: 36,
                fontWeight: FontWeight.w900,
                letterSpacing: -1.2,
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'These values help compare Showly Flutter against the React Native implementation.',
              style: TextStyle(
                color: AppColors.mutedText,
                fontSize: 16,
                height: 1.45,
              ),
            ),
            const SizedBox(height: 22),
            MetricCard(
              label: 'API response time',
              value: provider.apiResponseTimeMs != null
                  ? '${provider.apiResponseTimeMs} ms'
                  : 'Pending',
              helper:
                  'Measured from the moment the request starts until the API data is received and placed in state.',
            ),
            MetricCard(
              label: 'Cold start',
              value: provider.coldStartTimeMs != null
                  ? '${provider.coldStartTimeMs} ms'
                  : 'Pending',
              helper:
                  'Approximate time from app startup until the first functional screen is ready.',
            ),
            MetricCard(
              label: 'Items in memory',
              value: '${provider.shows.length}',
              helper:
                  'All records are stored in RAM through Provider and ChangeNotifier. No local database is used.',
            ),
            const MetricCard(
              label: 'Final APK/AAB size',
              value: '46.4 MB',
              helper:
                  'Fill this after generating the release build with Flutter.',
            ),
            const MetricCard(
              label: 'Release build time',
              value: '13.93 s',
              helper:
                  'Measure this with PowerShell Measure-Command or a terminal timer.',
            ),
            const MetricCard(
              label: 'Interface fluidity',
              value: 'Manual review',
              helper:
                  'Evaluate scroll behavior, navigation smoothness, filters, forms and visual stability during CRUD interactions.',
            ),
          ],
        ),
      ),
    );
  }
}
