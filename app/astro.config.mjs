import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Site URL for production
  site: 'https://canpark.blog',

  // Base path (root domain)
  base: '/',
  
  // Output format: static for GitHub Pages
  output: 'static',

  // Build configuration - directory format for clean URLs
  build: {
    format: 'directory',
  },

  // Trailing slash configuration - ignore to allow both with and without
  trailingSlash: 'ignore',

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
