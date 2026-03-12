import 'package:bus/models/aluno_model.dart';

class ApiService {
  Future<List<AlunoModel>> fetchAlunosFromSEMEC() async {
    await Future.delayed(const Duration(seconds: 2));
    return [
      AlunoModel(
        nome: "Felipe Rodrigues",
        matricula: "2024005",
        fotoHash: "v_fac_005",
        escola: "Escola Deuzuita",
        pontoParada: "Aeroporto",
      ),
    ];
  }

  Future<bool> sincronizarDadosComSEMEC(List<AlunoModel> logsEmbarque) async {
    await Future.delayed(const Duration(seconds: 2));
    return true;
  }
}