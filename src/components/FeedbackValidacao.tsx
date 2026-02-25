export const FeedbackValidacao = ({ aluno, onConfirmar, onRecusar }) => (
    <View style={styles.feedbackContainer}>
      <Text style={styles.label}>ALUNO IDENTIFICADO:</Text>
      <Image source={{ uri: aluno.foto_local_uri }} style={styles.fotoMiniatura} />
      <Text style={styles.nomeAluno}>{aluno.nome}</Text>
      
      <View style={styles.row}>
        <TouchableOpacity 
          style={[styles.btn, { backgroundColor: COLORS.primary_green }]} 
          onPress={onConfirmar}
        >
          <Text style={styles.btnText}>CONFIRMAR [cite: 65]</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.btn, { backgroundColor: '#DC2626' }]} 
          onPress={onRecusar}
        >
          <Text style={styles.btnText}>ERRO / MANUAL [cite: 25]</Text>
        </TouchableOpacity>
      </View>
    </View>
  );