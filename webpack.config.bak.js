const webpack = require('webpack');

const WebpackDevServer = require('webpack-dev-server');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const args = process.argv;
const path = require('path');


// function WebpackFtpDeploy(){

// };

// WebpackFtpDeploy.prototype.apply = function(compiler){
//     compiler.plugin('emit', function(compilation, callback){
//         console.dir(compilation.assets);
//     });
// }

let pages = [
    'index',
    'login',
    'newpost'
];

let entry = {};
pages.forEach(page => {
    entry[page] = `./src/pages/${page}/${page}`;
});

let htmlPluginArr = pages.map(page => {
    return new HtmlWebpackPlugin({
        inject: 'body',
        template: `./src/pages/${page}/${page}.html`,
        // inject modules from entry's key
        chunks: ['manifest', 'common', page],
        filename: `./${page}.html`,
        path: path.join(__dirname, 'build')
    });
});

let config = {
    entry: {
        ...entry,
        common: [
            './vendor/jquery/jquery',
            'lodash',
            'react',
            'react-dom',
            'react-router-dom'
        ]
    },
    // ensure entry files hash not to change when delete or add entry files
    //recordsPath: 'webpack.records.json',
    output: {
        filename: '[name]_[chunkhash:10].js',
        chunkFilename: '[name]_[chunkhash:10].js',
        path: path.join(__dirname, 'build')
    },
    module: {
        rules: [
            // js
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react'],
                            //use Object Spread Operator 
                            plugins: ['transform-object-rest-spread']
                        }
                    }
                ]
            },
            // web fonts
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            // css
            {
                test: /\.(css|less)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            noIeCompat: true
                        }
                    }
                ]
            },
            //favicon
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        /*
                          html-loader接受attrs参数, 表示什么标签的什么属性需要调用webpack的loader进行打包.
                          比如<img>标签的src属性, webpack会把<img>引用的图片打包, 然后src的属性值替换为打包后的路径.
                          使用什么loader代码, 同样是在module.rules定义中使用匹配的规则.

                          如果html-loader不指定attrs参数, 默认值是img:src, 意味着会默认打包<img>标签的图片.
                          这里我们加上<link>标签的href属性, 用来打包入口index.html引入的favicon.ico文件.
                        */
                        options: {
                            attrs: ['img:src', 'link:href']
                        }
                    }
                ]
            },
            // images, set inlining files below some size
            {
                test: /\.(jpe?g|png|ico)$/i,
                loader: 'url-loader',
                options: {
                    limit: 10,//B
                    name: './images/[name]_[hash:10].[ext]'
                }
            }
            // images
            // {
            //     test: /\.(jpg|png)$/,
            //     loader: 'file-loader',
            //     options: {
            //         name: '[name]_[hash:10].[ext]'
            //     }
            // }
        ]
    },
    plugins: [
        // my plugin
        //new WebpackFtpDeploy(),
        // use hashedModuleId
        new webpack.HashedModuleIdsPlugin({
            hashDigestLength: 10
        }),

        // new webpack.HotModuleReplacementPlugin({
        //   // Options...
        // }),

        // use file path as moduleId
        // new webpack.NamedModulesPlugin({
        //     //hashDigestLength: 10
        // }),

        // extract common codes
        new webpack.optimize.CommonsChunkPlugin({
            // point the output file, from entry's key
            names: ['common', 'manifest']
        }),

        // auto inject js / css ..
        // new HtmlWebpackPlugin({
        //     inject: 'body',
        //     template: './src/pages/main.html',
        //     // inject modules from entry's key
        //     chunks: ['manifest', 'common', 'main'],
        //     filename: './main.html',
        //     //这货有坑，不会使用上面url-loader生成的带md5的ico，会自己在根目录重新生成一个来引用
        //     //favicon: './src/images/fa.ico',
        //     path: path.join(__dirname, 'build')
        // }),

        ...htmlPluginArr,

        new ExtractTextPlugin({
            // but the hash was js's....(use contenthash instead chunkhash will avoid this problem)
            filename: '[name]_[contenthash:10].less',
            allChunks: true
        }),

        //new webpack.optimize.UglifyJsPlugin()
    ]
    // use webpack-dev-server command will use this config
    // devServer: {
    //     contentBase: path.join(__dirname, 'build'),
    //     compress: true,
    //     port: 9000
    // }
};

// if (args.join('').indexOf('-dev') === -1 ){
//     config.plugins = [
//         new webpack.optimize.UglifyJsPlugin()
//     ];
// }


let compiler = webpack(config);
compiler.apply(new webpack.ProgressPlugin());
compiler.run(function(err, stats){
    //console.log(err, stats);
});

compiler.apply(new webpack.ProgressPlugin(function(percentage, msg) {
  //console.log((percentage * 100) + '%');
}));



let server = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    hot: true,
    inline: true,
    stats: { colors: true },
    setup: function(app){
        app.get('/new', function(req, res){
            res.json({'abc': 123})
        });
        app.get('/getCategory', function(req, res){
            res.json({
                code: 1,
                msg: 'ok',
                data: [
                    'Javascript',
                    'Nodejs',
                    'Python',
                    'PHP',
                    'Java',
                    'Html',
                    'Android',
                    'iOS',
                    '心路历程',
                    '杂谈随想'
                ]
            });
        });
    },
    proxy: {
        '**': {
            target: 'http://xwenliang.cn',
            changeOrigin: true,
            secure: false
        }
    }
});

server.listen(9000/*, '172.16.32.218'*/);


module.exports = config;