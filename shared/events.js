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

    let searchInput = document.getElementById("searchProductTitle");
    // if('oninput' in searchInput) could be checked and fallback with onkeyup could be implemented, but oninput has wide browser support

    // $ indicates it is a stream, Observable EventStream
    let onInput$ = Observable.fromEvent(searchInput, 'input').map(event => event.target.value);
    // subscribe Observer
    onInput$.subscribe((text)=>{
        store.dispatch(actions.searchProductTitle(text));
    });
}