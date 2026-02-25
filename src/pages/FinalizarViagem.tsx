import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../styles/theme';
import { gerarRelatorioViagem } from '../services/ReportService';

export default function FinalizarViagem({ infoViagem }) {
  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 }}>
        Deseja encerrar a rota e gerar o relatório?
      </Text>
      
      {/* Botão de Destaque Amarelo conforme RNF-002 [cite: 41] */}
      <TouchableOpacity 
        style={{ backgroundColor: '#FFD700', padding: 20, borderRadius: 15, alignItems: 'center' }}
        onPress={() => gerarRelatorioViagem(infoViagem)}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>GERAR PDF DE AUDITORIA</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={{ marginTop: 20, alignItems: 'center' }}
        onPress={() => /* Lógica de fechar */ {}}
      >
        <Text style={{ color: '#64748b' }}>Voltar ao Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}