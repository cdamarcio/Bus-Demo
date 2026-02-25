export const validarEstudantePerformance = async (faceDetectada: any, bancoLocal: any[]) => {
    const threshold = 0.85; // Limiar de segurança para biometria [cite: 20]
  
    for (const aluno of bancoLocal) {
      // Cálculo vetorial direto contra o banco SQLite [cite: 22, 55]
      const similaridade = calcularSimilaridade(faceDetectada.embedding, aluno.hash_facial);
      
      if (similaridade >= threshold) {
        // "Early Exit": Encontrou o aluno, para o loop imediatamente
        return { autenticado: true, aluno };
      }
    }
    
    return { autenticado: false, aluno: null };
  };