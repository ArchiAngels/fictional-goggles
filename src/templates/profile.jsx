import React, {useState , useEffect} from 'react';
import L from '../../frontend/Fdb';
import Send from '../../frontend/SendDataToserver';
import { useStore } from 'react-redux';
import LoginForm from './loginForm.jsx';

import Logged from './logged.jsx';
function Profile(){
    let store = useStore();

    let [logged,setLogged] = useState(select());
    let [count,setCount] = useState(0);

    // 
    let unsubscribe;
    useEffect(function(){
        // console.log(store.getState());
        
        if(select()){
            console.log('ALREAD LOGIN IN');
        }else{
            let token = L.Read('token');
            if(token != null && token != undefined){
                // console.log("TOKEN::",token);
                store.dispatch({type:'Token/SetNew',token:token});
                // console.log(store.getState());
                Send.sendDataToServer('/auth/login/token',store,'token',setLogged,'notObj');
            }else{
                unsubscribe = store.subscribe(handlerMini);
            }
        }
        
    })

    function handlerMini(){
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
    return <>
        {logged ?<Logged store={store} loginOut={setLogged}/> :<LoginForm/>}
    </>
}

export default Profile;