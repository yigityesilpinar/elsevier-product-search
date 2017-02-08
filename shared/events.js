/**
 * Created by Yigit Yesilpinar on 05.02.2017.
 *
 * Register and events (dispatch actions)
 *
 **/

import store from './store';
import  * as actions from './actions';

//  RxJS's Observable injected @Observable, dependency injection
export function registerEventHandlers(Observable) {

    let searchTitleInput = document.getElementById("searchProductTitle");
    // if('oninput' in searchInput) could be checked and fallback with onkeyup could be implemented, but oninput has wide browser support

    // $ indicates it is a stream, Observable EventStream
    let onInputTitle$ = Observable.fromEvent(searchTitleInput, 'input').map(event => event.target.value);
    // subscribe Observer
    onInputTitle$.subscribe((text)=>{
        store.dispatch(actions.searchProductTitle(text));
    });

    let searchKeywordInput = document.getElementById("searchProductKeyword");
    let onInputKeyword$ = Observable.fromEvent(searchKeywordInput, 'input').map(event => event.target.value);
    onInputKeyword$.subscribe((text)=>{
        store.dispatch(actions.searchProductKeyword(text));
    });
}