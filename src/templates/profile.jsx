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
    let copyOfStore;
    useEffect(function(){
        // console.log(store.getState());
        
        if(select() == true){
            console.log('ALREAD LOGIN IN');
        }else{
            let token = L.Read('token');
            if(token != null && token != undefined){
                console.log("TOKEN::",token);
                store.dispatch({type:'Token/SetNew',token:token});
                // console.log(store.getState());
                Send.sendDataToServer('/auth/login/token',store,'token',setLogged,'notObj');
            }else{
                // console.log('wait');
                copyOfStore = {...store.getState()};
                unsubscribe = store.subscribe(handlerMini);
            }
        }
        
    })

    function handlerMini(){
        // console.log('unsubscribe');
        unsubscribe();
        setTimeout(()=>{
            if(whatIsHappened() == true){
                if(select() == false){
                
                    // console.log('STATE::',logged,count);
                    setCount(++count);
                }else if(select() == true){
                    setLogged(select());
                }
            }
            
            
        },100);        
    }
    function whatIsHappened(){
        let FreshState = store.getState();
        // console.log(copyOfStore,FreshState);
        // console.log(copyOfStore.currentPage,FreshState.currentPage);
        return copyOfStore.currentPage == FreshState.currentPage
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