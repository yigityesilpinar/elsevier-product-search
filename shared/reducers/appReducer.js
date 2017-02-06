/**
 * Created by Yigit Yesilpinar on 05.02.2017.
 *
 * App reducer
 *
 **/

import * as actionTypes from '../constants/actionTypes';
import deepFreeze from 'deep-freeze';

export default function appReducer(state = [], action){
    // Force state to be IMMUTABLE
    deepFreeze(state);
    switch(action.type) {
        case actionTypes.SEARCH_PRODUCT_TITLE:
        {
           return state;
        }
        case actionTypes.LOAD_PRODUCTS:
        {
            return state;
        }
        case actionTypes.LOAD_PRODUCTS_SUCCESS:
        {
            const loadedProducts = action.payload.response.data;

            return Object.assign({}, state,
                {products: loadedProducts , lastAction:action});
        }
        case actionTypes.LOAD_PRODUCTS_FAIL:
        {
            return state;
        }
        default:{
            return state;
        }
    }
}