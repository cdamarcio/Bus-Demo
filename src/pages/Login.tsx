import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

export default function Login({ onLogin }) {
  const [matricula, setMatricula] = useState('');

  const handleLogin = () => {
    if (matricula.length > 3) {
      onLogin(); // Avança para a próxima tela
    } else {
      alert('Por favor, insira uma matrícula válida.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logotipo ou Ícone da SEMEC */}
      <View style={styles.logoContainer}>
        <View style={styles.circle}>
          <Text style={styles.logoText}>BUS</Text>
        </View>
        <Text style={styles.title}>Transporte Escolar</Text>
        <Text style={styles.subtitle}>Conceição do Araguaia - PA</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Matrícula do Monitor</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua matrícula"
          value={matricula}
          onChangeText={setMatricula}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR NO SISTEMA</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Prefeitura Municipal de CDA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', justifyContent: 'center', padding: 30 },
  logoContainer: { alignItems: 'center', marginBottom: 50 },
  circle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#00563b', justifyContent: 'center', alignItems: 'center' },
  logoText: { color: '#FFD700', fontWeight: 'bold', fontSize: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#003366', marginTop: 15 },
  subtitle: { fontSize: 14, color: '#64748b' },
  inputContainer: { width: '100%' },
  label: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 8 },
  input: { 
    backgroundColor: '#FFF', padding: 15, borderRadius: 10, 
    borderWidth: 1, borderColor: '#CBD5E1', fontSize: 16, marginBottom: 20 
  },
  button: { 
    backgroundColor: '#00563b', padding: 18, borderRadius: 10, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  footer: { textAlign: 'center', marginTop: 40, color: '#94a3b8', fontSize: 12 }
});