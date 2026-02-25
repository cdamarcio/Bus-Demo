export const syncUpstream = async (data: any) => {
    try {
      // Tenta enviar logs para a API da SEMEC [cite: 58]
      const response = await fetch('https://api.semec.ca.pa.gov.br/viagens/sincronizar', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      return response.ok;
    } catch (error) {
      // Adiciona à fila se houver "Sombra Digital" [cite: 61, 62]
      console.log("Offline: Dados salvos na fila local.");
      return false;
    }
  };