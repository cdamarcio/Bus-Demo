export const registrarEmbarqueLocal = async (db: any, matricula: string, coords: any) => {
    // Grava localmente com criptografia [cite: 47]
    await db.executeSql(
      "INSERT INTO logs_viagem (matricula_aluno, latitude, longitude, sincronizado) VALUES (?, ?, ?, 0)",
      [matricula, coords.latitude, coords.longitude]
    );
    
    // Tenta sincronizar imediatamente se houver sinal
    // Se falhar, a QueueService tratará depois 
  };