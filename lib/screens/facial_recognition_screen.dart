// Adicione este Timer no topo do arquivo
import 'dart:async';

// No initState ou logo após abrir a câmera:
void _simularDeteccaoIA() {
  Timer(const Duration(seconds: 4), () {
    if (mounted && !_isStudentDetected) {
      setState(() {
        _isStudentDetected = true; // Força a detecção do aluno mockado
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("IA: Rosto Identificado com 98% de precisão!")),
      );
    }
  });
}