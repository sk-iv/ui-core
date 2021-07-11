const generateScopedName = require('./generateScopedName')
module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "esmodules": true
        },
        modules: false,
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true }
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    ["css-modules-transform", {
      "camelCase": "only",
	    extensions:['.mdl.css'],
      generateScopedName,
      "devMode": false,
      "keepImport": true
    }],
    ["@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ],
    "@babel/plugin-syntax-jsx"
  ]
}