// src/services/GeofenceService.ts
import { SyncService } from './sync';

// O 'export' é obrigatório para o App.tsx conseguir enxergar o serviço
export const GeofenceService = {
  
  // RF-005: Detecta se o veículo entrou no perímetro da escola 
  verificarProximidadeEscola: (latAtual: number, longAtual: number, latEscola: number, longEscola: number) => {
    const raioEscolaMetros = 100; // Perímetro de segurança para disparo [cite: 32]
    const distancia = GeofenceService.calcularDistancia(latAtual, longAtual, latEscola, longEscola);

    if (distancia <= raioEscolaMetros) {
      console.log("🏫 Escola Detectada via Geofencing! Iniciando Sincronização Automática [RF-005]...");
      SyncService.sincronizar(); // Dispara o upload conforme v1.1 [cite: 32, 62]
    }
  },

  // Função auxiliar para cálculo de distância entre pontos GPS [cite: 28, 29]
  calcularDistancia: (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371000; // Raio da Terra em metros
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Retorna a distância em metros
  }
};