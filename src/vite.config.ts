import { defineConfig } from 'vite'
import react from '@vitejs/react-refresh'

// Configuração para o TransPorte CDA - Versão Refinada 1.1
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite acesso via rede (Tablet do Monitor)
    port: 5173
  }
})