/**
 * Created by Yigit Yesilpinar on 05.02.2017.
 *
 * Entry index.js
 *
 **/
import 'babel-polyfill';
import '../shared/assets/styles/styles.css';
import '../shared/assets/fonts/Pacifico.ttf';

import {store} from '../shared/store';
import {render, reRender} from '../shared/view';
import {registerEventHandlers} from '../shared/events';

// subcribe to Redux store
store.subscribe(() =>
    reRender(document.body, store.getState())
);

render(document.body, store.getState());
registerEventHandlers();