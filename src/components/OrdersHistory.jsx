import React, { useState } from 'react';
import BDF from '../../frontend/Fdb.js';
import send from '../../frontend/getSomethingFromServer.js';
import SnikerCard from './SnikerCard.jsx';

export default function Orders(){
    let [cards,setCards] = useState([]);
    let [userId,setUserId] = useState(select());

    function select(){
        return BDF.Read('user').id;
    }
    getAllOrders();
    async function getAllOrders(){
        if(cards.length > 0){
            // console.log('HAVE CARDS:',cards);
        }else{
            // console.log('START FETCHING DATA');
            let result = await send('/api/getOrders/'+userId);
            let arr = JSON.parse(result.value).value;
                arr.map(item =>{
                    return item.items = item.items.split(',').map(i => parseInt(i));
                })
            setCards(arr);
            // console.log("CARDS::",cards,arr);
            // console.log('FINISH FETCHING DATA');
        }
    }
    let styles = {
        display:"flex",
        flexWrap:'wrap',
        border:"1px solid #000"
    }
    let important = {
        fontWeight:'bold'
    }
    return <>
        <p>Orders from DataBase to user {userId}</p>
        <div>
            {cards.length > 0?
                cards.map(item => 
                    <div key={'CARD'+cards.indexOf(item)+item.items.join(',')} >
                        <p onClick={(event)=>{
                            console.log('click::',event.target)
                        }}>Order <span style={important}>#{item.id}</span> price: <span style={important}>{item.cost}</span></p>
                        <div style={styles}>
                            {item.items.map(card => {
                                let key = ''+card+cards.indexOf(item);
                                // console.log("NEED SPAWN CARD::",card,'KEY::',key);
                                return <SnikerCard key={key} localId={card} notLike={true} notAddCart={true}/>
                            })}
                        </div>
                        
                    </div>)
                :<p>History orders is empty</p>
            }
        </div>
        
    </>
}