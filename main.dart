import 'package:flutter/material.dart';
// Certifique-se de que os nomes dos arquivos abaixo coincidem com os que você salvou
import 'login_screen.dart';
import 'dashboard_screen.dart';
import 'facial_recognition_screen.dart';
import 'manual_check_screen.dart';

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
      
      // Definição do Tema Global (Identidade Visual do PDF) [cite: 41, 43]
      theme: ThemeData(
        primaryColor: const Color(0xFF008000), // Verde de CDA
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF008000),
          secondary: const Color(0xFF0000FF), // Azul de CDA
        ),
        // Estilo de botões grandes para uso em movimento [cite: 43]
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            padding: const EdgeInsets.symmetric(vertical: 15),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          ),
        ),
        useMaterial3: true,
      ),

      // Definição das Rotas do Sistema [cite: 52, 53]
      initialRoute: '/',
      routes: {
        '/': (context) => const LoginScreen(),
        '/dashboard': (context) => const DashboardScreen(),
        '/facial_recognition': (context) => const FacialRecognitionScreen(),
        '/manual_check': (context) => const ManualChecklistScreen(),
      },
    );
  }
}