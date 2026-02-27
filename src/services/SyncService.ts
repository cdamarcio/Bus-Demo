import { Aluno } from '../types';

const STORAGE_KEY = '@TransPorte:fila_sincronizacao';

export const SyncService = {
  // Salva o embarque no "estoque" local do tablet
  salvarLocalmente: (aluno: Aluno) => {
    const fila = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    fila.push({ ...aluno, dataSincronismo: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fila));
    console.log(`📥 Embarque de ${aluno.nome} salvo para sincronização posterior.`);
  },

  // Tenta enviar os dados para o servidor da SEMEC
  sincronizar: async () => {
    const fila = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    if (fila.length === 0) return;

    if (navigator.onLine) {
      try {
        console.log("📡 Wi-Fi detectado! Sincronizando dados com a SEMEC...");
        // Aqui entrará a sua chamada de API (Fetch/Axios) para o MazzSys ou MazzCursos
        // await api.post('/sincronizar', fila);
        
        localStorage.removeItem(STORAGE_KEY); // Limpa a fila após sucesso
        alert(`${fila.length} registros sincronizados com sucesso!`);
      } catch (error) {
        console.error("❌ Falha ao subir dados. Tentando novamente na próxima escola.");
      }
    }
  }
};