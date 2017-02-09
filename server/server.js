/**
 * Created by Yigit Yesilpinar on 9.02.2017.
 *
 * Dist Server, Express.js serves static files from dist folder, bundle.js bundle.css
 *
 */

import express from 'express';
import path from 'path';
import compression from 'compression';
/* eslint-disable no-console */
import favicon from "serve-favicon";

import  bodyParser from 'body-parser';
import apiRouteConfig from "./configurations/apiRoutesConfig";

// process.argv[2] is the argument passed from command, node server.js --development
let isDevelopment = (process.argv[2] != undefined && process.argv[2] === "--development");

const host = "127.0.0.1";
const port = process.env.PORT || 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

app.use(favicon(path.resolve(__dirname + '/favicon.ico')));

express.static.mime.define({"text/css": ["css"]});
express.static.mime.define({"application/x-font-woff": ["woff"]});
express.static.mime.define({"application/x-font-ttf": ["ttf"]});
express.static.mime.define({"application/vnd.ms-fontobject": ["eot"]});
express.static.mime.define({"font/opentype": ["otf"]});


apiRouteConfig(app);


// Api routes which are not defined response with 404 not found status
app.get('/api/*', function(req, res) {
    res.status(404).send('NOT FOUND');
});

if(isDevelopment){
    // All requests to index.html, Single page application
    app.get('*', function(req, res) {
        res.sendFile(path.join( __dirname, '../dist/index.html'));
    });
}
else {
    // in production server.js and dist folder are in the same folder
    app.get('*', function(req, res) {
        res.sendFile(path.join( __dirname, './dist/index.html'));
    });
}


app.listen(port, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.log(`Express server listening at http://${host}:${port}`);
    }
});

export default app;
