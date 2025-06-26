import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:logging/logging.dart';

// TODO: Separate to api services
// TODO: Setup condition
void main() async {
  try {
    await dotenv.load(fileName: '.env');
  } catch (e) {
    debugPrint("Failed to initialize .env: $e");
  }

  Logger.root.level = Level.ALL;
  Logger.root.onRecord.listen((record) {
    debugPrint(
      '${record.loggerName}: ${record.level.name}: ${record.time}: ${record.message}',
    );
  });
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;
  String res = "";

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('You have pushed the button this many times:'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: pingBackend,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
