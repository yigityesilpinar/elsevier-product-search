/**
 * Created by Yigit Yesilpinar on 5.02.2017.
 *
 * View using google Incremental-DOM, render and reRender is subscribed to redux store state changes
 *
 */

import IDOM from  'incremental-dom';
import deepfreeze from 'deep-freeze';
import {renderSearch} from './components/search/index';
import {renderProducts, preRenderProducts} from './components/product/products';
import {filterByTitle} from './components/filter/filter';
import * as actionTypes from '../constants/actionTypes';
import {getFilteredProducts} from '../reducers';

export function render(el, state) {
    // state should not be mutated, deepfreeze the state; throw error if state mutated
    deepfreeze(state);

    // render initial view
    IDOM.patch(el, () => {
        appWrapperOpen();
        renderSearch(IDOM);
        preRenderProducts(IDOM);
        appWrapperClose();
    });

}

// Re-render only the necessary DIFF depending on the actionType
export function reRender(el, state) {

    // freeze the state to be sure its not being mutated, define all properties writable:false
    deepfreeze(state);
    let {lastAction} = state.appState;
    const {products} = state;
    let productListEl = document.getElementById("productList");

    // when products are loaded from the server
    if(lastAction.type === actionTypes.LOAD_PRODUCTS_SUCCESS){

        // render only the changed part (patch)
        IDOM.patchInner(productListEl, () => {
            renderProducts(products, IDOM);
        });
    }

    // when there is a change in Title/Subtitle search input
    if(lastAction.type === actionTypes.SEARCH_PRODUCT_TITLE){
        const filteredProducts = filterByTitle(state);
        // render only the changed part (patch)
        IDOM.patchInner(productListEl, () => {
            renderProducts(filteredProducts, IDOM);
        });
    }

    if(lastAction.type === actionTypes.SEARCH_PRODUCT_KEYWORD){
        let filter = lastAction.payload.pattern;
        // Using selector getFilteredProducts
        const filteredProducts = getFilteredProducts(state, filter);
        IDOM.patchInner(productListEl, () => {
            renderProducts(filteredProducts, IDOM);
        });
    }

}


function appWrapperOpen() {
    IDOM.elementOpen('div', '',['id','app']);
    IDOM.elementOpen('div', '',['class','container']);
}

function appWrapperClose() {
    IDOM.elementClose('div');
    IDOM.elementClose('div');
}

