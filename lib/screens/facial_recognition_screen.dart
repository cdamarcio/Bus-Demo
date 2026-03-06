import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'dart:async';
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
  Timer? _simulationTimer;
  
  final String _mockMatricula = "2024005";
  final String _mockStudentName = "Felipe Rodrigues";
  final String _mockStudentSchool = "Escola Municipal Deuzuita";

  @override
  void initState() {
    super.initState();
    _initCamera();
    
    // FORÇA A DETECÇÃO após 5 segundos, independente da câmera estar pronta ou não
    _simulationTimer = Timer(const Duration(seconds: 5), () {
      if (mounted && !_isStudentDetected) {
        _detectarManual();
      }
    });
  }

  void _detectarManual() {
    setState(() => _isStudentDetected = true);
  }

  Future<void> _initCamera() async {
    try {
      final cameras = await availableCameras();
      if (cameras.isEmpty) return;
      
      _controller = CameraController(cameras[0], ResolutionPreset.low); // Low para carregar mais rápido na web
      await _controller!.initialize();
      if (!mounted) return;
      setState(() {});
    } catch (e) {
      print("Aviso: Câmera não disponível no navegador, usando modo simulação.");
    }
  }

  @override
  void dispose() {
    _simulationTimer?.cancel(); 
    _controller?.dispose();
    super.dispose();
  }

  Future<void> _confirmarEmbarque() async {
    setState(() => _isLoading = true);
    try {
      final position = await LocationService().getCurrentLocation();
      await DatabaseHelper().registrarEmbarque(
        _mockMatricula, 
        position?.latitude ?? -8.2575, 
        position?.longitude ?? -49.2618
      );

      if (!mounted) return;
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Embarque confirmado com sucesso!"), backgroundColor: Colors.green),
      );
    } catch (e) {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Validação Facial - SEMEC"),
        backgroundColor: const Color(0xFF008000),
      ),
      // GestureDetector permite que você clique em qualquer lugar da tela para forçar a detecção
      body: GestureDetector(
        onTap: _detectarManual, 
        child: Stack(
          children: [
            // Se a câmera falhar, mostra um fundo cinza informativo
            _controller != null && _controller!.value.isInitialized
                ? SizedBox.expand(child: CameraPreview(_controller!))
                : Container(
                    color: Colors.black87,
                    child: const Center(
                      child: Text(
                        "Aguardando Câmera...\n(Toque na tela para simular detecção)",
                        textAlign: TextAlign.center,
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  ),

            // Moldura
            Center(
              child: Container(
                width: 260,
                height: 340,
                decoration: BoxDecoration(
                  border: Border.all(color: _isStudentDetected ? Colors.green : Colors.white, width: 4),
                  borderRadius: BorderRadius.circular(30),
                ),
              ),
            ),

            if (_isStudentDetected) _buildConfirmationOverlay(),
          ],
        ),
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
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20)),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.check_circle, color: Colors.green, size: 60),
              const SizedBox(height: 15),
              Text(_mockStudentName, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
              Text(_mockStudentSchool, style: const TextStyle(fontSize: 14)),
              const SizedBox(height: 25),
              if (_isLoading)
                const CircularProgressIndicator()
              else
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
                    onPressed: _confirmarEmbarque,
                    child: const Text("CONFIRMAR", style: TextStyle(color: Colors.white)),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}