import React, { useState } from 'react';
import { useStore } from 'react-redux';
import '../styles/circleCounter.scss';

const CircleCounter = function(props){

    

    let store = useStore();
    let [Name,setName] = useState(props.name);
    let [Active,setActive] = useState(getSelect());

    // console.log('draw only counter',Name,Active);
    let oldStore = {...store.getState()}
    let unsubscribe = store.subscribe(minihandler);


    function minihandler(){
        if(whatIsHappened(Name)){
        }else{
            unsubscribe();
            setActive(getSelect())
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