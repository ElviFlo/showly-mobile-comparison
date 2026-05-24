String cleanHtml(String? value) {
  if (value == null || value.trim().isEmpty) {
    return 'No summary available.';
  }

  return value
      .replaceAll(RegExp(r'<[^>]*>'), '')
      .replaceAll('&nbsp;', ' ')
      .replaceAll('&amp;', '&')
      .replaceAll('&quot;', '"')
      .trim();
}
