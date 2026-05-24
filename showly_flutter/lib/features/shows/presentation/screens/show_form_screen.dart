import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../../application/navigation/app_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../domain/entities/show.dart';
import '../state/shows_provider.dart';

class ShowFormScreen extends StatefulWidget {
  final ShowFormArgs args;

  const ShowFormScreen({super.key, required this.args});

  @override
  State<ShowFormScreen> createState() => _ShowFormScreenState();
}

class _ShowFormScreenState extends State<ShowFormScreen> {
  late final TextEditingController nameController;
  late final TextEditingController imageUrlController;
  late final TextEditingController summaryController;
  late final TextEditingController genresController;
  late final TextEditingController ratingController;
  late final TextEditingController statusController;
  late final TextEditingController languageController;
  late final TextEditingController runtimeController;
  late final TextEditingController premieredController;
  late final TextEditingController userNoteController;

  bool get isEditMode => widget.args.mode == 'edit';

  @override
  void initState() {
    super.initState();

    final show = widget.args.show;

    nameController = TextEditingController(text: show?.name ?? '');
    imageUrlController = TextEditingController(text: show?.imageUrl ?? '');
    summaryController = TextEditingController(text: show?.summary ?? '');
    genresController = TextEditingController(
      text: show?.genres.join(', ') ?? '',
    );
    ratingController = TextEditingController(
      text: show?.rating != null ? show!.rating.toString() : '',
    );
    statusController = TextEditingController(text: show?.status ?? 'Running');
    languageController = TextEditingController(
      text: show?.language ?? 'English',
    );
    runtimeController = TextEditingController(
      text: show?.runtime != null ? show!.runtime.toString() : '',
    );
    premieredController = TextEditingController(text: show?.premiered ?? '');
    userNoteController = TextEditingController(text: show?.userNote ?? '');
  }

  @override
  void dispose() {
    nameController.dispose();
    imageUrlController.dispose();
    summaryController.dispose();
    genresController.dispose();
    ratingController.dispose();
    statusController.dispose();
    languageController.dispose();
    runtimeController.dispose();
    premieredController.dispose();
    userNoteController.dispose();
    super.dispose();
  }

  void _submit() {
    final previousShow = widget.args.show;

    final show = Show(
      id: previousShow?.id ?? DateTime.now().millisecondsSinceEpoch,
      name: nameController.text.trim().isEmpty
          ? 'Untitled show'
          : nameController.text.trim(),
      imageUrl: imageUrlController.text.trim().isEmpty
          ? 'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png'
          : imageUrlController.text.trim(),
      summary: summaryController.text.trim().isEmpty
          ? 'No summary available.'
          : summaryController.text.trim(),
      genres: genresController.text
          .split(',')
          .map((genre) => genre.trim())
          .where((genre) => genre.isNotEmpty)
          .toList(),
      rating: double.tryParse(ratingController.text.trim()),
      status: statusController.text.trim().isEmpty
          ? 'Unknown'
          : statusController.text.trim(),
      language: languageController.text.trim().isEmpty
          ? 'Unknown'
          : languageController.text.trim(),
      runtime: int.tryParse(runtimeController.text.trim()),
      premiered: premieredController.text.trim().isEmpty
          ? null
          : premieredController.text.trim(),
      userNote: userNoteController.text.trim(),
      isLocal: previousShow?.isLocal ?? true,
    );

    final provider = context.read<ShowsProvider>();

    if (isEditMode) {
      provider.updateShow(show);
    } else {
      provider.createShow(show);
    }

    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final title = isEditMode ? 'Refine your show' : 'Add a new show';
    final buttonLabel = isEditMode ? 'Save changes' : 'Create show';

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: Text(isEditMode ? 'Edit show' : 'Create show')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(20, 20, 20, 48),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(
                color: AppColors.text,
                fontSize: 31,
                fontWeight: FontWeight.w900,
                letterSpacing: -0.8,
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'Keep your local catalog clean, personal, and easy to compare with the React Native version.',
              style: TextStyle(
                color: AppColors.mutedText,
                fontSize: 15,
                height: 1.45,
              ),
            ),
            const SizedBox(height: 22),
            _Field(label: 'Name', controller: nameController),
            _Field(label: 'Image URL', controller: imageUrlController),
            _Field(
              label: 'Summary',
              controller: summaryController,
              multiline: true,
            ),
            _Field(
              label: 'Genres separated by comma',
              controller: genresController,
            ),
            _Field(
              label: 'Rating',
              controller: ratingController,
              keyboardType: TextInputType.number,
            ),
            _Field(label: 'Status', controller: statusController),
            _Field(label: 'Language', controller: languageController),
            _Field(
              label: 'Runtime',
              controller: runtimeController,
              keyboardType: TextInputType.number,
            ),
            _Field(
              label: 'Premiered',
              controller: premieredController,
              hintText: 'YYYY-MM-DD',
            ),
            _Field(
              label: 'Personal note',
              controller: userNoteController,
              multiline: true,
            ),
            const SizedBox(height: 8),
            _SubmitButton(label: buttonLabel, onTap: _submit),
          ],
        ),
      ),
    );
  }
}

class _Field extends StatelessWidget {
  final String label;
  final TextEditingController controller;
  final bool multiline;
  final TextInputType keyboardType;
  final String? hintText;

  const _Field({
    required this.label,
    required this.controller,
    this.multiline = false,
    this.keyboardType = TextInputType.text,
    this.hintText,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: const TextStyle(
              color: AppColors.whiteSoft,
              fontWeight: FontWeight.w800,
            ),
          ),
          const SizedBox(height: 8),
          TextField(
            controller: controller,
            minLines: multiline ? 4 : 1,
            maxLines: multiline ? 6 : 1,
            keyboardType: keyboardType,
            style: const TextStyle(color: AppColors.text, fontSize: 15),
            decoration: InputDecoration(
              hintText: hintText,
              hintStyle: const TextStyle(color: AppColors.mutedText),
              filled: true,
              fillColor: AppColors.surface,
              contentPadding: const EdgeInsets.symmetric(
                horizontal: 16,
                vertical: 14,
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(18),
                borderSide: const BorderSide(color: AppColors.border),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(18),
                borderSide: const BorderSide(color: AppColors.primary),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _SubmitButton extends StatelessWidget {
  final String label;
  final VoidCallback onTap;

  const _SubmitButton({required this.label, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Material(
      color: AppColors.primary,
      borderRadius: BorderRadius.circular(20),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(20),
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(vertical: 16),
          alignment: Alignment.center,
          child: Text(
            label,
            style: const TextStyle(
              color: AppColors.background,
              fontSize: 16,
              fontWeight: FontWeight.w900,
            ),
          ),
        ),
      ),
    );
  }
}
