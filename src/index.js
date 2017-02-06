/**
 * Created by Yigit Yesilpinar on 05.02.2017.
 *
 * Entry index.js
 *
 **/
import 'babel-polyfill';
import '../shared/assets/styles/styles.css';
import '../shared/assets/fonts/Pacifico.ttf';

import store from '../shared/store';
import {render, reRender} from '../shared/view';
import {registerEventHandlers} from '../shared/events';

// Import RxJS 's Observable and necessary operators to implement Observable Pattern for Events and Observable Reducers(Epics) with redux-observable
import {Observable} from 'rxjs/Rx';
// add map operator to the Observable class
import "rxjs/add/operator/map";
// add filter operator to the Observable class
import "rxjs/add/operator/filter";
import "rxjs/observable/fromEvent";
import "rxjs/add/operator/mergeMap";

// subcribe to Redux store
store.subscribe(() =>
    reRender(document.body, store.getState())
);

render(document.body, store.getState());
// inject RxJS's Observable to use in event handling
registerEventHandlers(Observable);