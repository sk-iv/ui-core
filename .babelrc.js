const generateScopedName = require('./generateScopedName')
module.exports = {
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    ["css-modules-transform", {
      "camelCase": "only",
	extensions:['.mdl.css'],
      generateScopedName,
      "devMode": false,
      "keepImport": true
    }]
  ]
}