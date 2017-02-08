/**
 * Created by Yigit Yesilpinar on 05.02.2017.
 *
 * Root reducer
 *
 **/

"use strict";

import { combineReducers }      from "redux";
import appReducer from  "./appReducer";
import productReducer, * as productImports from  "./productReducer";

export default combineReducers({
  appState: appReducer,
  products: productReducer
});


// Selector, function prepares data to display in UI
export const getProductByVector = (state = [], filter) =>
    productImports.getProductByVector(state.products, state.appState.allProducts, state.appState.vectors, filter);