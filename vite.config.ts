import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(import.meta.dirname, './src') } },
  // Alvo amplo: roda em iPhones com Safari 14+ e Android antigos (antes: só Safari 16.4+).
  build: { outDir: 'dist', assetsInlineLimit: 0, target: ['es2020', 'safari14', 'chrome87', 'firefox78', 'edge88'] },
})
