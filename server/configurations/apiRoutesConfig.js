/**
 * Created by Yigit Yesilpinar on 5.02.2017.
 *
 * Top level route configuration
 *
 */

"use strict";

import cors from "cors";
import routes from '../routes/';

export default function ConfigApiRoutes(app) {
    app.use(cors());
    app.use(routes);
}
