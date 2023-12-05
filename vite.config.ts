import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      '/auth': 'http://localhost:3001',
      '/bottles': 'http://localhost:3001',
      '/notes': 'http://localhost:3001',
    },
  },
  plugins: [react()],
});
