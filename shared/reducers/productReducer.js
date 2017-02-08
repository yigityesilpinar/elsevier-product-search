/**
 * Created by Yigit Yesilpinar on 05.02.2017.
 *
 * Product reducer Separated from App reducer, its state is products array
 *
 **/

import * as actionTypes from '../constants/actionTypes';
import deepFreeze from 'deep-freeze';
import {searchWithVector} from '../lib/searchWithVector';
export default function productReducer(state = [], action){
    // Force state to be IMMUTABLE
    deepFreeze(state);
    // state is products array in product reducer
    switch(action.type) {
        case actionTypes.SEARCH_PRODUCT_KEYWORD:
        {
            let {pattern} = action.payload;
            return state;
        }
        case actionTypes.LOAD_PRODUCTS_SUCCESS:
        {
            // products loaded from server will be the initial state for the products reducer
            return action.payload.response.data;
        }
        default:{
            return state;
        }
    }
}

// Selector, function prepares data to display in UI
//
export const getFilteredProducts = (state = [], vectors, filter) =>{
    if(!filter || filter=== "" || filter===" ") { return state;}
    // state is products array for this selector
    // simple deep copy of products
    let products = JSON.parse(JSON.stringify(state));

    return  searchWithVector(products, vectors, filter);
};