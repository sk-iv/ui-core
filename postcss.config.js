const generateScopedName = require('./generateScopedName')

module.exports = {
  plugins: [
    require('postcss-modules')({
      generateScopedName,
      camelCase: 'only',
    }),
  ],
}
