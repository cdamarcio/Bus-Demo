import 'package:bus/models/aluno_model.dart';
import 'package:bus/database/database_helper.dart';

class MockDataInjector {
  static Future<void> inject() async {
    final dbHelper = DatabaseHelper();
    
    List<AlunoModel> alunosTeste = [
      AlunoModel(
        nome: "Felipe Rodrigues",
        matricula: "2024005",
        fotoHash: "vector_005",
        escola: "Escola Municipal Deuzuita",
        pontoParada: "Setor Aeroporto",
      ),
    ];

    await dbHelper.insertAlunos(alunosTeste);
  }
}