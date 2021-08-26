import React, { useState } from 'react';
import '../styles/logged.scss';
import FB from '../../frontend/Fdb';
import Orders from '../components/OrdersHistory.jsx';

function LoggedProfile(props){
    function logout(){
        console.log('LogOuted');
        // console.log(props.store.getState());
        FB.Clear();
        props.store.dispatch({type:'Page/LogoutTrue'});
        
       
        props.loginOut(false);
        // console.log(props.store.getState());

    }
    let user = FB.Read('user');
    // console.log(props.store.getState());
    return<section className='logged_main_wrap'>

        <div>
            <header>
                <p>Name : {user.n}</p>
                <p>LastName : {user.l}</p>
                <p>Id : {user.id}</p>
            </header>
            <Orders></Orders>
            <nav>
                <ul>
                    <li>
                        <p onClick = {logout} functionality='loginOut'>Logout</p>
                    </li>
                </ul>
            </nav>
        </div>

    </section>
    
}

export default LoggedProfile;