import React, { useState } from 'react';
import BDF from '../../frontend/Fdb.js';
import { useStore } from 'react-redux';
import '../styles/circleCounter.scss';
import ApiSend from '../../frontend/OnlySendSomeData.js';

const CircleCounter = function(props){

    

    let store = useStore();
    let [Name,setName] = useState(props.name);
    let [Active,setActive] = useState(getSelect());
    let [onlyUPDT,setRefresh] = useState(0);

    // console.log('draw only counter',Name,Active);
    let oldStore = {...store.getState()}
    let unsubscribe = store.subscribe(minihandler);


    function minihandler(){
        // console.log("+SUB::",Name);
        if(whatIsHappened(Name)){
            // console.log('NOTHING ::',Name);
            unsubscribe();
            setRefresh(++onlyUPDT);
        }else{
            // console.log("-SUB::",Name);
            unsubscribe();
            setActive(getSelect());
            let token = localStorage.getItem('token');
            if(token != null && token != undefined && token.length > 1){
                token = BDF.tryGetTokenAsJSON(token);
                console.log('SEND token ok',token);
                ApiSend.JustSendUserChange({name:Name,value:getSelect(),token:token});
            }else{
                console.log('NOT SEND bcz not have a token')
            }
            
        }
        
        
        
        
        
    }
    
    function whatIsHappened(){
        let old = select(oldStore);
        let fresh = getSelect();

        return old == fresh
    }
    function select(s){
        if( Name == 'addCart' ){
            return s.HowMuchSelectedItems;
        }else if( Name == 'like' ){
            return s.HowMuchFavoriteItems;
        }
    }
    function getSelect(){
        return select(store.getState());
    }
    return <>
        {Active > 0? <p className='CircleCounter'><span>{Active}</span></p>:''}
    </>
}

export default CircleCounter;