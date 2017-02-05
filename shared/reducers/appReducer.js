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
        default:{
            return state;
        }
    }
}