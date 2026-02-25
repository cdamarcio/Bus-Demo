import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/theme'; 

export const StatusCard = ({ label, value, iconColor }) => (
  <div style={styles.card}>
    <div style={{ ...styles.indicator, backgroundColor: iconColor }} />
    <View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </div>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
    elevation: 2
  },
  indicator: { width: 10, height: 40, borderRadius: 5, marginRight: 10 },
  label: { fontSize: 12, color: '#64748b', fontWeight: 'bold' },
  value: { fontSize: 20, fontWeight: 'bold', color: '#1e293b' }
});