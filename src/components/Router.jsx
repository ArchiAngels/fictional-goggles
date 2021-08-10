import React  from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from '../templates/home.jsx';
import NoMatch from '../templates/NoMatch.jsx';
import Order from '../templates/Order.jsx';
import Favorite from '../templates/favorite.jsx';
import Profile from '../templates/profile.jsx';

function View(props){
        
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
                <Profile />
            </Route>

            <Route path="*">
                <NoMatch />
          </Route>
        </Switch>
}

export default View;