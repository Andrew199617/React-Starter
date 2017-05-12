const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [ './Main.js', ],
  output: { path: path.join(__dirname, 'www'), filename: 'bundle.js', },
  
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'],},
      { test: /\.css$/, loader: 'style-loader' }, 
      { test: /\.scss$/, exclude: [/\.sass$/, /\.scss$/], loaders: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'},
      { test: /\.css$/, loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      },
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },
  
};