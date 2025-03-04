import { defineConfig } from 'vite';
import { CodeInspectorPlugin } from 'code-inspector-plugin';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://cn.vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    CodeInspectorPlugin({
      bundler: 'vite',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 10001,
  },
  build: {
    assetsInlineLimit: 0,
  },
});
