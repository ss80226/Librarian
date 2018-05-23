import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from 'redux-logger';
import {Provider} from 'react-redux';

import Main from 'components/Main.jsx';
import {searchType, search, searchForm} from 'states/search-reducers.js';
// import {searchText, post, postForm, postItem} from 'states/post-reducers.js';
// import {todoForm, todo} from 'states/todo-reducers.js';
import {main} from 'states/main-reducers.js';
import {history} from 'states/history-reducers.js'
import 'bootstrap/dist/css/bootstrap.css';

window.onload = function() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(combineReducers({searchType, main, searchForm, search, history}), composeEnhancers(applyMiddleware(thunkMiddleware/*, loggerMiddleware*/)));

    ReactDOM.render(
        <Provider store={store}>
        <Main/>
    </Provider>, document.getElementById('root'));
};
