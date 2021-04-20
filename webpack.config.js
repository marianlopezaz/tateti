const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
        {
            test: /\.css$/,
            include: path.join(__dirname, 'src/components'),
            use: [
              'style-loader',
              {
                loader: 'typings-for-css-modules-loader',
                options: {
                  modules: true,
                  namedExport: true
                }
              }
            ]
        }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};