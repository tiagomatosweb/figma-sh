import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'
import babel from 'vite-plugin-babel';
// import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteSingleFile(),
      babel(),
    // createHtmlPlugin(),
  ],
  build: {
    cssCodeSplit: false,
    // assetsInlineLimit: 100000000,
    // rollupOptions: {
    //   output: {
    //     manualChunks: () => "everything.js",
    //   },
    // },
  }
})
