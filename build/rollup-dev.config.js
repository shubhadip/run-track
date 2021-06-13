import path from 'path';
import vue from 'rollup-plugin-vue';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import PostCSS from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import simplevars from 'postcss-simple-vars';
import typescript from 'rollup-plugin-typescript2';
import nested from 'postcss-nested';
import serve from 'rollup-plugin-serve';
import image from '@rollup/plugin-image';
import livereload from 'rollup-plugin-livereload';
import postcssImport from 'postcss-import';

const postcssPluginList = [
  postcssImport({
    resolve(id, basedir) {
      if (id.startsWith('@css')) {
        return path.resolve('./src/assets/styles/css', id.slice(5));
      }
      return path.resolve(basedir, id);
    },
  }),
  simplevars,
  nested,
  autoprefixer({
    overrideBrowserslist: '> 1%, IE 6, Explorer >= 10, Safari >= 7',
  }),
];

const baseConfig = {
  plugins: {
    preVue: [
      alias({
        entries: [{ find: 'vue', replacement: 'node_modules/vue/dist/vue.runtime.esm-browser.js' }],
        customResolver: resolve({
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        }),
      }),
    ],
    replace: {
      'process.env.NODE_ENV': JSON.stringify('production'),
      __VUE_OPTIONS_API__: JSON.stringify(false),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    },
    vue: {
      target: 'browser',
      preprocessStyles: true,
      postcssPlugins: [...postcssPluginList],
    },
    postVue: [
      PostCSS({
        modules: {
          generateScopedName: '[local]___[hash:base64:5]',
        },
        include: /&module=.*\.css$/,
      }),
      PostCSS({ include: /(?<!&module=.*)\.css$/, plugins: [...postcssPluginList] }),
      image({
        extensions: /\.(png|jpg|jpeg|gif|svg)$/,
        limit: 10000,
      }),
    ],
    babel: {
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'runtime',
    },
  },
};

let buildFormats = [];

const umdBuild = {
  input: path.join(__dirname, '..', 'src', 'main.ts'),
  output: {
    file: path.join(__dirname, '..', 'serve', 'runtrack.js'),
    format: 'es',
    name: 'runtrack',
  },
  plugins: [
    typescript(),
    commonjs(),
    replace(baseConfig.plugins.replace),
    ...baseConfig.plugins.preVue,
    vue(baseConfig.plugins.vue),
    ...baseConfig.plugins.postVue,
    getBabelOutputPlugin({
      presets: ['@babel/preset-env'],
    }),
    serve({
      open: true,
      contentBase: path.join(__dirname, '..', 'serve'),
      host: 'localhost',
      port: 4545,
    }),
    livereload({
      verbose: true,
      watch: path.join(__dirname, '..', 'serve'),
    }),
    resolve(),
  ],
};

buildFormats.push(umdBuild);
buildFormats;

export default buildFormats;
