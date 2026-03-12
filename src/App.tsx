import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from "jspdf";
import { DatabaseService } from './services/DatabaseService';
import { SyncService } from './services/sync';
import { Aluno } from './types';

function App() {
  const [autenticado, setAutenticado] = useState(false);
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [exibirResumo, setExibirResumo] = useState(false);
  const [carregando, setCarregando] = useState(true);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        await DatabaseService.inicializarBanco("SENHA_MESTRA_SEMEC_CDA");
        const dados = await SyncService.baixarDadosSemec();
        setAlunos(dados || []);
      } finally { setCarregando(false); }
    };
    bootstrap();
  }, []);

  // --- LÓGICA DE ASSINATURA ---
  const startDrawing = (e: any) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const rect = canvas?.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - (rect?.left || 0);
    const y = (e.clientY || e.touches[0].clientY) - (rect?.top || 0);
    ctx?.beginPath();
    ctx?.moveTo(x, y);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const rect = canvas?.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - (rect?.left || 0);
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - (rect?.top || 0);
    ctx?.lineTo(x, y);
    ctx?.stroke();
    e.preventDefault();
  };

  // --- GERAÇÃO DO PDF [RF-006] ---
  const gerarPDF = () => {
    const doc = new jsPDF();
    const presentes = alunos.filter(a => a.status === 'embarcado');
    
    // Cabeçalho Institucional
    doc.setFontSize(18);
    doc.text("PREFEITURA DE CONCEIÇÃO DO ARAGUAIA", 105, 20, { align: "center" });
    doc.setFontSize(14);
    doc.text("SEMEC - Relatório de Transporte Escolar", 105, 30, { align: "center" });
    
    // Dados da Rota
    doc.setFontSize(10);
    doc.text(`Monitor: ${matricula}`, 20, 45);
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 52);
    doc.text(`Status: Rota Finalizada`, 20, 59);

    // Tabela de Alunos
    doc.line(20, 65, 190, 65);
    doc.text("ALUNO", 25, 72);
    doc.text("STATUS", 160, 72);
    doc.line(20, 75, 190, 75);

    let yPos = 82;
    alunos.forEach(aluno => {
      doc.text(aluno.nome, 25, yPos);
      doc.text(aluno.status === 'embarcado' ? "PRESENTE" : "AUSENTE", 160, yPos);
      yPos += 7;
    });

    // Assinatura (Converte o Canvas para Imagem)
    if (canvasRef.current) {
      const signatureImg = canvasRef.current.toDataURL("image/png");
      doc.text("Assinatura do Monitor:", 20, yPos + 10);
      doc.addImage(signatureImg, 'PNG', 20, yPos + 15, 60, 20);
    }

    doc.save(`Relatorio_CDA_${matricula}.pdf`);
    alert("Relatório PDF Gerado com Sucesso!");
    setExibirResumo(false);
  };

  if (carregando) return <div>Iniciando...</div>;

  if (!autenticado) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#004a8d', minHeight: '100vh', color: '#fff' }}>
        <h1>TransPorte CDA</h1>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
          <input type="text" placeholder="Matrícula" onChange={(e) => setMatricula(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
          <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
          <button onClick={() => setAutenticado(true)} style={{ width: '100%', padding: '15px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '5px' }}>ENTRAR</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <header style={{ background: '#004a8d', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', borderRadius: '10px' }}>
        <strong>TransPorte CDA</strong>
        <button onClick={() => setExibirResumo(true)} style={{ background: '#ffc107', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>FECHAR ROTA</button>
      </header>

      <div style={{ marginTop: '20px' }}>
        {alunos.map(aluno => (
          <div key={aluno.id_matricula} style={{ padding: '15px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
            <span>{aluno.nome}</span>
            <button 
              onClick={() => setAlunos(prev => prev.map(a => a.id_matricula === aluno.id_matricula ? {...a, status: 'embarcado'} : a))}
              style={{ padding: '5px 15px', background: aluno.status === 'embarcado' ? '#28a745' : '#004a8d', color: '#fff', border: 'none', borderRadius: '5px' }}
            >
              {aluno.status === 'embarcado' ? 'OK' : 'BIO'}
            </button>
          </div>
        ))}
      </div>

      {exibirResumo && (
        <div style={{ position: 'fixed', inset: 0, background: '#fff', padding: '20px', zIndex: 1000, overflowY: 'auto' }}>
          <h2>Finalização de Rota</h2>
          <canvas 
            ref={canvasRef}
            width={300} height={150}
            onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={() => setIsDrawing(false)}
            onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={() => setIsDrawing(false)}
            style={{ border: '1px solid #000', borderRadius: '5px', touchAction: 'none' }}
          />
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button onClick={() => { const ctx = canvasRef.current?.getContext('2d'); ctx?.clearRect(0,0,300,150); }} style={{ flex: 1, padding: '10px' }}>Limpar</button>
            <button onClick={gerarPDF} style={{ flex: 2, padding: '10px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '5px' }}>GERAR PDF E FINALIZAR</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;