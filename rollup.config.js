import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'

import pkg from './package.json';

export default {
  input: './.tsc-out/index.js',
  // preserveModules: true,
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
  plugins: [
    external(),
    postcss({
      // extract: true,
      modules: true,
      plugins: [require('postcss-nested')]
    }),
    url(),
    svgr(),
    resolve(),
    commonjs()
  ]
};
