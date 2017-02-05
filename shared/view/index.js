/**
 * Created by Yigit Yesilpinar on 5.02.2017.
 *
 * View using google Incremental-DOM, render and reRender is subscribed to redux store state changes
 *
 */

import IDOM from  'incremental-dom';
import deepfreeze from 'deep-freeze';

export function render(el, state) {
    // state should not be mutated, deepfreeze the state; throw error if state mutated
    deepfreeze(state);

    IDOM.patch(el, () => {
        appWrapperOpen();
        renderSearch();
        appWrapperClose();
    });
}

// Re-render the necessary DIFF only depending on the actionType
export function reRender(el, state) {

    // freeze the state to be sure its not being mutated
    deepfreeze(state);
    //let actionType = state.lastAction.type;
}

function renderSearch() {
    const statics = ["id", "searchProductTitle", "placeholder","Search in Product Titles", "onfocus","this.placeholder = ''", "onblur","this.placeholder = 'Search in Product Titles'"];
    IDOM.elementOpen('div', '',['id','search__product__div']);
    IDOM.elementOpen('span', '',['class','search__span']);
    IDOM.elementVoid('input', '',statics);
    IDOM.elementClose('span');
    IDOM.elementClose('div');
}

function appWrapperOpen() {
    IDOM.elementOpen('div', '',['id','app']);
    IDOM.elementOpen('div', '',['class','container']);
}

function appWrapperClose() {
    IDOM.elementClose('div');
    IDOM.elementClose('div');
}

