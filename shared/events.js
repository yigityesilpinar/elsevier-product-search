/**
 * Created by Yigit Yesilpinar on 05.02.2017.
 *
 * Register and events (dispatch actions)
 *
 **/

import {store} from './store';
import  * as actions from './actions';
import {listen} from './lib/events';

export function registerEventHandlers() {
    listen('keyup', '#searchProductTitle', event => {
        store.dispatch(actions.searchProductTitle(event.target.value));
    });
}
