import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Site URL for production
  site: 'https://cancan2542.github.io',
  
  // Base path (root domain)
  base: '/',
  
  // Output format: static for GitHub Pages
  output: 'static',

  // Build configuration
  build: {
    format: 'file',
  },

  // Trailing slash configuration for GitHub Pages
  trailingSlash: 'always',

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
