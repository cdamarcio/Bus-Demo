import '../models/aluno_model.dart';
import 'database_helper.dart';

class MockDataInjector {
  static Future<void> inject() async {
    final dbHelper = DatabaseHelper();
    
    // Lista de alunos mockados para teste em Conceição do Araguaia [cite: 3, 19]
    List<AlunoModel> alunosTeste = [
      AlunoModel(
        nome: "Felipe Rodrigues",
        matricula: "2024005",
        fotoHash: "vector_005_felipe",
        escola: "Escola Municipal Deuzuita",
        pontoParada: "Setor Aeroporto",
      ),
      AlunoModel(
        nome: "Ana Clara Souza",
        matricula: "2024001",
        fotoHash: "vector_001_ana",
        escola: "Escola Municipal Deuzuita",
        pontoParada: "Vila Real",
      ),
      AlunoModel(
        nome: "João Pedro Silva",
        matricula: "2024009",
        fotoHash: "vector_009_joao",
        escola: "Escola Municipal Tancredo Neves",
        pontoParada: "Zona Rural - KM 12",
      ),
    ];

    // Insere no banco local para permitir operação Offline First [cite: 7, 18]
    await dbHelper.insertAlunos(alunosTeste);
    print("Dados de teste injetados com sucesso no SQLite!");
  }
}