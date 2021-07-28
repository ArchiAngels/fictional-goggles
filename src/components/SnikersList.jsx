import React from 'react';
import '../styles/SnikerList.scss';
import SnikerCard from '../components/SnikerCard.jsx';

let SnikersList = ()=>{
    let emptyArray = [1,2,3,4,5,6,7,8,9,10,11,12];
    // let emptyArray = [1,2];

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

                {emptyArray.map(function(elem){
                    return <SnikerCard key = {elem} localId={elem}/>
                })}       
                    
            </div>
        </div>
    </>;
};


export default SnikersList;