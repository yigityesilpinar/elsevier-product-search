/**
 * Created by Yigit Yesilpinar on 6.02.2017.
 *
 * Root epic (epic is kind of an Observable reducer, takes action stream and returns action stream
 * (action$, [store])=>(action$)
 *
 **/

import { combineEpics } from 'redux-observable';
import { productEpic, vectorEpic } from './productEpic';

export const rootEpic = combineEpics(
    productEpic,
    vectorEpic
);