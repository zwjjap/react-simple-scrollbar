
module.exports = {
  presets: [
    [
      '@babel/preset-env',
    ],
    '@babel/preset-react'
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    '@babel/plugin-syntax-dynamic-import',
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",
    '@babel/plugin-transform-modules-commonjs',
  ]
};