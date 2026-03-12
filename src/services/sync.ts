// src/services/sync.ts
import { Aluno } from '../types';

export const SyncService = {
  // RF-001: Simula o download da lista de alunos da SEMEC 
  baixarDadosSemec: async (): Promise<Aluno[]> => {
    console.log("📡 Sincronizando com E-SEMEC (Modo Demonstração)... [cite: 7]");

    return new Promise((resolve) => {
      setTimeout(() => {
        const dadosMock: Aluno[] = [
          {
            id_matricula: "2026001",
            nome: "Felipe Rodrigues (Seu Filho)",
            escola_id: "Escola Municipal Canuto dos Santos",
            hash_facial: "[0.12, -0.5, 0.88]", // Vetor para Bio Facial [cite: 23]
            geofence_lat: -8.2578, // Coordenadas de CDA
            geofence_long: -49.2642,
            status: 'pendente'
          },
          {
            id_matricula: "2026002",
            nome: "Ana Beatriz Silva",
            escola_id: "Escola Municipal Canuto dos Santos",
            hash_facial: "[-0.22, 0.45, 0.10]",
            geofence_lat: -8.2578,
            geofence_long: -49.2642,
            status: 'pendente'
          },
          {
            id_matricula: "2026003",
            nome: "João Lucas Oliveira",
            escola_id: "Escola Municipal Canuto dos Santos",
            hash_facial: "[0.99, 0.01, -0.34]",
            geofence_lat: -8.2578,
            geofence_long: -49.2642,
            status: 'pendente'
          }
        ];
        resolve(dadosMock);
      }, 1500); // Simula atraso de rede Wi-Fi na garagem [cite: 17]
    });
  },

  // RF-005: Simula o envio dos logs de auditoria para a SEMEC [cite: 32, 58]
  sincronizar: async () => {
    console.log("📤 Enviando logs de Geotagging para auditoria FNDE... [cite: 10, 29]");
  }
};