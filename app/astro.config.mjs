import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Site URL for production
  site: 'https://cancan2542.github.io/myblog',
  
  // Output format: static for GitHub Pages
  output: 'static',

  // Build configuration
  build: {
    format: 'file',
  },

  // Server configuration for development
  server: {
    host: true,
  },

  // Dev toolbar configuration
  devToolbar: {
    enabled: false,
  },

  // Vite configuration
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
});
