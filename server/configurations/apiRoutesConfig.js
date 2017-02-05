/**
 * Created by Yigit Yesilpinar on 5.02.2017.
 *
 * Top level route configuration
 *
 */

"use strict";

import cors from "cors";
import productRoutes from '../routes/productRoutes';

export default function ConfigApiRoutes(app) {
    app.use(cors());
    app.use(productRoutes);
}
