import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { COLORS, SIZES } from '../styles/theme';

export default function Login({ onLoginSuccess }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  return (
    <View style={styles.container}>
      {/* Branding da Prefeitura de Conceição do Araguaia [cite: 3, 41] */}
      <View style={styles.header}>
        <Text style={styles.logoText}>SEMEC</Text>
        <Text style={styles.subTitle}>Gestão de Transporte Escolar</Text>
      </View>

      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Usuário (Matrícula)" 
          onChangeText={setUser}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Senha" 
          secureTextEntry 
          onChangeText={setPass}
        />

        <TouchableOpacity 
          style={[styles.loginButton, { backgroundColor: COLORS.primary_green }]}
          onPress={() => onLoginSuccess(user, pass)}
        >
          <Text style={styles.buttonText}>ENTRAR NO SISTEMA</Text>
        </TouchableOpacity>
        
        <Text style={styles.footerNote}>
          Conceição do Araguaia - PA [cite: 32]
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondary_blue, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 40 },
  logoText: { color: COLORS.accent_yellow, fontSize: 42, fontWeight: 'bold' },
  subTitle: { color: '#FFF', fontSize: 16 },
  form: { backgroundColor: '#FFF', margin: 20, padding: 30, borderRadius: 20 },
  input: { borderBottomWidth: 1, borderColor: '#CCC', marginBottom: 20, height: 50, fontSize: 18 },
  loginButton: { height: SIZES.button_height, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
  footerNote: { textAlign: 'center', marginTop: 20, color: '#64748b', fontSize: 12 }
});