import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future<void> pingBackend() async {
  var client = http.Client();

  try {
    http.Response response = await client.get(
      Uri.parse('http://10.0.2.2:3000/'),
    );

    debugPrint(response.body);
  } catch (e) {
    debugPrint("Failed to ping: $e");
    debugPrint("Failure");
  }
}
