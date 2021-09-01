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
            <div className="left-fixed-section">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <p>Name : {user.n}</p>
                            </li>
                            <li>
                                <p>LastName : {user.l}</p>
                            </li>
                            <li>
                                <p>Id : {user.id}</p>
                            </li>
                            <li>
                                <p onClick = {logout} functionality='loginOut'>Logout</p>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
            <div className="right-scroleed-section">
                <Orders></Orders>
            </div>
            
            
        </div>

    </section>
    
}

export default LoggedProfile;