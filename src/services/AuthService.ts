import axios from 'axios';
import { saveToSQLite } from './DatabaseService';

const API_URL = 'https://api.semec.ca.pa.gov.br';

export const loginAndSync = async (username, password) => {
  try {
    // 1. Autenticação JWT conforme [RNF-003] [cite: 48]
    const authResponse = await axios.post(`${API_URL}/login`, { username, password });
    const { token, id_veiculo } = authResponse.data;

    // 2. Download de dados para o modo Offline First [cite: 7, 15, 16]
    // Baixa alunos, vetores faciais e rotas do veículo [cite: 16, 57]
    const dataResponse = await axios.get(`${API_URL}/api/rotas/${id_veiculo}/alunos`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // 3. Persistência no banco criptografado (SQLite) [cite: 18, 47]
    await saveToSQLite(dataResponse.data);

    return { success: true, token };
  } catch (error) {
    console.error("Erro na sincronização inicial:", error);
    return { success: false, message: "Falha na conexão ou credenciais" };
  }
};