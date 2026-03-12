export interface Aluno {
    id: string;
    nome: string;
    status: 'pendente' | 'embarcado';
    latitude: number;
    longitude: number;
    timestamp?: string;
  }