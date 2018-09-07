const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清理dist文件夹
// var WebpackOnBuildPlugin = require('on-build-webpack');
// var fs = require("fs");
const common = require('./webpack.base.conf');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css代码

module.exports = merge(common, {
    devtool: false, //避免在生产中使用 inline-*** 和 eval-***，因为它们可以增加 bundle 大小，并降低整体性能。
    output: {
        // publicPath: './' //并不会对生成文件的路径造成影响，主要是对你的页面里面引入的资源的路径做对应的补全
        // publicPath: 'https://www.kxlist.com/'
        chunkFilename: 'js/[name].js'
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production') //任何位于 /src 的本地代码都可以关联到 process.env.NODE_ENV 环境变量
        }),
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),
            verbose: true,
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css/g, //需要根据自己打包出来的文件名来写正则匹配这个配置是我自己的
            cssProcessor: require("cssnano"),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                },
                parser: require("postcss-safe-parser")
            },
            canPrint: true //是否在控制台打印消息
        }),
        // new WebpackOnBuildPlugin(function (stats) { //使用watch 打包时清理dist文件夹
        //     const newlyCreatedAssets = stats.compilation.assets;
        //     fs.readdir(path.resolve(__dirname, '../dist/'), (err, files) => {
        //         files.forEach(file => {
        //             if (!newlyCreatedAssets[file]) {
        //                 fs.unlink(path.resolve(__dirname, '../dist/'+file));
        //             }
        //         });
        //     });
        // })
    ],
    performance: { //建议每个输出的 js 文件的大小不要超过 250k
        hints: 'process.env.NODE_ENV' ? false : 'warning',
        // maxAssetSize: 300000, // 整数类型（以字节为单位）
        // maxEntrypointSize: 500000, // 整数类型（以字节为单位）
        // assetFilter: function(assetFilename) {
        //     // 提供资源文件名的断言函数
        //     return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
        // }
    },
    optimization: { //提取公共模块，webpack4去除了CommonsChunkPlugin，使用SplitChunksPlugin作为替代
        splitChunks: {
            chunks: 'all',
            // 表示在压缩前的最小模块大小，默认为0；
            minSize: 30000,
            //表示被引用次数，默认为1
            minChunks: 1,
            //最大的按需(异步)加载次数，默认为1；
            maxAsyncRequests: 3,
            //最大的初始化加载次数，默认为1；
            maxInitialRequests: 3,
            // 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；设置ture则使用默认值
            name: "vendor",
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
});