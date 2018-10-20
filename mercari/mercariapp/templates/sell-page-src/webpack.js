process.traceDeprecation = true;

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const chalk = require('chalk');

const webConfig = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    bail: true,
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
    entry: {
        web: './src/web/index.jsx'
    },
    output: {
        path: path.resolve(__dirname, '../../static/js'),
        publicPath: '/js/',
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
        alias: {
            '~': path.resolve(__dirname, './src/web')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: process.env.NODE_ENV === 'production' ? JSON.stringify('production') : JSON.stringify('development')
            }
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './src/web/index.html'),
                to: path.resolve(__dirname, '../sell-page/index.html')
            }
        ])
    ],
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader",
                exclude: [
                    /node_modules\//
                ]
            },
            {
                test: /\.jsx?$/i,
                exclude: /node_modules/i,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['stage-3', ['env', { targets: { browsers: ['last 2 versions'] } }], 'react'],
                        plugins: ['transform-class-properties'],
                        compact: true,
                        babelrc: false,
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    },
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
                use: [{ loader: 'file-loader', options: { name: '../fonts/[name].[ext]' } }]
            }
        ]
    },
    optimization: {
        noEmitOnErrors: true
    }
};

const showNodeEnvWarning = () => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(
            chalk.yellow('WARNING: You are currently building Botpress in development; NOT generating a production build')
        );
        console.log(chalk.yellow('Run with NODE_ENV=production to create a production build instead'));
    }
};

const compiler = webpack([webConfig]);
const postProcess = (err, stats) => {
    if (err) {
        throw err;
    }
    console.log(chalk.grey(stats.toString('minimal')));
};

if (process.argv.indexOf('--compile') !== -1) {
    showNodeEnvWarning();
    compiler.run(postProcess);
} else if (process.argv.indexOf('--watch') !== -1) {
    compiler.watch(null, postProcess);
}

module.exports = { web: webConfig };

