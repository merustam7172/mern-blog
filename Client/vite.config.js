import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/

// use for fetching data when api is from backend
export default defineConfig({
  server : {
    proxy : {
      '/api' : {
        target : 'http://localhost:3000',
        secure : false,
      }
    }
  },
  plugins: [react()],
})
