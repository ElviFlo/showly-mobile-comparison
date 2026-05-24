String formatRuntime(int? runtime) {
  if (runtime == null) return 'Unknown runtime';
  return '$runtime min';
}
