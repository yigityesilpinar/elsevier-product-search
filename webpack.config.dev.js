import webpack      from "webpack";
import path         from "path";

const BABEL_QUERY = {
    plugins: [
        ["transform-es2015-spread"],
        ["transform-class-properties"],
        ["transform-es2015-classes"]
    ]
};


export default {
    debug: true,
    devtool: 'inline-source-map',
    noInfo: false,
    entry: [
       // eventSource, // necessary for hot reloading with IE
        'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
        path.resolve(__dirname, 'src/index')
    ],
    target: 'web',
    output: {
        path: path.resolve(__dirname , '/dist'), // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        /*new webpack.ProvidePlugin({
        jQuery: 'jquery',
        }),*/
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.NoErrorsPlugin()
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
                loader: 'style-loader!css-loader',
                include: [path.join(__dirname, "shared/assets/styles")]
            },
            {
                test: /\.(png|jpe?g|gif|ico)(\?\S*)?$/,
                loader: "url?limit=100000&name=[name].[ext]"
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
