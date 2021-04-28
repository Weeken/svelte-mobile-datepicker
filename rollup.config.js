import svelte from 'rollup-plugin-svelte'
import bundleSize from 'rollup-plugin-bundle-size'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import { terser } from 'rollup-plugin-terser'
import rollupTypescript from '@rollup/plugin-typescript'
import server from 'rollup-plugin-dev'
// import pkg from './package.json'
import { typescript } from 'svelte-preprocess'
import css from 'rollup-plugin-css-porter'
// import autoprefixer from 'autoprefixer'
// import pxtorem from 'postcss-pxtorem'
import livereload from 'rollup-plugin-livereload'

export default [
  {
    input: 'page/index.ts',
    output: {
      sourcemap: true,
      format: 'iife',
      name: 'app',
      file: 'public/bundle.js'
    },
    plugins: [
      svelte({
        preprocess: [
          typescript(),
          // postcss({
          //   plugins: [
          //     autoprefixer(),
          //     pxtorem({
          //       // rootValue: 100,
          //       propList: ['*']
          //     })
          //   ],
          // }),
        ],
        compilerOptions: {
          // enable run-time checks when not in production
          dev: true
        }
      }),
      css({dest: `public/css/index.css`}),
      commonjs(),
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      // terser(),
      bundleSize(),
      rollupTypescript({
        sourceMap: true,
        inlineSources: true
      }),
      server({
        host: 'localhost',
        port: 8888,
        silent: 'very'
      }),
      livereload('public')
    ],
    watch: {
      clearScreen: false,
      include: ['src/**', 'page/**'],
      exclude: ['node_modules/**']
    }
  }
];