// import typescript from '@rollup/plugin-typescript';
// import jsx from 'acorn-jsx';
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'

import pkg from './package.json';

// const baseConfig = createBasicConfig();

export default {
  input: './out-tsc/index.js',
  // preserveModules: true,
  exports: 'named',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    },
  ],
  external: [ 'react', 'react-dom' ],
  // acornInjectPlugins: [jsx()],
  plugins: [
    external(),
    postcss({
      // extract: true,
      modules: true,
      plugins: [require('postcss-nested')]
    }),
    url(),
    svgr(),
    // typescript(),
    commonjs(),
    resolve()
  ]
};
