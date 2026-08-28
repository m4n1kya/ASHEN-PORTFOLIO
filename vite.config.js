import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Increase warning limit since three.js is inherently large
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          // Split three.js core from react-three-fiber for better parallelism
          'vendor-three-core': ['three'],
          'vendor-three-fiber': ['@react-three/fiber', '@react-three/drei'],
          // Separate framer-motion from gsap — different usage patterns
          'vendor-framer': ['framer-motion'],
          'vendor-gsap': ['gsap'],
          // Markdown rendering is only used in ProjectsWindow
          'vendor-markdown': ['react-markdown', 'remark-gfm'],
        }
      }
    }
  }
});
