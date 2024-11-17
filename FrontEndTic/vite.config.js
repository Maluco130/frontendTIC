import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Asegura que las rutas funcionen correctamente en Render
  build: {
    outDir: 'dist', // Directorio de salida para el build
  },
  server: {
    port: 3000, // Opcional: Cambia si necesitas otro puerto
  },
  preview: {
    port: 5000, // Opcional: Servidor de vista previa en otro puerto
  },
});
