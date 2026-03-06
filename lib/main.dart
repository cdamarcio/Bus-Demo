import 'package:flutter/material.dart';
import 'package:bus/screens/login_screen.dart';
import 'package:bus/screens/dashboard_screen.dart';
import 'package:bus/screens/facial_recognition_screen.dart';
import 'package:bus/screens/manual_check_screen.dart';
import 'package:bus/screens/summary_screen.dart';

void main() {
  runApp(const FrotaEscolarApp());
}

class FrotaEscolarApp extends StatelessWidget {
  const FrotaEscolarApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Monitoramento Frota CDA',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: const Color(0xFF008000),
        useMaterial3: true,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const LoginScreen(),
        '/dashboard': (context) => const DashboardScreen(),
        // REMOVIDO O 'const' AQUI PARA EVITAR O ERRO DE COMPILAÇÃO
        '/facial_recognition': (context) => FacialRecognitionScreen(),
        '/manual_check': (context) => const ManualChecklistScreen(),
        '/summary': (context) => const SummaryScreen(),
      },
    );
  }
}