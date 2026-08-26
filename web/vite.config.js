import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        // The libraries change only when we upgrade them, while our own code
        // changes on every deploy. Keeping them in separate files means a
        // returning student re-downloads a few KB of app code instead of the
        // whole ~400 KB bundle, because the vendor files keep their old
        // content hash and stay in the browser cache.
        //
        // Vite 8 builds with rolldown, which only accepts the function form of
        // manualChunks — the object form throws "manualChunks is not a function".
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) {
            return 'vendor-motion'
          }
          if (id.includes('lucide-react')) return 'vendor-icons'
          if (
            id.includes('react-router') ||
            id.includes('/react-dom/') ||
            id.includes('/react/') ||
            id.includes('scheduler')
          ) {
            return 'vendor-react'
          }
        },
      },
    },
  },
})
