import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // Pode mudar para 3000 se preferir
    host: '0.0.0.0',  // Isso permite que o Vite seja acessado externamente
    watch: {
      usePolling: true,  // Necessário no Docker para ativar o hot reload
    },
  },
  base: './',  // Garante que caminhos relativos funcionem ao recarregar
})