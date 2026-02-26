// src/types/index.ts

/**
 * [RF-004] Estrutura para Auditoria do FNDE
 * Armazena a localização exata no momento do embarque.
 */
export interface Geotag {
    latitude: number;
    longitude: number;
    timestamp: string; // ISO 8601
  }
  
  /**
   * [RF-002] Definição de Aluno para o TransPorte CDA
   */
  export interface Aluno {
    id: string;
    nome: string;
    matricula: string;
    escola: string;
    status: 'pendente' | 'embarcou' | 'ausente';
    registroEmbarque?: Geotag; // Dados para sincronização posterior (Sombra Digital)
  }
  
  /**
   * [RF-003] Estrutura da Rota Escolar
   */
  export interface Rota {
    id: string;
    nome: string; // Ex: "Vila Planalto - Rural"
    monitorId: string;
    veiculoPlaca: string;
    data: string;
  }