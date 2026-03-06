import 'dart:convert';
import '../models/aluno_model.dart';

class ApiService {
  // Simulação do endpoint POST/api/viagens/sincronizar [RF-001]
  Future<bool> sincronizarDadosComSEMEC(List<AlunoModel> logsEmbarque) async {
    // 1. Prepara o JSON conforme especificado na Arquitetura [cite: 58]
    final List<Map<String, dynamic>> dadosParaEnvio = logsEmbarque.map((aluno) => {
      'matricula': aluno.matricula,
      'data_hora': aluno.dataHoraEmbarque?.toIso8601String(),
      'gps': {
        'lat': aluno.latitude,
        'lng': aluno.longitude,
      },
      'confirmado': aluno.embarcado ? 1 : 0,
    }).toList();

    try {
      // Simula o tempo de upload para o servidor PostgreSQL da SEMEC [cite: 59, 62]
      print("Enviando logs de geolocalização para auditoria...");
      await Future.delayed(const Duration(seconds: 3));

      // Em um cenário real, usaríamos o pacote 'http' para o POST
      // ex: await http.post(Uri.parse('https://api.semec.cda.pa.gov.br/viagens/sincronizar'), body: jsonEncode(dadosParaEnvio));
      
      return true; // Sucesso na sincronização [cite: 32]
    } catch (e) {
      print("Falha na sincronização: $e");
      return false; 
    }
  }
}