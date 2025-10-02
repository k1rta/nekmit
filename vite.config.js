import { defineConfig } from 'vite';

export default defineConfig({
  // Development server configuration
  server: {
    // Custom middleware to handle rewrites like Vercel
    configureServer(server) {
      server.middlewares.use('/status', (req, res, next) => {
        req.url = '/status.html';
        next();
      });
    },
  },

  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        status: 'status.html',
      },
    },
  },
});
