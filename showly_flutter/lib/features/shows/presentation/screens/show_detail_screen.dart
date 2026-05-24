import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../../application/navigation/app_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/utils/format_runtime.dart';
import '../../domain/entities/show.dart';
import '../state/shows_provider.dart';

class ShowDetailScreen extends StatelessWidget {
  final int showId;

  const ShowDetailScreen({super.key, required this.showId});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<ShowsProvider>();
    final show = provider.getShowById(showId);

    if (show == null) {
      return const Scaffold(
        backgroundColor: AppColors.background,
        body: Center(
          child: Text(
            'Show not found',
            style: TextStyle(
              color: AppColors.text,
              fontSize: 20,
              fontWeight: FontWeight.w900,
            ),
          ),
        ),
      );
    }

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: GestureDetector(
          onTap: () => Navigator.pop(context),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 9),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.06),
              borderRadius: BorderRadius.circular(999),
              border: Border.all(color: AppColors.border),
            ),
            child: const Text(
              '← Back to home',
              style: TextStyle(
                color: AppColors.text,
                fontSize: 14,
                fontWeight: FontWeight.w900,
              ),
            ),
          ),
        ),
        automaticallyImplyLeading: false,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            _Poster(show: show),
            _DetailContent(show: show),
          ],
        ),
      ),
    );
  }
}

class _Poster extends StatelessWidget {
  final Show show;

  const _Poster({required this.show});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 440,
      width: double.infinity,
      child: Stack(
        fit: StackFit.expand,
        children: [
          Image.network(
            show.imageUrl,
            fit: BoxFit.cover,
            errorBuilder: (_, __, ___) {
              return Container(
                color: AppColors.surfaceSoft,
                alignment: Alignment.center,
                child: const Icon(
                  Icons.movie_rounded,
                  color: AppColors.mutedText,
                  size: 64,
                ),
              );
            },
          ),
          DecoratedBox(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.center,
                colors: [
                  AppColors.background.withOpacity(0.35),
                  Colors.transparent,
                ],
              ),
            ),
          ),
          DecoratedBox(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.center,
                end: Alignment.bottomCenter,
                colors: [Colors.transparent, AppColors.background],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _DetailContent extends StatelessWidget {
  final Show show;

  const _DetailContent({required this.show});

  @override
  Widget build(BuildContext context) {
    return Transform.translate(
      offset: const Offset(0, -60),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 0, 20, 40),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              show.name,
              style: const TextStyle(
                color: AppColors.text,
                fontSize: 38,
                fontWeight: FontWeight.w900,
                letterSpacing: -1.2,
              ),
            ),
            const SizedBox(height: 14),
            Wrap(
              spacing: 10,
              runSpacing: 10,
              children: [
                _Badge(
                  label: show.rating != null ? '★ ${show.rating}' : '★ N/A',
                ),
                _Badge(label: show.status),
                _Badge(label: formatRuntime(show.runtime)),
              ],
            ),
            const SizedBox(height: 28),
            const _SectionTitle(title: 'Story'),
            Text(
              show.summary,
              style: const TextStyle(
                color: AppColors.mutedText,
                fontSize: 16,
                height: 1.55,
              ),
            ),
            const SizedBox(height: 28),
            const _SectionTitle(title: 'Details'),
            _DetailsCard(show: show),
            if (show.userNote != null && show.userNote!.trim().isNotEmpty) ...[
              const SizedBox(height: 28),
              const _SectionTitle(title: 'Personal note'),
              Text(
                show.userNote!,
                style: const TextStyle(
                  color: AppColors.mutedText,
                  fontSize: 16,
                  height: 1.55,
                ),
              ),
            ],
            const SizedBox(height: 30),
            Row(
              children: [
                Expanded(
                  child: _ActionButton(
                    label: 'Edit',
                    isPrimary: true,
                    onTap: () {
                      Navigator.pushNamed(
                        context,
                        AppRouter.form,
                        arguments: ShowFormArgs(mode: 'edit', show: show),
                      );
                    },
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _ActionButton(
                    label: 'Delete',
                    isDelete: true,
                    onTap: () => _showDeleteDialog(context, show),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _showDeleteDialog(BuildContext context, Show show) {
    showDialog<void>(
      context: context,
      barrierColor: const Color(0xB8050612),
      builder: (dialogContext) {
        return Dialog(
          backgroundColor: Colors.transparent,
          insetPadding: const EdgeInsets.all(24),
          child: Container(
            width: 420,
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: AppColors.surface,
              borderRadius: BorderRadius.circular(28),
              border: Border.all(color: AppColors.border),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 46,
                  height: 46,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: AppColors.rose.withOpacity(0.16),
                    shape: BoxShape.circle,
                    border: Border.all(color: AppColors.rose.withOpacity(0.36)),
                  ),
                  child: const Text(
                    '!',
                    style: TextStyle(
                      color: AppColors.rose,
                      fontSize: 24,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                const Text(
                  'Delete show?',
                  style: TextStyle(
                    color: AppColors.text,
                    fontSize: 26,
                    fontWeight: FontWeight.w900,
                    letterSpacing: -0.6,
                  ),
                ),
                const SizedBox(height: 10),
                RichText(
                  text: TextSpan(
                    style: const TextStyle(
                      color: AppColors.mutedText,
                      fontSize: 15,
                      height: 1.5,
                    ),
                    children: [
                      const TextSpan(text: 'Are you sure you want to delete '),
                      TextSpan(
                        text: show.name,
                        style: const TextStyle(
                          color: AppColors.text,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                      const TextSpan(
                        text:
                            '? This action will remove it from the local catalog.',
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
                Row(
                  children: [
                    Expanded(
                      child: _DialogButton(
                        label: 'Cancel',
                        onTap: () => Navigator.pop(dialogContext),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: _DialogButton(
                        label: 'Delete',
                        isDelete: true,
                        onTap: () {
                          context.read<ShowsProvider>().deleteShow(show.id);
                          Navigator.pop(dialogContext);
                          Navigator.pop(context);
                        },
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

class _Badge extends StatelessWidget {
  final String label;

  const _Badge({required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: AppColors.border),
      ),
      child: Text(
        label,
        style: const TextStyle(
          color: AppColors.whiteSoft,
          fontWeight: FontWeight.w800,
        ),
      ),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  final String title;

  const _SectionTitle({required this.title});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Text(
        title,
        style: const TextStyle(
          color: AppColors.text,
          fontSize: 20,
          fontWeight: FontWeight.w900,
        ),
      ),
    );
  }
}

class _DetailsCard extends StatelessWidget {
  final Show show;

  const _DetailsCard({required this.show});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _DetailRow(
            label: 'Genres',
            value: show.genres.isNotEmpty ? show.genres.join(', ') : 'N/A',
          ),
          _DetailRow(label: 'Language', value: show.language),
          _DetailRow(label: 'Premiered', value: show.premiered ?? 'Unknown'),
          _DetailRow(label: 'Source', value: show.isLocal ? 'Local' : 'TVMaze'),
        ],
      ),
    );
  }
}

class _DetailRow extends StatelessWidget {
  final String label;
  final String value;

  const _DetailRow({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label.toUpperCase(),
            style: const TextStyle(
              color: AppColors.mutedText,
              fontSize: 13,
              fontWeight: FontWeight.w800,
              letterSpacing: 0.8,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            value,
            style: const TextStyle(
              color: AppColors.text,
              fontSize: 16,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }
}

class _ActionButton extends StatelessWidget {
  final String label;
  final VoidCallback onTap;
  final bool isPrimary;
  final bool isDelete;

  const _ActionButton({
    required this.label,
    required this.onTap,
    this.isPrimary = false,
    this.isDelete = false,
  });

  @override
  Widget build(BuildContext context) {
    final backgroundColor = isPrimary
        ? AppColors.primary
        : isDelete
        ? AppColors.rose.withOpacity(0.16)
        : AppColors.surface;

    final borderColor = isPrimary
        ? AppColors.primary
        : isDelete
        ? AppColors.rose.withOpacity(0.34)
        : AppColors.border;

    final textColor = isPrimary
        ? AppColors.background
        : isDelete
        ? AppColors.rose
        : AppColors.text;

    return Material(
      color: backgroundColor,
      borderRadius: BorderRadius.circular(20),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(20),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 16),
          alignment: Alignment.center,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: borderColor),
          ),
          child: Text(
            label,
            style: TextStyle(
              color: textColor,
              fontSize: 16,
              fontWeight: FontWeight.w900,
            ),
          ),
        ),
      ),
    );
  }
}

class _DialogButton extends StatelessWidget {
  final String label;
  final VoidCallback onTap;
  final bool isDelete;

  const _DialogButton({
    required this.label,
    required this.onTap,
    this.isDelete = false,
  });

  @override
  Widget build(BuildContext context) {
    final backgroundColor = isDelete
        ? AppColors.rose
        : Colors.white.withOpacity(0.06);

    final borderColor = isDelete ? AppColors.rose : AppColors.border;

    final textColor = isDelete ? AppColors.background : AppColors.text;

    return Material(
      color: backgroundColor,
      borderRadius: BorderRadius.circular(18),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(18),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 14),
          alignment: Alignment.center,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(18),
            border: Border.all(color: borderColor),
          ),
          child: Text(
            label,
            style: TextStyle(
              color: textColor,
              fontSize: 15,
              fontWeight: FontWeight.w900,
            ),
          ),
        ),
      ),
    );
  }
}
