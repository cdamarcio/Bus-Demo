// src/services/FacialRecognitionService.ts
import { Aluno } from '../types';

export const FacialRecognitionService = {
  
  /**
   * RF-002: Realiza a comparação facial offline.
   * A lógica compara o 'hash_facial' (vetor) capturado pela câmera 
   * com os vetores armazenados no banco criptografado.
   */
  validarHashFacial: async (vetorCapturado: number[], listaAlunos: Aluno[]): Promise<Aluno | null> => {
    console.log("📸 Iniciando reconhecimento facial local (Edge Computing)...");
    
    // RNF-004: Performance garantida para resposta rápida no ônibus
    return new Promise((resolve) => {
      let melhorMatch: Aluno | null = null;
      let maiorSimilaridade = -1;

      // Percorre os alunos baixados via Downstream [RF-001]
      for (const aluno of listaAlunos) {
        if (!aluno.hash_facial) continue;

        // Converte string do banco para array numérico se necessário
        const vetorBase = typeof aluno.hash_facial === 'string' 
          ? JSON.parse(aluno.hash_facial) 
          : aluno.hash_facial;

        const similaridade = FacialRecognitionService.calcularSimilaridade(vetorCapturado, vetorBase);

        // Limiar de aceitação (Threshold) para evitar falsos positivos
        if (similaridade > 0.85 && similaridade > maiorSimilaridade) {
          maiorSimilaridade = similaridade;
          melhorMatch = aluno;
        }
      }

      // Simula o tempo de processamento < 3s [RF-023]
      setTimeout(() => resolve(melhorMatch), 800);
    });
  },

  // Algoritmo de Similaridade de Cosseno para comparação vetorial
  calcularSimilaridade: (vecA: number[], vecB: number[]): number => {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magA * magB);
  }
};