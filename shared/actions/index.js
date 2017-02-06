/**
 * Created by Yigit Yesilpinar on 05.02.2017.
 *
 * Action creator functions
 *
 **/

"use strict";

import * as actionTypes from "../constants/actionTypes";

export function searchProductTitle(pattern) {
    return{
        type: actionTypes.SEARCH_PRODUCT_TITLE,
        payload: {
            pattern: pattern
        }
    };
}

// Initialization of loading
export function loadProducts() {
    return{
        type: actionTypes.LOAD_PRODUCTS
    };
}

// If async operation is successful
export function loadProductsSuccess(response) {
    return{
        type: actionTypes.LOAD_PRODUCTS_SUCCESS,
        payload: {
            response: response
        }
    };
}
// If async operation is not successful
export function loadProductsFail(errorResponse) {
    return{
        type: actionTypes.LOAD_PRODUCTS_FAIL,
        payload: {
            errorResponse: errorResponse
        }
    };
}