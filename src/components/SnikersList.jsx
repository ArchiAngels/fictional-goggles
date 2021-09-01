import React from 'react';
import '../styles/SnikerList.scss';
import SnikerCard from './SnikerCard.jsx';


let SnikersList = ()=>{
    let emptyArray = [1,2,3,4,5,6,7,8,9,10,11,12];
    // let emptyArray = [1,2];

    // let emptyArray = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    return <>
        <div id='SnikersContent'>
            <div className='SnikersTopNav'>
                <p>Все кроссовки</p>
                <div className='SnikersSearchWrpa'>
                    <label htmlFor="SnikerInput">
                        <span className="material-icons-outlined">search</span>
                    </label>
                    <input id='SnikerInput' type='text' placeholder="Поиск.."></input>
                </div>
            </div>
            <div className='SnikersContent'>

                {emptyArray.map(function(elem,index){
                    let key = ''+index+elem;
                    // console.log("WOW KEY::",key);
                    return <SnikerCard key = {key} localId={elem}/>
                })}       
                    
            </div>
        </div>
    </>;
};


export default SnikersList;