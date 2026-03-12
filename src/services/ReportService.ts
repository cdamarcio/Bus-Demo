// src/services/ReportService.ts
import { Aluno } from '../types';

export const ReportService = {
  // RF-006: Gera o resumo da viagem para conferência do monitor
  gerarResumoViagem: (alunos: Aluno[]) => {
    const presentes = alunos.filter(a => a.status === 'embarcado');
    const ausentes = alunos.filter(a => a.status !== 'embarcado');

    return {
      total: alunos.length,
      presentes: presentes.length,
      ausentes: ausentes.length,
      detalhesAusentes: ausentes.map(a => a.nome),
      timestamp: new Date().toLocaleString('pt-BR')
    };
  }
};