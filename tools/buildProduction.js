/**
 * Created by Yigit Yesilpinar on 9.02.2017.
 *
 * Build with webpack for production
 *
 */

/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
// for colorful console logs
import chalk from 'chalk';
import cheerio from 'cheerio';
import fs from 'fs';

process.env.NODE_ENV = 'production';

console.log(chalk.blue.underline.bold('Generating minified bundle for production via Webpack. This will take a moment...  '));

let pathParts = webpackConfig.output.path.split('\\');
// Change output folder from "dist" to "production\dist"
pathParts[pathParts.length-1] = "production\\dist";
webpackConfig.output.path =pathParts.join('\\');
webpack(webpackConfig).run((err, stats) => {

    if(err){
        console.error(err);
        return 1;
    }

    const jsonStats = stats.toJson();

    if(jsonStats.hasErrors){
        return jsonStats.errors.map(error => console.error(error));
    }
    if(jsonStats.hasWarnings){
        console.log(chalk.yellow.bold('Webpack generated the following warnings: '));

        jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
    }
    console.info(`Webpack stats: ${stats}`);

    console.log(chalk.green.bold('App has been compiled in production mode and written to production/dist'));

    copyIndexHtml();
    return 0;

});


function copyIndexHtml() {


    /* eslint-disable no-console */

    fs.readFile('src/index.html', 'utf8', (err, markup) => {

        if(err){
            return console.log(chalk.red.bold(err));
        }
        // cheerio in memory dom
        const $ = cheerio.load(markup);
        $('head').prepend('<link rel="stylesheet" href="/bundle.css">');

        let dir = './production/dist';

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        fs.writeFile('production/dist/index.html', $.html(), 'utf8', (err) => {

            if(err){
                return console.log(chalk.red.bold(err));
            }

            console.log(chalk.green.bold('index.html written to production/dist'));

        });
    });
}