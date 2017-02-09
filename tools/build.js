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
process.env.NODE_ENV = 'production';

console.log(chalk.blue.underline.bold('Generating minified bundle for production via Webpack. This will take a moment...  '));

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

  console.log(chalk.green.bold('App has been compiled in production mode and written to /dist'));


  return 0;

});
