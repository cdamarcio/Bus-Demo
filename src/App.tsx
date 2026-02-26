import React, { useState, useEffect } from 'react';
import { Aluno, Geotag } from './types'; // Importando a tipagem oficial

export default function App() {
  const [tela, setTela] = useState('login');
  const [localizacao, setLocalizacao] = useState<Geotag | null>(null);
  const [alunos, setAlunos] = useState<Aluno[]>([
    { id: '1', nome: 'JOÃO OLIVEIRA', matricula: '2024001', escola: 'Escola Municipal Maria de Lourdes', status: 'pendente' },
    { id: '2', nome: 'MARIA SOUZA', matricula: '2024002', escola: 'Escola Municipal Maria de Lourdes', status: 'pendente' },
    { id: '3', nome: 'FELIPE RODRIGUES', matricula: '2024003', escola: 'Escola Municipal Maria de Lourdes', status: 'pendente' }
  ]);

  // [RF-004] Monitoramento GPS em Tempo Real
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setLocalizacao({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          timestamp: new Date().toISOString()
        });
      },
      (err) => console.error("Falha no GPS rural:", err),
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // [RF-002] Registro de Embarque com Geotagging (Sombra Digital)
  const registrarEmbarque = (id: string) => {
    if (!localizacao) {
      alert("Aguardando sinal de GPS para validar o embarque...");
      return;
    }

    setAlunos(prev => prev.map(aluno => 
      aluno.id === id ? { 
        ...aluno, 
        status: 'embarcou', 
        registroEmbarque: { ...localizacao } 
      } : aluno
    ));
    
    // Simulação de Offline First: Salva no localStorage do tablet
    console.log("Dado salvo localmente para sincronização futura.");
  };

  if (tela === 'login') return (
    <div style={{ height: '100vh', backgroundColor: '#00563b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#FFF', textAlign: 'center' }}>
      <h1 style={{ color: '#FFD700' }}>TransPorte CDA</h1>
      <p>Secretaria Municipal de Educação</p>
      <button 
        onClick={() => setTela('chamada')} 
        style={{ padding: '20px 50px', backgroundColor: '#FFD700', border: 'none', borderRadius: 15, fontWeight: 'bold', fontSize: 18, marginTop: 40, cursor: 'pointer' }}
      >
        INICIAR ROTA RURAL
      </button>
    </div>
  );

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#00563b', color: '#FFF', padding: 15, borderRadius: 12, marginBottom: 20 }}>
        <strong>GPS ATIVO:</strong> {localizacao ? `${localizacao.latitude.toFixed(4)}, ${localizacao.longitude.toFixed(4)}` : 'Buscando...'}
      </div>

      <h2>Lista de Chamada</h2>
      {alunos.map(aluno => (
        <div key={aluno.id} style={{ backgroundColor: '#FFF', padding: 20, borderRadius: 15, marginBottom: 15, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: 18 }}>{aluno.nome}</div>
            <div style={{ color: aluno.status === 'embarcou' ? '#008000' : '#666' }}>
              {aluno.status === 'embarcou' ? `✓ Embarque registrado às ${new Date(aluno.registroEmbarque?.timestamp || '').toLocaleTimeString()}` : 'Aguardando embarque'}
            </div>
          </div>
          <button 
            disabled={aluno.status === 'embarcou'}
            onClick={() => registrarEmbarque(aluno.id)}
            style={{ 
              width: 80, height: 80, borderRadius: 10, border: 'none', 
              backgroundColor: aluno.status === 'embarcou' ? '#ccc' : '#00563b', 
              color: '#FFF', fontWeight: 'bold', cursor: 'pointer' 
            }}
          >
            {aluno.status === 'embarcou' ? 'OK' : 'BIO'}
          </button>
        </div>
      ))}
      
      <button 
        onClick={() => setTela('login')} 
        style={{ width: '100%', padding: 20, backgroundColor: '#cc0000', color: '#FFF', border: 'none', borderRadius: 15, fontWeight: 'bold', marginTop: 30 }}
      >
        FINALIZAR VIAGEM
      </button>
    </div>
  );
}