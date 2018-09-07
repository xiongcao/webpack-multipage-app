const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //重新生成dist/index.html
// const ExtractTextPlugin = require("extract-text-webpack-plugin"); //分离css(与 webpack 4 不太兼容)
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //打包分离css
const utils = require('./utils.js');
const devMode = process.env.NODE_ENV;

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: utils.getEntry('./src/pages/**/*.js', "js"),
    output: {
        filename: 'js/[name]-[hash].js',
        path: path.resolve(__dirname, '../dist'),
        // publicPath: './'    //有这个的话开发环境需要指定服务器从打包后的静态文件读取
    },
    mode: "production",
    plugins: [
        // new ExtractTextPlugin({
        //     filename: 'css/[name].css'
        // }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[hash].css'
        })
    ],
    module: {
        rules: [{
                // test: /\.css$/,
                // use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use:['css-loader','postcss-loader'],
                //     publicPath:'../' //解决css背景图的路径问题
                // }),
                test: /\.(le|sc|c)ss$/,
                use:[
                    {
                        loader:devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        options:{
                            publicPath: '../'
                        }
                    },
                    {
                        loader:'css-loader' 
                    },
                    {
                        loader:'postcss-loader' 
                    },
                    {
                        loader:'sass-loader' 
                    }
                ],
                include: path.join(__dirname, '../src'), //限制范围，提高打包速度
            },
            // {
            //     test: /\.scss$/,
            //     exclude: /(node_modules|bower_components)/,
            //     // use: ExtractTextPlugin.extract({
            //     //     fallback: "style-loader",
            //     //     use: ['css-loader', 'sass-loader']
            //     // })
            // },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 1024,
                        outputPath: "images"
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 1024,
                        outputPath: "iconfont"
                    }
                }]
            },
            //相当于可以使用iframe ，具体用法查看html-loader
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.css', 'scss', '.json'],
        alias: {
            "@": resolve('src'),
            "@js": resolve('src/common/js'),
            "@css": resolve('src/common/css'),
            "@common": resolve('src/components'),
            "@iconfont": resolve('src/assets/iconfont'),
            "@images": resolve('src/assets/images')
        }
    }
};

let pages = utils.getEntry('src/pages/**/*.html', 'html');
for (let pathname in pages) {
    // 配置生成的html文件，定义路径等
    let conf = {
        filename: pathname + '.html',
        template: pages[pathname], // 模板路径
        chunks: [pathname, 'vendor', 'manifest'], // 每个html引用的js模块
        inject: true // js插入位置
    };
    // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}