const path = require('path')

const {
  override,
  disableEsLint,
  addLessLoader,
  fixBabelImports,
  addDecoratorsLegacy,
  addWebpackAlias
} = require('customize-cra')

module.exports = {
  webpack: override(
    disableEsLint(),
    addDecoratorsLegacy(),

    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    }),

    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }),

    addLessLoader({
      javascriptEnabled: true
    })
  )
}