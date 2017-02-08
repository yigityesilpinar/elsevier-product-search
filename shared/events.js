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
    let onInputKeyword$ = Observable.fromEvent(searchKeywordInput, 'input').map(event => event.target);
    onInputKeyword$.subscribe((element)=>{
        store.dispatch(actions.searchProductKeyword(element.value.toLowerCase()));
        // keyword search is always in lowerCase, remove leading spaces (auto-complete visual issue)
        element.value = element.value.toLowerCase().replace(/^\s+$/g,'');
    });

    // Add onkeyup event listener for searchProductKeyword, only listen for RIGHT ARROW
    let onKeyUpKeyword$ = Observable.fromEvent(searchKeywordInput, 'keyup').filter(event => event.keyCode === 39);
    onKeyUpKeyword$.subscribe((event)=>{
        let vectorAutoComplete = document.getElementById("vectorAutoComplete");
        // if auto complete text exist, complete with RIGHT ARROW
        if(vectorAutoComplete != null){
            let input = document.getElementById("searchProductKeyword");
            if(input.getAttribute("data-match")!=" "){
                input.value = input.getAttribute("data-match");
            }
        }
    });
}