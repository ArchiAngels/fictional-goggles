import React from 'react';
import ReactDOM from 'react-dom';
import iteems from '../variables2/items.js';

import "../styles/style.scss";

import MyMain from '../components/MainScreen.jsx';


ReactDOM.render(
    <MyMain items2={iteems}/>,
    document.getElementById('root')
)