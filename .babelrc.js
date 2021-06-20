const generateScopedName = require('./generateScopedName')
module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "esmodules": true
        },
        modules: false
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
    }]
  ]
}