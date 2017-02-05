/**
 * Created by Yigit Yesilpinar on 5.02.2017.
 *
 *
 *
 */

import {getAppModel} from "../../data_access/modelFactory";
import fs from  "fs";
import path from 'path';
import {Types}from 'mongoose';

async function saveAppData(AppModel, appData) {

    const {versionFamiliesById, worksById, doisById, vectorsByName} = appData;


    const appDataToSave = new AppModel({
        _id: Types.ObjectId(),
        versionFamiliesById: versionFamiliesById,
        worksById: worksById,
        doisById:  doisById,
        vectorsByName:  vectorsByName
    });


    return await appDataToSave.save()
        .then(function (data) {
            if (data) {
                // saved successfully
                return true;
            }
        })
        .catch(function (err) {
            if (err) {
                console.error((`Error occurred saving Contact ${err}`));
                return false;
            }
        });
}




function stripComments(content) {

    let regex = /^\/\*[^\/]+\/\s{/g;
    // escape the $ char from var, e.g $type => type, mongoose cause problem
    content = content.replace(/"\$/g, '"');
    let matches = content.match(regex);
    if(matches && matches.length > 0){
        return content.replace(regex, "{");
    }

    return content
}

async function seedData() {
    try{
        const AppModel = await getAppModel();
        const appData = await AppModel.find({}).exec();

        // If Database collection is empty, create the collection using ELSIO-Graph.json
        if (!appData.length) {
            let fileLocation = path.resolve(__dirname, '../../data_access/data_store/ELSIO-Graph.json');
            fs.readFile(fileLocation, 'utf8', async function (err, data) {
                if (err){
                    throw err;
                }
                const appData = JSON.parse(stripComments(data));
                await saveAppData(AppModel, appData);
            });

        }


    } catch (err) {
        throw err;
    }

}

export default seedData();