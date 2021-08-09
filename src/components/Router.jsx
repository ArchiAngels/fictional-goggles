import React , {useState} from 'react';
import { useStore } from 'react-redux';
import {Switch,Route} from 'react-router-dom';
import Home from '../templates/home.jsx';
import NoMatch from '../templates/NoMatch.jsx';
import Order from '../templates/Order.jsx';
import Favorite from '../templates/favorite.jsx';
import Profile from '../templates/profile.jsx';
import Logged from '../templates/logged.jsx';

function View(props){
    

    let store = useStore();

    let [logged,setLogged] = useState(select());
    let [count,setCount] = useState(0);

    let unsubscribe = store.subscribe(handlerMini);

    function handlerMini(){
        // console.log('subs');
        unsubscribe();
        setTimeout(()=>{
            if(logged == false){
                setLogged(select());
                // console.log('STATE::',logged,count);
                setCount(++count);
            }
            
        },100);
        
        
    }

    function select(){
        let s = store.getState();
        // console.log('ROUTE::',s,s.isLogged)
        return s.isLogged;
    }

    
    return <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route exact path="/order-list">
                <Order />
            </Route>

            <Route exact path="/favorite">
                <Favorite />
            </Route>

            <Route exact path="/profile">
                {logged ? <Logged />:<Profile /> }
            </Route>

            <Route path="*">
                <NoMatch />
          </Route>
        </Switch>
}

export default View;