const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //重新生成dist/index.html
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清理dist文件夹
const webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another-module.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './'
    },
    mode: "production",
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'inline-source-map',
    devServer: {
        // contentBase: path.join(__dirname, "public"),//服务器从哪里提供内容。只有在你想要提供静态文件时才需要
        contentBase: './dist',
        // compress: true,//一切服务都启用gzip 压缩
        port: 80,
        hot: true
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};