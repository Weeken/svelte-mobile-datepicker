import svelte from 'rollup-plugin-svelte'
import bundleSize from 'rollup-plugin-bundle-size'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import rollupTypescript from '@rollup/plugin-typescript'
import { typescript } from 'svelte-preprocess'
import css from 'rollup-plugin-css-porter'
import copy from 'rollup-plugin-copy'
import pkg from './package.json'


export default [
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.module, format: 'es' },
      { file: pkg.main, format: 'umd', name: 'SvelteMobileDatePicker' },
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
      css({dest: `dist/index.css`}),
      commonjs(),
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      bundleSize(),
      rollupTypescript(),
      terser(),
      copy({
        targets: [
          { src: `page/type.d.ts`, dest: `dist`, rename: 'index.d.ts' }
        ]
      })
    ]
  }
];