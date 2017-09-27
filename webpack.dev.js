import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin';
import path from 'path';

const targetDir = '/Users/zooble/Documents/case/xwenliang.cn';

let pages = [
    //前后同构
    'index',
    'login',
    'reg',
    'user',
    'post',
    //仅前端
    'newpost',
    'editpost'
];

let entry = {};
pages.forEach(page => {
    entry[page] = `./src/pages/${page}/${page}`;
});

let htmlPluginArr = pages.map(page => {
    return new HtmlWebpackPlugin({
        inject: 'body',
        template: `./src/pages/${page}/${page}.html`,
        chunks: ['common', page],
        filename: path.resolve(targetDir, `app/view/${page}.html`)
    });
});

let config = {
    entry: {
        ...entry
    },
    // ensure entry files hash not to change when delete or add entry files
    //recordsPath: 'webpack.records.json',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.resolve(targetDir, 'static'),
        publicPath: '/static'
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
                        loader: 'file-loader',
                        options: {
                            name: '/images/[name].[ext]'
                        }
                    }
                ]
            },
            // css
            {
                test: /\.(css|less)$/,
                exclude: /node_modules/,
                //It doesn't work with Hot Module Replacement by design
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                //the number 1, just set this value to true
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
                })
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
                    name: '/images/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            // but the hash was js's....(use contenthash instead chunkhash will avoid this problem)
            filename: '[name].css',
            allChunks: true
        }),
        
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: '[name].js',
            chunks: pages,//If omitted all entry chunks are selecHotModuleReplacementPluginted
            minChunks: function(module){
                let context = module.context;
                if(typeof context !== 'string'){
                    return false;
                }
                return context.indexOf('node_modules') > -1 || context.indexOf('src/vendor') > -1 || context.indexOf('src/css') > -1;
            }
        }),

        ...htmlPluginArr
    ]
};


let compiler = webpack(config);
compiler.apply(new webpack.ProgressPlugin());
compiler.watch({
    aggregateTimeout: 1000,
    ignored: /node_modules/,
    poll: 1000
}, (err, stats) => {
    console.log(stats);
});

