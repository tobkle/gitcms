const fs = require('fs')
const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)

// Read the src directory and add all found folders as an alias
// otherwise this doesn't work:
// import ... from 'components/...'
const getDirectoriesForAlias = (source) =>
  fs
    .readdirSync(path.join(__dirname, '..', source), { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => ({ [dirent.name]: resolve('../src/' + dirent.name) }))

const alias = Object.assign({}, ...getDirectoriesForAlias('src'))

// Read the src directory and add all found folders to include all their .ts, .tsx files
const getDirectoriesForInclude = (source) =>
  fs
    .readdirSync(path.join(__dirname, '..', source), { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => resolve('../src/' + dirent.name))

const preInclude = getDirectoriesForInclude('src')

console.log('Aliase:', alias)
console.log('Includes:', preInclude)

module.exports = {
  webpackFinal: async (baseConfig, options) => {
    // Modify or replace config. Mutating the original reference object can cause unexpected bugs.
    const { module = {} } = baseConfig

    const newConfig = {
      ...baseConfig,
      module: {
        ...module,
        rules: [...(module.rules || [])],
      },
    }

    newConfig.resolve = Object.assign(newConfig.resolve, {
      alias,
    })

    // TypeScript with Next.js
    newConfig.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: preInclude,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
            plugins: ['react-docgen'],
          },
        },
      ],
    })
    newConfig.resolve.extensions.push('.ts', '.tsx')

    //
    // CSS Modules
    // Many thanks to https://github.com/storybookjs/storybook/issues/6055#issuecomment-521046352
    //

    // First we prevent webpack from using Storybook CSS rules to process CSS modules
    newConfig.module.rules.find(
      (rule) => rule.test.toString() === '/\\.css$/'
    ).exclude = /\.module\.css$/

    // Then we tell webpack what to do with CSS modules
    newConfig.module.rules.push({
      test: /\.module\.css$/,
      include: path.resolve(__dirname, '../src/components'),
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true,
          },
        },
        'postcss-loader',
      ],
    })

    return newConfig
  },
}
