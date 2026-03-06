import 'package:flutter/material.dart';
import 'package:camera/camera.dart';

class FacialRecognitionScreen extends StatefulWidget {
  const FacialRecognitionScreen({super.key});

  @override
  State<FacialRecognitionScreen> createState() => _FacialRecognitionScreenState();
}

class _FacialRecognitionScreenState extends State<FacialRecognitionScreen> {
  CameraController? _controller;
  bool _isStudentDetected = false;
  
  // Dados simulados do banco local SQLite [cite: 18, 19]
  final String _mockStudentName = "Felipe Rodrigues";
  final String _mockStudentSchool = "Escola Municipal Deuzuita";

  @override
  void initState() {
    super.initState();
    _initCamera();
  }

  Future<void> _initCamera() async {
    final cameras = await availableCameras();
    _controller = CameraController(cameras[0], ResolutionPreset.medium);
    await _controller!.initialize();
    if (!mounted) return;
    setState(() {});
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_controller == null || !_controller!.value.isInitialized) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text("Validação Facial"),
        backgroundColor: const Color(0xFF008000), // Verde [cite: 41]
      ),
      body: Stack(
        children: [
          // Viewport da Câmera [cite: 21]
          SizedBox.expand(child: CameraPreview(_controller!)),

          // Frame Guia para o Rosto
          Center(
            child: Container(
              width: 250,
              height: 350,
              decoration: BoxDecoration(
                border: Border.all(color: Colors.white.withOpacity(0.5), width: 2),
                borderRadius: BorderRadius.circular(20),
              ),
            ),
          ),

          // Overlay de Confirmação (Sugestão de Melhoria 3) 
          if (_isStudentDetected) _buildConfirmationDialog(),

          // Botões de Ação Inferiores
          Align(
            alignment: Alignment.bottomCenter,
            child: Padding(
              padding: const EdgeInsets.only(bottom: 30),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  // Botão de Chamada Manual 
                  _bottomButton(
                    icon: Icons.list_alt,
                    label: "MANUAL",
                    color: const Color(0xFF0000FF), // Azul [cite: 41]
                    onPressed: () => Navigator.pushNamed(context, '/manual_check'),
                  ),
                  
                  // Botão para simular a detecção no protótipo do GitHub
                  _bottomButton(
                    icon: Icons.face_retouching_natural,
                    label: "DETECTAR",
                    color: const Color(0xFFFFD700), // Amarelo [cite: 41]
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

  Widget _buildConfirmationDialog() {
    return Container(
      color: Colors.black54,
      child: Center(
        child: Container(
          margin: const EdgeInsets.symmetric(horizontal: 30),
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text("ALUNO IDENTIFICADO", style: TextStyle(fontWeight: FontWeight.bold, color: Colors.grey)),
              const SizedBox(height: 15),
              const CircleAvatar(radius: 50, child: Icon(Icons.person, size: 50)),
              const SizedBox(height: 15),
              Text(_mockStudentName, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
              Text(_mockStudentSchool, style: const TextStyle(fontSize: 16)),
              const SizedBox(height: 25),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: () => setState(() => _isStudentDetected = false),
                      child: const Text("ERRO"),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
                      onPressed: () {
                        setState(() => _isStudentDetected = false);
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text("Embarque registrado com Geotagging!"))
                        );
                      },
                      child: const Text("CONFIRMAR", style: TextStyle(color: Colors.white)),
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

  Widget _bottomButton({required IconData icon, required String label, required Color color, required VoidCallback onPressed}) {
    return SizedBox(
      width: 160,
      height: 70,
      child: ElevatedButton.icon(
        style: ElevatedButton.styleFrom(
          backgroundColor: color,
          foregroundColor: color == const Color(0xFFFFD700) ? Colors.black : Colors.white,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
        ),
        onPressed: onPressed,
        icon: Icon(icon),
        label: Text(label, style: const TextStyle(fontWeight: FontWeight.bold)),
      ),
    );
  }
}