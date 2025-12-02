import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8000', // Backend URL
  //       changeOrigin: true,
  //       secure: false, // Use true if backend has HTTPS
  //       rewrite: (path) => path.replace(/^\/api/, '') // Optional rewrite
  //     }
  //   }
  // }
})
