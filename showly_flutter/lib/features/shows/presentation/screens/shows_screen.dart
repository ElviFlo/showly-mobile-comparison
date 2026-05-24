import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../../application/navigation/app_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../domain/entities/show.dart';
import '../components/empty_state.dart';
import '../components/show_card.dart';
import '../components/show_dropdown.dart';
import '../state/shows_provider.dart';

class ShowsScreen extends StatefulWidget {
  const ShowsScreen({super.key});

  @override
  State<ShowsScreen> createState() => _ShowsScreenState();
}

class _ShowsScreenState extends State<ShowsScreen> {
  String searchQuery = '';
  String selectedGenre = 'All';
  String selectedStatus = 'All';
  String selectedLanguage = 'All';

  late final TextEditingController searchController;

  @override
  void initState() {
    super.initState();
    searchController = TextEditingController();
  }

  @override
  void dispose() {
    searchController.dispose();
    super.dispose();
  }

  List<String> _genres(List<Show> shows) {
    final genres = <String>{};

    for (final show in shows) {
      genres.addAll(show.genres);
    }

    return ['All', ...genres.toList()..sort()];
  }

  List<String> _statuses(List<Show> shows) {
    final statuses = shows.map((show) => show.status).toSet().toList()..sort();
    return ['All', ...statuses];
  }

  List<String> _languages(List<Show> shows) {
    final languages = shows.map((show) => show.language).toSet().toList()
      ..sort();
    return ['All', ...languages];
  }

  List<Show> _filteredShows(List<Show> shows) {
    final query = searchQuery.trim().toLowerCase();

    return shows.where((show) {
      final matchesTitle = show.name.toLowerCase().contains(query);

      final matchesGenre =
          selectedGenre == 'All' || show.genres.contains(selectedGenre);

      final matchesStatus =
          selectedStatus == 'All' || show.status == selectedStatus;

      final matchesLanguage =
          selectedLanguage == 'All' || show.language == selectedLanguage;

      return matchesTitle && matchesGenre && matchesStatus && matchesLanguage;
    }).toList();
  }

  bool get hasActiveFilters {
    return searchQuery.trim().isNotEmpty ||
        selectedGenre != 'All' ||
        selectedStatus != 'All' ||
        selectedLanguage != 'All';
  }

  void _clearFilters() {
    searchController.clear();

    setState(() {
      searchQuery = '';
      selectedGenre = 'All';
      selectedStatus = 'All';
      selectedLanguage = 'All';
    });
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<ShowsProvider>();
    final shows = provider.shows;
    final filteredShows = _filteredShows(shows);

    return Scaffold(
      backgroundColor: AppColors.background,
      body: Stack(
        children: [
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            height: 260,
            child: DecoratedBox(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    AppColors.primary.withOpacity(0.32),
                    Colors.transparent,
                  ],
                ),
              ),
            ),
          ),
          SafeArea(
            child: Column(
              children: [
                _Header(
                  searchController: searchController,
                  searchQuery: searchQuery,
                  onSearchChanged: (value) {
                    setState(() => searchQuery = value);
                  },
                  onClearSearch: () {
                    searchController.clear();
                    setState(() => searchQuery = '');
                  },
                  genres: _genres(shows),
                  statuses: _statuses(shows),
                  languages: _languages(shows),
                  selectedGenre: selectedGenre,
                  selectedStatus: selectedStatus,
                  selectedLanguage: selectedLanguage,
                  onGenreChanged: (value) {
                    setState(() => selectedGenre = value);
                  },
                  onStatusChanged: (value) {
                    setState(() => selectedStatus = value);
                  },
                  onLanguageChanged: (value) {
                    setState(() => selectedLanguage = value);
                  },
                  hasActiveFilters: hasActiveFilters,
                  onClearFilters: _clearFilters,
                ),
                Expanded(
                  child: _Body(
                    provider: provider,
                    filteredShows: filteredShows,
                    hasActiveFilters: hasActiveFilters,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _Header extends StatelessWidget {
  final TextEditingController searchController;
  final String searchQuery;
  final ValueChanged<String> onSearchChanged;
  final VoidCallback onClearSearch;

  final List<String> genres;
  final List<String> statuses;
  final List<String> languages;

  final String selectedGenre;
  final String selectedStatus;
  final String selectedLanguage;

  final ValueChanged<String> onGenreChanged;
  final ValueChanged<String> onStatusChanged;
  final ValueChanged<String> onLanguageChanged;

  final bool hasActiveFilters;
  final VoidCallback onClearFilters;

  const _Header({
    required this.searchController,
    required this.searchQuery,
    required this.onSearchChanged,
    required this.onClearSearch,
    required this.genres,
    required this.statuses,
    required this.languages,
    required this.selectedGenre,
    required this.selectedStatus,
    required this.selectedLanguage,
    required this.onGenreChanged,
    required this.onStatusChanged,
    required this.onLanguageChanged,
    required this.hasActiveFilters,
    required this.onClearFilters,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 18, 20, 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'SERIES CATALOG',
            style: TextStyle(
              color: AppColors.accent,
              fontSize: 12,
              fontWeight: FontWeight.w900,
              letterSpacing: 1.5,
            ),
          ),
          const SizedBox(height: 2),
          const Text(
            'Showly',
            style: TextStyle(
              color: AppColors.text,
              fontSize: 42,
              fontWeight: FontWeight.w900,
              letterSpacing: -1.6,
            ),
          ),
          const SizedBox(height: 4),
          const Text(
            'Discover, edit and curate your own local show collection.',
            style: TextStyle(
              color: AppColors.mutedText,
              fontSize: 15,
              height: 1.45,
            ),
          ),
          const SizedBox(height: 14),
          Container(
            height: 50,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.06),
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: AppColors.border),
            ),
            child: Row(
              children: [
                const Icon(
                  Icons.search_rounded,
                  color: AppColors.accent,
                  size: 22,
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: TextField(
                    controller: searchController,
                    onChanged: onSearchChanged,
                    cursorColor: AppColors.accent,
                    style: const TextStyle(
                      color: AppColors.text,
                      fontSize: 15,
                      fontWeight: FontWeight.w700,
                    ),
                    decoration: const InputDecoration(
                      hintText: 'Search by title...',
                      hintStyle: TextStyle(color: AppColors.mutedText),
                      border: InputBorder.none,
                      enabledBorder: InputBorder.none,
                      focusedBorder: InputBorder.none,
                      contentPadding: EdgeInsets.zero,
                    ),
                  ),
                ),
                if (searchQuery.isNotEmpty)
                  GestureDetector(
                    onTap: onClearSearch,
                    child: Container(
                      width: 28,
                      height: 28,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.08),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(
                        Icons.close_rounded,
                        color: AppColors.text,
                        size: 18,
                      ),
                    ),
                  ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              ShowDropdown(
                label: 'Genre',
                value: selectedGenre,
                options: genres,
                onChanged: onGenreChanged,
              ),
              const SizedBox(width: 10),
              ShowDropdown(
                label: 'Status',
                value: selectedStatus,
                options: statuses,
                onChanged: onStatusChanged,
              ),
              const SizedBox(width: 10),
              ShowDropdown(
                label: 'Language',
                value: selectedLanguage,
                options: languages,
                onChanged: onLanguageChanged,
              ),
            ],
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 10,
            runSpacing: 10,
            children: [
              _ActionButton(
                label: '+ Add show',
                isPrimary: true,
                onTap: () {
                  Navigator.pushNamed(
                    context,
                    AppRouter.form,
                    arguments: const ShowFormArgs(mode: 'create'),
                  );
                },
              ),
              _ActionButton(
                label: 'Metrics',
                onTap: () {
                  Navigator.pushNamed(context, AppRouter.metrics);
                },
              ),
              if (hasActiveFilters)
                _ActionButton(
                  label: 'Clear',
                  isAccent: true,
                  onTap: onClearFilters,
                ),
            ],
          ),
        ],
      ),
    );
  }
}

class _Body extends StatelessWidget {
  final ShowsProvider provider;
  final List<Show> filteredShows;
  final bool hasActiveFilters;

  const _Body({
    required this.provider,
    required this.filteredShows,
    required this.hasActiveFilters,
  });

  @override
  Widget build(BuildContext context) {
    if (provider.isLoading && provider.shows.isEmpty) {
      return const Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            CircularProgressIndicator(color: AppColors.primary),
            SizedBox(height: 12),
            Text(
              'Loading shows...',
              style: TextStyle(
                color: AppColors.mutedText,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ),
      );
    }

    if (provider.error != null) {
      return Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            EmptyState(title: 'Something went wrong', message: provider.error!),
            const SizedBox(height: 16),
            _ActionButton(
              label: 'Try again',
              isPrimary: true,
              onTap: provider.loadShows,
            ),
          ],
        ),
      );
    }

    return RefreshIndicator(
      color: AppColors.primary,
      backgroundColor: AppColors.surface,
      onRefresh: provider.loadShows,
      child: ListView.builder(
        padding: const EdgeInsets.fromLTRB(20, 8, 20, 48),
        itemCount: filteredShows.isEmpty ? 2 : filteredShows.length + 1,
        itemBuilder: (context, index) {
          if (index == 0) {
            return Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: Text(
                '${filteredShows.length} ${filteredShows.length == 1 ? 'show found' : 'shows found'}',
                style: const TextStyle(
                  color: AppColors.mutedText,
                  fontSize: 14,
                  fontWeight: FontWeight.w800,
                ),
              ),
            );
          }

          if (filteredShows.isEmpty) {
            return EmptyState(
              title: hasActiveFilters ? 'No matches found' : 'No shows yet',
              message: hasActiveFilters
                  ? 'Try another title or change the selected filters.'
                  : 'Add your first show to start building your local catalog.',
            );
          }

          final show = filteredShows[index - 1];

          return ShowCard(
            show: show,
            onTap: () {
              Navigator.pushNamed(
                context,
                AppRouter.detail,
                arguments: show.id,
              );
            },
          );
        },
      ),
    );
  }
}

class _ActionButton extends StatelessWidget {
  final String label;
  final VoidCallback onTap;
  final bool isPrimary;
  final bool isAccent;

  const _ActionButton({
    required this.label,
    required this.onTap,
    this.isPrimary = false,
    this.isAccent = false,
  });

  @override
  Widget build(BuildContext context) {
    final backgroundColor = isPrimary
        ? AppColors.primary
        : isAccent
        ? AppColors.accent.withOpacity(0.12)
        : AppColors.surface;

    final borderColor = isPrimary
        ? AppColors.primary
        : isAccent
        ? AppColors.accent.withOpacity(0.24)
        : AppColors.border;

    final textColor = isPrimary
        ? AppColors.background
        : isAccent
        ? AppColors.accent
        : AppColors.text;

    return Material(
      color: backgroundColor,
      borderRadius: BorderRadius.circular(16),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 12),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: borderColor),
          ),
          child: Text(
            label,
            style: TextStyle(color: textColor, fontWeight: FontWeight.w900),
          ),
        ),
      ),
    );
  }
}
