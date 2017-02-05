/**
 * Created by Yigit on 5.02.2017.
 *
 * Connect to MongoDB and return the AppModel
 *
 */

"use strict";

import {AppSchema} from "./schemas";
import connectionProvider                                        from "./connectionProvider";
import {serverSettings}                                          from "../settings";

export const getAppModel = async function () {
    try {
        const conn = await connectionProvider(serverSettings.serverUrl, serverSettings.database, serverSettings.dbUser, serverSettings.dbPass);
        // return connection to datas collection from MongoDB
        return conn.model("data", AppSchema);
    } catch (err) {
        throw err;
    }
};
