import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import  { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import SortCss from 'postcss-sort-media-queries';
import path from "path";

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/ts"),
        "assets": path.resolve(__dirname, "./src/assets"),
      },
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/**.html']),
      SortCss({
        sort: 'mobile-first',
      }),
      ViteImageOptimizer({
        test: /\.(jpe?g|png|webp|gif)$/i,
        png: {
          quality: 80,
          progressive: true,
        },
        jpeg: {
          quality: 80,
          progressive: true,
        },
        jpg: {
          quality: 80,
          progressive: true,
        },
        webp: {
          quality: 80,
          progressive: true,
          effort: 4
        }
      }),
    ],
  };
});
