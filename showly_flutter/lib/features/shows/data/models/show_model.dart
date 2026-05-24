import '../../../../core/utils/clean_html.dart';
import '../../domain/entities/show.dart';

class ShowModel {
  final Map<String, dynamic> json;

  ShowModel(this.json);

  Show toEntity() {
    final image = json['image'] as Map<String, dynamic>?;

    return Show(
      id: json['id'] ?? DateTime.now().millisecondsSinceEpoch,
      name: json['name'] ?? 'Untitled show',
      imageUrl:
          image?['original'] ??
          image?['medium'] ??
          'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png',
      summary: cleanHtml(json['summary']),
      genres: List<String>.from(json['genres'] ?? []),
      rating: (json['rating']?['average'] as num?)?.toDouble(),
      status: json['status'] ?? 'Unknown',
      language: json['language'] ?? 'Unknown',
      runtime: json['runtime'],
      premiered: json['premiered'],
      isLocal: false,
    );
  }
}
