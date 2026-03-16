import 'package:sqflite/sqflite.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class SyncService {
  final Database db;
  // Endpoint da SEMEC definido na SRS v1.1 [cite: 58]
  final String apiUrl = "https://api.semec.cda.gov.br/api/viagens/sincronizar";

  SyncService(this.db);

  /// Função principal para despachar os dados locais para o E-SEMEC [cite: 14]
  Future<void> dispararSincronizacao() async {
    try {
      // 1. Busca logs que ainda não foram sincronizados 
      final List<Map<String, dynamic>> logsPendentes = await db.query(
        'logs_presenca',
        where: 'sincronizado_emec = ?',
        whereArgs: [0],
      );

      if (logsPendentes.isEmpty) {
        print("Nenhum dado pendente para sincronização.");
        return;
      }

      // 2. Tenta o envio via POST conforme especificado [cite: 58]
      final response = await http.post(
        Uri.parse(apiUrl),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "veiculo": "FROTA_CDA_01", // Identificador do ônibus
          "registros": logsPendentes,
        }),
      );

      // 3. Se o servidor confirmar o recebimento (Status 200 ou 201)
      if (response.statusCode == 200 || response.statusCode == 201) {
        // Atualiza o status local para evitar duplicidade 
        await db.update(
          'logs_presenca',
          {'sincronizado_emec': 1},
          where: 'sincronizado_emec = ?',
          whereArgs: [0],
        );
        print("Sincronização com E-SEMEC realizada com sucesso.");
      } else {
        print("Erro no servidor SEMEC: ${response.statusCode}");
      }
    } catch (e) {
      // Trata a "Sombra Digital" de Conceição do Araguaia [cite: 61, 62]
      print("Falha de conexão em zona rural. O dado permanece seguro no SQLite.");
    }
  }
}