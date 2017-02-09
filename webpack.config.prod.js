import webpack      from "webpack";
import path         from "path";
import ExtractTextPlugin from "extract-text-webpack-plugin";

const BABEL_QUERY = {
    plugins: [
        ["transform-es2015-spread"],
        ["transform-class-properties"],
        ["transform-es2015-classes"]
    ]
};


export default {
    debug: true,
    devtool: 'source-map',
    noInfo: false,
    entry: [path.resolve(__dirname, 'src/index')],
    target: 'web',
    output: {
        path: path.resolve(__dirname , 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src')
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("bundle.css"),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
            {
            test: /\.js$/,
            include: [path.join(__dirname, "shared"), path.join(__dirname, "src")],
            loader: "babel",
            query: BABEL_QUERY
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap'),
                include: [path.join(__dirname, "shared/assets/styles")]
            },
            {
                test: /\.(png|jpe?g|gif)(\?\S*)?$/,
                loaders: ['file?hash=sha512&digest=hex&name=[name].[ext]&outputPath=/',
                    'image-webpack?{ pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}'
                ]
            },
            {
                test: /\.(eot)(\?\S*)?$/,
                loader: "url?limit=100000&mimetype=application/font-otf&name=[name].[ext]"
            },
            {
                test: /\.(woff|woff2)(\?\S*)?$/,
                loader: "url?limit=100000&mimetype=application/x-font-woff&name=[name].[ext]"
            },
            {
                test: /\.(ttf)(\?\S*)?$/,
                loader: "url?limit=100000&mimetype=application/octet-stream&name=[name].[ext]"
            },
            {
                test: /\.(svg)(\?\S*)?$/,
                loader: "url?limit=100000&mimetype=image/svg+xml&name=[name].[ext]"
            }
        ]
    }
};
