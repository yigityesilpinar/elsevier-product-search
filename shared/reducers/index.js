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
export const getFilteredProducts = (state = [], filter) =>
    productImports.getFilteredProducts(state.products, state.appState.vectors, filter);