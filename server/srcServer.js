/**
 * Created by Yigit Yesilpinar on 5.02.2017.
 *
 * Development Server, Express.js, Handle webpack build with webpack-dev-middleware
 *
 */

import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackConfig from '../webpack.config.dev';
import favicon from 'serve-favicon';
import apiRouteConfig from "./configurations/apiRoutesConfig";

//open browser on port specified
import open from 'open';

/* eslint-disable no-console */

import  bodyParser from 'body-parser';

const host = "localhost";
const port = process.env.PORT || 5000;
const app = express();
const compiler = webpack(webpackConfig);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

express.static.mime.define({"text/css": ["css"]});
express.static.mime.define({"application/x-font-woff": ["woff"]});
express.static.mime.define({"application/x-font-ttf": ["ttf"]});
express.static.mime.define({"application/vnd.ms-fontobject": ["eot"]});
express.static.mime.define({"font/opentype": ["otf"]});

app.use(favicon(path.resolve(__dirname + '/favicon.ico')));
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
apiRouteConfig(app);

// Api routes which are not defined response with 404 not found status
app.get('/api/*', function(req, res) {
      res.status(404).send('NOT FOUND');
});

// All requests to index.html, Single page application
app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening at http://${host}:${port}`);
    open(`http://${host}:${port}`);
  }
});

export default app;
