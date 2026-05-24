double nowMs() {
  return DateTime.now().microsecondsSinceEpoch / 1000;
}

double roundMetric(double value) {
  return double.parse(value.toStringAsFixed(2));
}
