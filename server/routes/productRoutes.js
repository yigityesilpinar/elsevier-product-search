/**
 * Created by Yigit Yesilpinar on 5.02.2017.
 *
 * Router for the backend
 *
 */
/* eslint-disable no-console */
import {Router} from "express";
import cors     from "cors";
import {getAppModel} from "../data_access/modelFactory";
import  {getProducts} from "../controllers/productController";

import '../data_access/data_store/seedData';
const productRouter = Router();

productRouter.route("/api/appData")
    .get(cors(), async function (req, res) {
        try{
            const AppModel = await getAppModel();
            const appData = await AppModel.find({}).exec();

            if (!appData.length) {
                return res.status(404).send(`Application data is not found`);
            }

            // Handle appData and return as products array
            res.status(200).json(appData.pop());
        } catch (err) {
            throw err;
        }
    });

productRouter.route("/api/products")
    .get(cors(), async function (req, res) {
        try{
        const App = await getAppModel();
        const appData = await App.find({}).exec();

        if (!appData.length) {
            return res.status(404).send(`Application data is not found`);
        }

        // Handle appData and return as products array
        const products = getProducts(appData.pop());
        res.status(200).json(products);
    } catch (err) {
    throw err;
    }
    });


export default productRouter;


