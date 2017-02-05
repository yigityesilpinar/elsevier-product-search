/**
 * Created by Yigit Yesilpinar on 05.02.2017.
 *
 * Root reducer
 *
 **/

"use strict";

import { combineReducers }      from "redux";
import appReducer from  "./appReducer";


export default combineReducers({
  appState: appReducer
});
