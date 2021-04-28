import svelte from 'rollup-plugin-svelte'
import bundleSize from 'rollup-plugin-bundle-size'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import rollupTypescript from '@rollup/plugin-typescript'
// import pkg from './package.json'
import { typescript } from 'svelte-preprocess'
import css from 'rollup-plugin-css-porter'
import pkg from './package.json'
import copy from 'rollup-plugin-copy'


export default [
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.module, 'format': 'es' },
      { file: pkg.main, 'format': 'umd', name: 'DatePicker' }
    ],
    plugins: [
      svelte({
        preprocess: [
          typescript()
        ],
        compilerOptions: {
          // enable run-time checks when not in production
          dev: false
        }
      }),
      css(),
      commonjs(),
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      bundleSize(),
      rollupTypescript({
        sourceMap: true,
        inlineSources: true
      }),
      terser(),
      copy({
        targets: [
          { src: `package.json`, dest: `dist` },
          { src: `README.md`, dest: `dist` }
        ]
      })
    ]
  }
];