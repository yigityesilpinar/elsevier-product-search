/**
 * Created by Yigit Yesilpinar on 05.02.2017.
 *
 * Redux Store
 *
 **/

import {createStore} from 'redux';
import appReducer from './reducers';
import {appState} from './constants/initialState';

export const store = createStore(appReducer, appState);




