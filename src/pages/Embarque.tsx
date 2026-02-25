import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../styles/theme';

export default function Embarque({ aluno }) {
  return (
    <View style={styles.container}>
      {/* Visualização de foto e nome para confirmação [cite: 65] */}
      <Text style={styles.title}>Confirmar Embarque?</Text>
      <Text style={styles.alunoName}>{aluno.nome}</Text>
      
      <View style={styles.buttonContainer}>
        {/* Botões de alto contraste para uso em movimento [cite: 43] */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: COLORS.primary_green }]}
          onPress={() => console.log("Confirmado")}
        >
          <Text style={styles.buttonText}>CONFIRMAR</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#DC2626' }]} // Vermelho para erro
          onPress={() => console.log("Falha/Manual")} [cite: 25]
        >
          <Text style={styles.buttonText}>ERRO / MANUAL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: SIZES.padding },
  title: { fontSize: SIZES.font_large, fontWeight: 'bold', color: COLORS.secondary_blue },
  alunoName: { fontSize: 24, marginVertical: 20, color: COLORS.text_dark },
  buttonContainer: { gap: 10 },
  button: { height: SIZES.button_height, justifyContent: 'center', alignItems: 'center', borderRadius: 12 },
  buttonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 18 }
});