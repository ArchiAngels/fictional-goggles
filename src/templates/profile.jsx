import React, {useState , useEffect} from 'react';
import L from '../../frontend/Fdb.js';
import Send from '../../frontend/SendDataToserver.js';
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
    useEffect(async function(){
        // console.log(store.getState());
        
        if(select() == true){
            // console.log('ALREAD LOGIN IN',store.getState());
        }else{
            // console.log('NOT YET LOGIN IN',store.getState());
            let token = localStorage.getItem('token');
            if(token != null && token != undefined){
                // console.log("STEP 1");
                token = L.tryGetTokenAsJSON(token);
                // console.log("TOKEN::",token);
                store.dispatch({type:'Token/SetNew',token:token});
                // console.log(store.getState());
                let dataFromServer = await Send.sendDataToServer('/auth/login/token',store,'token',setLogged,'notObj');
                // console.log(dataFromServer);
                if(dataFromServer.mess == 'bad'){
                    // console.log("mda");
                    // unsubscribe();
                    initSubscribe();
                    // copyOfStore = {...store.getState()};
                    // unsubscribe = store.subscribe(handlerMini);
                }
            }else{
                // console.log('wait');
                // console.log("STEP 2");
                // console.log('NOT YET LOGIN IN 2',store.getState());
                initSubscribe();
            }
        }
        
    })
    function initSubscribe(){
        copyOfStore = {...store.getState()};
        unsubscribe = store.subscribe(handlerMini);
    }
    function handlerMini(){
        // console.log('unsubscribe');
        unsubscribe();
        setTimeout(()=>{
            if(whatIsHappened() == true){
                let happend = select();
                if(happend == false){
                    // console.log("SKIP");
                    // console.log('STATE::',logged,count);
                    setCount(++count);
                }else if(happend == true){
                    // console.log("LOG IN");
                    setLogged(happend);
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
        {/* <p>looged</p> */}
    </>
}

export default Profile;