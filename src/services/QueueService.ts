import { getDatabaseConnection } from '../database/Connection';
import axios from 'axios';

export const processQueue = async (token: string) => {
  const db = await getDatabaseConnection(token);
  
  // Seleciona apenas registros não sincronizados [cite: 58]
  const results = await db.executeSql(
    "SELECT * FROM logs_viagem WHERE sincronizado = 0 LIMIT 50"
  );

  if (results[0].rows.length > 0) {
    const logs = [];
    for (let i = 0; i < results[0].rows.length; i++) {
      logs.push(results[0].rows.item(i));
    }

    try {
      // Envia array de coordenadas e embarques para a SEMEC [cite: 58]
      const response = await axios.post(
        'https://api.semec.ca.pa.gov.br/api/viagens/sincronizar',
        { logs },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        // Marca como sincronizado para evitar duplicidade 
        await db.executeSql(
          "UPDATE logs_viagem SET sincronizado = 1 WHERE id IN (" + 
          logs.map(l => l.id).join(',') + ")"
        );
      }
    } catch (error) {
      console.log("Aguardando sinal para nova tentativa de upload...");
    }
  }
};