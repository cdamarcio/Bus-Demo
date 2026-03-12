// src/services/sync.ts
import { DatabaseService } from './DatabaseService';

export const SyncService = {
  // RF-001: Consome a API da SEMEC para baixar dados dos alunos (Downstream)
  baixarDadosSemec: async () => {
    try {
      console.log("📡 Baixando lista de alunos da SEMEC...");
      // Simulação da chamada GET /api/rotas/{id_veiculo}/alunos [cite: 57]
      const resposta = await fetch('http://api-semec.cda.pa.gov.br/api/rotas/v1/alunos');
      const dados = await resposta.json();
      return dados; // Nome, Matrícula, Foto/Hash Facial, Escola [cite: 19]
    } catch (error) {
      console.error("❌ Falha no download. Usando banco local criptografado.");
      return await DatabaseService.buscarAlunosLocais();
    }
  },

  // RF-005: Disparado automaticamente por Geofencing ou conexão Wi-Fi
  sincronizar: async () => {
    const pendentes = await DatabaseService.obterEmbarquesNaoSincronizados();
    
    if (pendentes.length === 0) return;

    try {
      console.log(`📤 Tentando enviar ${pendentes.length} registros para o E-SEMEC...`);
      
      // POST /api/viagens/sincronizar [cite: 58]
      const resposta = await fetch('http://api-semec.cda.pa.gov.br/api/viagens/sincronizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendentes)
      });

      if (resposta.ok) {
        await DatabaseService.marcarComoSincronizado(pendentes.map(p => p.id));
        console.log("✅ Sincronização concluída com sucesso!");
      }
    } catch (error) {
      console.warn("⚠️ Sem conexão com a SEMEC. Reagendando para 5 minutos...");
      // Sugestão de Melhoria 1: Fila de reenvio automática [cite: 62]
      setTimeout(() => SyncService.sincronizar(), 5 * 60 * 1000); 
    }
  }
};