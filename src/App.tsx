// Adicione este import no topo
import { SyncService } from './services/sync';

// Dentro da função registrarEmbarque, após atualizar o estado:
SyncService.salvarLocalmente(alunoAtualizado);

// Adicione este useEffect para monitorar a volta da internet
useEffect(() => {
  window.addEventListener('online', SyncService.sincronizar);
  return () => window.removeEventListener('online', SyncService.sincronizar);
}, []);