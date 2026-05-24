class Show {
  final int id;
  final String name;
  final String imageUrl;
  final String summary;
  final List<String> genres;
  final double? rating;
  final String status;
  final String language;
  final int? runtime;
  final String? premiered;
  final String? userNote;
  final bool isLocal;

  const Show({
    required this.id,
    required this.name,
    required this.imageUrl,
    required this.summary,
    required this.genres,
    required this.rating,
    required this.status,
    required this.language,
    required this.runtime,
    required this.premiered,
    this.userNote,
    this.isLocal = false,
  });

  Show copyWith({
    int? id,
    String? name,
    String? imageUrl,
    String? summary,
    List<String>? genres,
    double? rating,
    String? status,
    String? language,
    int? runtime,
    String? premiered,
    String? userNote,
    bool? isLocal,
  }) {
    return Show(
      id: id ?? this.id,
      name: name ?? this.name,
      imageUrl: imageUrl ?? this.imageUrl,
      summary: summary ?? this.summary,
      genres: genres ?? this.genres,
      rating: rating ?? this.rating,
      status: status ?? this.status,
      language: language ?? this.language,
      runtime: runtime ?? this.runtime,
      premiered: premiered ?? this.premiered,
      userNote: userNote ?? this.userNote,
      isLocal: isLocal ?? this.isLocal,
    );
  }
}
