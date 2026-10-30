import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        original: fileURLToPath(new URL('./index.html', import.meta.url)),
        perspectiveDemo: fileURLToPath(new URL('./perspective-demo.html', import.meta.url))
      }
    }
  }
});
