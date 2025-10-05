import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { componentTagger } from 'lovable-tagger'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    mode === 'production' && visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  server: {
    host: "::",
    port: 8080
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Ensure a single React instance to avoid "Invalid hook call" errors
    dedupe: ['react', 'react-dom', 'react/jsx-runtime', 'react-router', 'react-router-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime', 'react-router', 'react-router-dom'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Supabase - used throughout app
          if (id.includes('node_modules/@supabase')) {
            return 'vendor-supabase';
          }
          
          // UI libraries - Bootstrap, slick carousel
          if (id.includes('node_modules/bootstrap') || 
              id.includes('node_modules/react-slick') || 
              id.includes('node_modules/slick-carousel') ||
              id.includes('node_modules/react-bootstrap')) {
            return 'vendor-ui';
          }
          
          // Forms - React Hook Form, Zod validation
          if (id.includes('node_modules/react-hook-form') || 
              id.includes('node_modules/@hookform') || 
              id.includes('node_modules/zod')) {
            return 'vendor-forms';
          }
          
          // Markdown and rich text
          if (id.includes('node_modules/react-markdown') || 
              id.includes('node_modules/html-react-parser')) {
            return 'vendor-markdown';
          }
          
          // Icons and utilities
          if (id.includes('node_modules/lucide-react') || 
              id.includes('node_modules/bootstrap-icons')) {
            return 'vendor-icons';
          }
          
          // Admin-only dependencies (lazy loaded)
          if (id.includes('/src/Pages/Admin/') || 
              id.includes('/src/Components/Admin/') ||
              id.includes('/src/Layout/AdminLayout')) {
            return 'chunk-admin';
          }
          
          // Blog components (lazy loaded)
          if (id.includes('/src/Pages/Blog') || 
              id.includes('/src/Components/Blog')) {
            return 'chunk-blog';
          }
          
          // Other vendor dependencies
          if (id.includes('node_modules/')) {
            return 'vendor-misc';
          }
        },
        // Optimize chunk naming for better caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `assets/js/[name]-[hash].js`;
        },
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Organize assets by type
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
            return 'assets/img/[name]-[hash][extname]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // Optimize bundle size
    target: 'esnext',
    minify: 'esbuild',
    // Increase chunk size warning limit (default is 500kb)
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Handle CommonJS/ESM interop
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}))
