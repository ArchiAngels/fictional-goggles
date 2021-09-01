import React, { useState } from 'react';

import BDF from '../../frontend/Fdb.js';
import send from '../../frontend/getSomethingFromServer.js';

import OneRow from './orderHistroy1row.jsx';

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
    return <>
        <p>Orders from DataBase to user {userId}</p>
        <div>
            {cards.length > 0?
                cards.map((item,index) => <OneRow key={'TABLE'+index} item={item} cards={cards}></OneRow>):<p>History orders is empty</p>
            }
        </div>
        
    </>
}