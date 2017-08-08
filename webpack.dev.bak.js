const webpack = require('webpack');

const WebpackDevServer = require('webpack-dev-server');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const args = process.argv;
const path = require('path');


let pages = [
    'index',
    'login',
    'reg',
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
        chunks: ['common', page],
        filename: `./${page}.html`,
        path: path.join(__dirname, 'build')
    });
});

let config = {
    entry: {
        ...entry,

    },
    // ensure entry files hash not to change when delete or add entry files
    //recordsPath: 'webpack.records.json',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
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
                        loader: 'file-loader',
                        options: {
                            name: './images/[name].[ext]'
                        }
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
                    name: './images/[name].[ext]'
                }
            }
        ]
    },
    plugins: [

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
    // use webpack-dev-server command will use this config
    // devServer: {
    //     contentBase: path.join(__dirname, 'build'),
    //     compress: true,
    //     port: 9000
    // }
};


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