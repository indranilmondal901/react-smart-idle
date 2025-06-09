import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main, // CommonJS
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module, // ES Module
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: ['react'],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      clean: true,
    }),
  ],
};