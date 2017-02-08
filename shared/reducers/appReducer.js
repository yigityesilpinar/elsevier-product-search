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
            let {pattern} = action.payload;

            return Object.assign({}, state,
                {titleSearchPattern: pattern , lastAction:action});
        }
        case actionTypes.SEARCH_PRODUCT_KEYWORD:
        {
            let {pattern} = action.payload;

            return Object.assign({}, state,
                {keywordSearchPattern: pattern , lastAction:action});

        }
        case actionTypes.LOAD_PRODUCTS:
        {
            return Object.assign({}, state, {lastAction:action});
        }
        case actionTypes.LOAD_PRODUCTS_SUCCESS:
        {
            let {response} = action.payload;
            // KEEP the backup products at state.appState, for UI kept in state.products handled with prodcutReducer
            return Object.assign({}, state, {lastAction:action, allProducts:response.data});
        }
        case actionTypes.LOAD_PRODUCTS_FAIL:
        {
            return Object.assign({}, state, {lastAction:action});
        }

        case actionTypes.LOAD_VECTORS:
        {
            return Object.assign({}, state, {lastAction:action});
        }
        case actionTypes.LOAD_VECTORS_SUCCESS:
        {
            return Object.assign({}, state, {lastAction:action, vectors: action.payload.response.data});
        }
        case actionTypes.LOAD_VECTORS_FAIL:
        {
            return Object.assign({}, state, {lastAction:action});
        }
        default:{
            return state;
        }
    }
}