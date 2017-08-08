import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './reducers'
import AppleBasket from './containers/AppleBasket';

const store = createStore(reducer, applyMiddleware(thunk));

// Render the main component into the dom
ReactDOM.render(
    <Provider store={store}>
        <AppleBasket />
    </Provider>
    , document.getElementById('app')
);
