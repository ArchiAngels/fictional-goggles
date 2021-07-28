import React from 'react';
import {BrowserRouter as RouterReact} from 'react-router-dom';

import '../styles/mainScreen.scss';

import NavBar from '../components/NavBar.jsx';
import Router from '../components/Router.jsx';


let MyMain = (props)=>{
    return <div className='MainContent'>
        <RouterReact>
            <NavBar items3={props.items2}></NavBar>
            <Router></Router>
        </RouterReact>
        
    </div>
};


export default MyMain;