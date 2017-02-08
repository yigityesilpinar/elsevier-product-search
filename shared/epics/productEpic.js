/**
 * Created by Yigit Yesilpinar on 6.02.2017.
 *
 * Product epic, handles async actions for products
 *
 **/

import * as actionTypes from '../constants/actionTypes';
import {handleLoad, handleVectorLoad} from '../api-services/productApi';

// redux-observable epic
export const productEpic =  (action$) =>{
    // Handle async loading of products
    return action$.ofType(actionTypes.LOAD_PRODUCTS)
        .mergeMap( action => handleLoad());
};


// handle async loading of vectors
export const vectorEpic =  (action$) =>{
    // Handle async loading of products
    return action$.ofType(actionTypes.LOAD_VECTORS)
        .mergeMap( action => handleVectorLoad());
};
