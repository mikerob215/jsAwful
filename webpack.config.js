const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/main.ts',
    // devtool: 'cheap-eval-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'yajfw.js'
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    module: {
        rules: [
            {test: /\.(ts|tsx)$/, loaders: ['babel-loader', 'ts-loader'], exclude: /node_modules/}
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: true
            }
        })
    ]
};