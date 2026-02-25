import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../styles/theme'; 
import { StatusCard } from '../components/StatusCard';

export default function Dashboard() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* Cabeçalho Identidade Visual CDA */}
      <View style={{ backgroundColor: COLORS.secondary_blue, padding: 25 }}> 
        <Text style={{ color: '#FFF', fontSize: 18 }}>Prefeitura de</Text>
        <Text style={{ color: COLORS.accent_yellow, fontSize: 24, fontWeight: 'bold' }}>
          Conceição do Araguaia [cite: 3]
        </Text>
      </View>

      <View style={{ padding: 20 }}>
        {/* Métricas em Tempo Real */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <StatusCard label="ALUNOS" value="42/50" iconColor={COLORS.primary_green} />
          <StatusCard label="STATUS" value="EM ROTA" iconColor={COLORS.accent_yellow} />
        </View>

        {/* Botão de Ação Principal (Requisito UX: Botão Grande) */} 
        <TouchableOpacity 
          style={{ 
            backgroundColor: COLORS.primary_green, 
            height: 100, 
            borderRadius: 20, 
            justifyContent: 'center', 
            alignItems: 'center',
            marginTop: 20,
            elevation: 5
          }}
          onPress={() => /* Navegar para src/pages/CameraValidacao.tsx */ {}}
        >
          <Text style={{ color: '#FFF', fontSize: 22, fontWeight: 'bold' }}>
            REGISTRAR EMBARQUE [cite: 20]
          </Text>
        </TouchableOpacity>

        {/* Info da Rota Rural/Urbana */} 
        <View style={{ marginTop: 30, padding: 20, backgroundColor: '#FFF', borderRadius: 15 }}>
          <Text style={{ fontWeight: 'bold', color: COLORS.secondary_blue }}>ROTA ATUAL</Text>
          <Text style={{ fontSize: 16, marginTop: 5 }}>Setor Aeroporto ➔ Escola Municipal [cite: 19]</Text>
        </View>
      </View>
    </ScrollView>
  );
}