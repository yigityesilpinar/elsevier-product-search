/**
 * Created by Yigit Yesilpinar on 05.02.2017.
 *
 * Redux Store
 *
 **/

import {createStore, applyMiddleware} from 'redux';
import appReducer from './reducers';
import {appState} from './constants/initialState';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics/';
import {loadProducts} from './actions/';
const epicMiddleware = createEpicMiddleware(rootEpic);
// apply epicMiddleware to handle async operations with Observable pattern
const store = createStore(appReducer, appState, applyMiddleware(epicMiddleware));
// dispatch initial load action to load products from the server
store.dispatch(loadProducts());

export default store;




