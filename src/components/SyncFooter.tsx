export const SyncFooter = ({ isOnline }) => (
    <View style={{ 
      padding: 10, 
      backgroundColor: isOnline ? COLORS.primary_green : '#64748b', 
      alignItems: 'center' 
    }}>
      <Text style={{ color: '#FFF', fontWeight: 'bold' }}>
        {isOnline ? "CONECTADO AO E-SEMEC" : "MODO OFFLINE ATIVO - DADOS PROTEGIDOS"} [cite: 7, 47]
      </Text>
    </View>
  );