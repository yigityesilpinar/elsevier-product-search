/**
 * Created by Yigit Yesilpinar on 05.02.2017.
 *
 * Action creator functions
 *
 **/

"use strict";

import * as actionTypes from "../constants/actionTypes";
// import productApi from "../api-services/productApi";
export function searchProductTitle(pattern) {
    return{
        type: actionTypes.SEARCH_PRODUCT_TITLE,
        payload: {
            pattern: pattern
        }
    };
}