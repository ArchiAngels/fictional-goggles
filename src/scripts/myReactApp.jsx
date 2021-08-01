import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import "../styles/style.scss";

import MyMain from '../components/MainScreen.jsx';
import ReducerState from '../../reducer.js';

const store = createStore(ReducerState);


ReactDOM.render(
    <Provider store={store}>
        <MyMain />
    </Provider>,
    
    document.getElementById('root')
)