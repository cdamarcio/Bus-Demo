import 'dart:convert';

class AlunoModel {
  final String nome;
  final String matricula;
  final String fotoHash;
  final String escola;
  final String pontoParada;
  bool embarcado;
  DateTime? dataHoraEmbarque;
  double? latitude;
  double? longitude;

  AlunoModel({
    required this.nome,
    required this.matricula,
    required this.fotoHash,
    required this.escola,
    required this.pontoParada,
    this.embarcado = false,
    this.dataHoraEmbarque,
    this.latitude,
    this.longitude,
  });

  factory AlunoModel.fromJson(Map<String, dynamic> json) {
    return AlunoModel(
      nome: json['nome'] ?? '',
      matricula: json['matricula'] ?? '',
      fotoHash: json['foto_hash'] ?? '',
      escola: json['escola'] ?? '',
      pontoParada: json['ponto_parada'] ?? '',
      embarcado: json['embarcado'] == 1,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'nome': nome,
      'matricula': matricula,
      'foto_hash': fotoHash,
      'escola': escola,
      'ponto_parada': pontoParada,
      'embarcado': embarcado ? 1 : 0,
      'data_hora_embarque': dataHoraEmbarque?.toIso8601String(),
      'latitude': latitude,
      'longitude': longitude,
    };
  }
}