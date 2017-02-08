/**
 * Created by Yigit Yesilpinar on 05.02.2017.
 *
 * Initial state for the application
 *
 **/

"use strict";
export const appState = {
    appState: {
        allProducts:[], // keeps the initially loaded products without change (backup products)
        lastAction: null,
        titleSearchPattern: "",
        keywordSearchPattern: "",
        vectors: []
    },
    products: [], // keeps the products to display in UI
};
