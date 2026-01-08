import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'node18',
  outDir: 'dist',
  clean: true,
  splitting: false,
  sourcemap: true,
  minify: false,
  banner: {
    js: '#!/usr/bin/env node\n',
  },
  esbuildOptions(options) {
    options.external = ['fs-extra', 'commander', 'inquirer', 'chalk', 'ora', 'zod'];
  },
});
