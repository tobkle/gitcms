// https://medium.com/better-programming/how-to-set-up-next-js-with-tailwind-css-b93ccd2d4164

const purgecss = {
  '@fullhuman/postcss-purgecss': {
    content: ['./components/**/*.js', './pages/**/*.ts', './pages/**/*.tsx'],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
}

module.exports = {
  plugins: {
    tailwindcss: {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
    ...(process.env.NODE_ENV === 'production' ? purgecss : {}),
  },
}
