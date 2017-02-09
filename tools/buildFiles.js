import fs from 'fs';
import chalk from 'chalk';
/* eslint-disable no-console */

function copyFile(source, target, cb) {
    let cbCalled = false;

    let rd = fs.createReadStream(source);
    rd.on("error", function(err) {
        done(err);
    });
    let wr = fs.createWriteStream(target);
    wr.on("error", function(err) {
        done(err);
    });
    wr.on("close", function(ex) {
        done();
    });
    rd.pipe(wr);

    function done(err) {
        if (!cbCalled) {
            cb(err);
            cbCalled = true;
        }
    }
}

if(fs.existsSync("./production")){

    // copy paste, read write, move favicon to /production folder
    copyFile('server/favicon.ico', 'production/favicon.ico', (err)=>{
       if(err){
           return console.log(chalk.red.bold("Could not move/copy file ->  server/favicon.ico"));
       }

        console.log(chalk.green.bold("favicon.ico copied to production/favicon.ico"));
    });

    // copy paste ELSIO-Graph.json to production/data_access/data_store
    copyFile('server/data_access/data_store/ELSIO-Graph.json', 'production/data_access/data_store/ELSIO-Graph.json', (err)=>{
        if(err){
            return console.log(chalk.red.bold("Could not move/copy file ->  ELSIO-Graph.json"));
        }

        console.log(chalk.green.bold("ELSIO-Graph.json copied to production/data_access/data_store/ELSIO-Graph.json"));
    });


    // copy paste production package.json from tools/package.json to production/package.json
    copyFile('tools/package.json', 'production/package.json', (err)=>{
        if(err){
            return console.log(chalk.red.bold("Could not move/copy file -> tools/package.json"));
        }

        console.log(chalk.green.bold("Production package.json copied to production/package.json"));
    });

    // remove unnecessary file from production folder
    fs.unlink('production/srcServer.js',(err)=>{
        if(err){
            // if the file do not exist already it is not a problem
            if(err.code === "ENOENT"){
                return ;
            }

            return console.log(chalk.red.bold("Coud not remove production/srcServer.js"));
        }

        console.log(chalk.green.bold("1 Unnecessary file removed"));
    });
}
else{
    console.log(chalk.red.bold('There is no ./production folder to move files in'));
}



//fs.createReadStream('server/favicon.ico').pipe(fs.createWriteStream('newLog.log'));