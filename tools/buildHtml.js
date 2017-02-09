import fs from 'fs';
import cheerio from 'cheerio';
import chalk from 'chalk';

/* eslint-disable no-console */

fs.readFile('src/index.html', 'utf8', (err, markup) => {

  if(err){
    return console.error(err);
  }
  // cheerio in memory dom
  const $ = cheerio.load(markup);
  $('head').prepend('<link rel="stylesheet" href="/bundle.css">');

  let dir = './dist';

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  fs.writeFile('dist/index.html', $.html(), 'utf8', (err) => {

    if(err){
      return console.log(err);
    }

    console.log(chalk.green.bold('index.html written to /dist'));

  });
});
