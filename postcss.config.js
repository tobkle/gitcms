const purgecss = [
  '@fullhuman/postcss-purgecss',
  {
    content: ['./components/**/*.js', './pages/**/*.js'],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
];

module.exports = {
  plugins: [
    // 'postcss-import',
    'tailwindcss',
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
    // 'autoprefixer',
    'postcss-preset-env',
    // 'cssnano',
  ],
};

// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }
