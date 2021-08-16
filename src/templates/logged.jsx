import React, { useState } from 'react';
import '../styles/logged.scss';
import FB from '../../frontend/Fdb';

function LoggedProfile(props){
    function logout(){
        console.log('LogOuted');
        FB.Delete('token');
        props.store.dispatch({type:'Token/DeleteCurrentToken'});
        props.store.dispatch({type:'Page/LogoutTrue'});
        props.loginOut(false);

    }
    let user = FB.Read('user');
    return<section className='logged_main_wrap'>

        <div>
            <header>
                <p>Name : {user.n}</p>
                <p>LastName : {user.l}</p>
                <p>Id : {user.id}</p>
            </header>
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