import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:geolocator/geolocator.dart';
// Importações corrigidas usando o padrão de pacote 'bus'
import 'package:bus/database/database_helper.dart';
import 'package:bus/services/location_service.dart';

class FacialRecognitionScreen extends StatefulWidget {
  const FacialRecognitionScreen({super.key});

  @override
  State<FacialRecognitionScreen> createState() => _FacialRecognitionScreenState();
}

class _FacialRecognitionScreenState extends State<FacialRecognitionScreen> {
  CameraController? _controller;
  bool _isStudentDetected = false;
  bool _isLoading = false;
  
  // Dados mockados para o fluxo de demonstração
  final String _mockMatricula = "2024005";
  final String _mockStudentName = "Felipe Rodrigues";
  final String _mockStudentSchool = "Escola Municipal Deuzuita";

  @override
  void initState() {
    super.initState();
    _initCamera();
  }

  Future<void> _initCamera() async {
    try {
      final cameras = await availableCameras();
      if (cameras.isEmpty) return;
      
      _controller = CameraController(cameras[0], ResolutionPreset.medium);
      await _controller!.initialize();
      if (!mounted) return;
      setState(() {});
    } catch (e) {
      debugPrint("Erro ao inicializar câmera: $e");
    }
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }

  // [RF-004] Registro de Embarque com Geotagging para Auditoria
  Future<void> _confirmarEmbarque() async {
    setState(() => _isLoading = true);

    try {
      // Captura a localização via GPS Satélite (Offline First)
      Position? position = await LocationService().getCurrentLocation();

      if (position != null) {
        // Grava no SQLite local
        await DatabaseHelper().registrarEmbarque(
          _mockMatricula, 
          position.latitude, 
          position.longitude
        );

        setState(() {
          _isStudentDetected = false;
          _isLoading = false;
        });

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text("Embarque registrado com sucesso!"),
            backgroundColor: Colors.green,
          ),
        );
        
        // Retorna ao Dashboard após sucesso ou segue para o próximo aluno
        Navigator.pop(context);
      }
    } catch (e) {
      setState(() => _isLoading = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Erro: ${e.toString()}"), backgroundColor: Colors.red),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_controller == null || !_controller!.value.isInitialized) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text("Validação Facial - CDA"),
        backgroundColor: const Color(0xFF008000),
      ),
      body: Stack(
        children: [
          SizedBox.expand(child: CameraPreview(_controller!)),

          // Guia visual de enquadramento
          Center(
            child: Container(
              width: 280,
              height: 380,
              decoration: BoxDecoration(
                border: Border.all(color: Colors.white.withOpacity(0.5), width: 2),
                borderRadius: BorderRadius.circular(30),
              ),
            ),
          ),

          if (_isStudentDetected) _buildConfirmationOverlay(),

          // Botões de Ação [RNF-002]
          Align(
            alignment: Alignment.bottomCenter,
            child: Padding(
              padding: const EdgeInsets.only(bottom: 40),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _actionButton(
                    icon: Icons.list_alt,
                    label: "MANUAL",
                    color: const Color(0xFF0000FF),
                    onPressed: () => Navigator.pushNamed(context, '/manual_check'),
                  ),
                  _actionButton(
                    icon: Icons.face,
                    label: "DETECTAR",
                    color: const Color(0xFFFFD700),
                    onPressed: () => setState(() => _isStudentDetected = true),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildConfirmationOverlay() {
    return Container(
      color: Colors.black87,
      child: Center(
        child: Container(
          margin: const EdgeInsets.symmetric(horizontal: 30),
          padding: const EdgeInsets.all(25),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text("ALUNO IDENTIFICADO", style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold)),
              const SizedBox(height: 20),
              const CircleAvatar(radius: 60, child: Icon(Icons.person, size: 60)),
              const SizedBox(height: 15),
              Text(_mockStudentName, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
              Text(_mockStudentSchool, style: const TextStyle(fontSize: 16)),
              const SizedBox(height: 30),
              if (_isLoading)
                const CircularProgressIndicator()
              else
                Row(
                  children: [
                    Expanded(
                      child: OutlinedButton(
                        style: OutlinedButton.styleFrom(padding: const EdgeInsets.all(15)),
                        onPressed: () => setState(() => _isStudentDetected = false),
                        child: const Text("CANCELAR"),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.green,
                          padding: const EdgeInsets.all(15)
                        ),
                        onPressed: _confirmarEmbarque,
                        child: const Text("CONFIRMAR", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                      ),
                    ),
                  ],
                )
            ],
          ),
        ),
      ),
    );
  }

  Widget _actionButton({required IconData icon, required String label, required Color color, required VoidCallback onPressed}) {
    return SizedBox(
      width: 165,
      height: 75,
      child: ElevatedButton.icon(
        style: ElevatedButton.styleFrom(
          backgroundColor: color,
          foregroundColor: color == const Color(0xFFFFD700) ? Colors.black : Colors.white,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
        ),
        onPressed: onPressed,
        icon: Icon(icon, size: 28),
        label: Text(label, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
      ),
    );
  }
}