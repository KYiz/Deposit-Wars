import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  build: {
    outDir: 'dist-offline',
    rollupOptions: {
      input: fileURLToPath(new URL('./perspective-demo.html', import.meta.url))
    }
  }
});
