const path = require('path');

const purgecss = {
  '@fullhuman/postcss-purgecss': {
    content: ['./src/**/*.vue', './src/App.vue'],
    defaultExtractor(content) {
      const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');
      return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
    },
    safelist: [
      /-(leave|enter|appear)(|-(to|from|active))$/,
      /^(?!(|.*?:)cursor-move).+-move$/,
      /^router-link(|-exact)-active$/,
      'html',
      'body',
      /data-v-.*/,
    ],
  },
};

module.exports = {
  plugins: [
    require('postcss-import')({
      resolve(id, basedir) {
        if (id.startsWith('@css')) {
          return path.resolve('./src/assets/styles/css', id.slice(5));
        }
        return path.resolve(basedir, id);
      },
    }),
    require('postcss-simple-vars')({}),
    require('postcss-nested')({}),
    require('autoprefixer')({
      overrideBrowserslist: '> 1%, IE 6, Explorer >= 10, Safari >= 7',
    }),
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.vue', './src/App.vue'],
      defaultExtractor(content) {
        const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');
        return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
      },
      safelist: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/,
        'html',
        'body',
        /data-v-.*/,
      ],
    }),
    require('cssnano')({
      zindex: false,
    }),
  ],
};
