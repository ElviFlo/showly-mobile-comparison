import 'dart:convert';
import 'package:http/http.dart' as http;

import '../../../../core/constants/api_config.dart';

class TvMazeRemoteDataSource {
  Future<List<dynamic>> getShows() async {
    final uri = Uri.parse(
      '${ApiConfig.tvMazeBaseUrl}${ApiConfig.showsEndpoint}',
    );

    final response = await http.get(uri);

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception('Could not fetch TVMaze shows.');
    }

    return jsonDecode(response.body) as List<dynamic>;
  }
}
