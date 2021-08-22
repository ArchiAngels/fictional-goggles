import React, { useEffect, useState } from 'react';
import '../styles/SnikerList.scss';
import SnikerCard from '../components/SnikerCard.jsx';

import Empty from './NoItems.jsx';

function Order(){

    let [oldSnikers,setOldSnikers] = useState(getArrFav());
    let [price,setPrice] = useState(0);
    let howMuch = getArrFav().length;
    // useEffect(function(){
    //     toPay();
    // })
    
    let totalPay = 0;
    function takeOnliDigits(str){
        let reqx = /\d+\.\d+/;
        return parseFloat(str.match(reqx))
    }
    function toPay(){
        let actualyCart = getArrFav();
            if(actualyCart == 0){
                actualyCart = []
            }
        totalPay = 0;
        actualyCart.map(function(id){
            let l = localStorage;
                totalPay += takeOnliDigits(JSON.parse(l.getItem('card'+id)).price);
        })
        return setPrice(`${totalPay.toFixed(2)} $`);
    }
    function getArrFav(){
        let l = localStorage.getItem('addCart');
            l = l == null? 0 : l == ''? 0: l.split(',').map(i => parseInt(i));
        return l;
    }
    function go(){
        howMuch -= 1;
        // console.log('GO::',howMuch);
        if(howMuch == 0){
            toPay();
        }
    }
    return <section className='SnikersContent Fortypx'>

        {oldSnikers == 0? 
            <Empty></Empty>
        :
        oldSnikers.map(function(elem){
                return <SnikerCard key = {elem} localId={elem} changeSumPay = {toPay} ready={go}/>
            })
        }     
        <div className='Total'>
            <div className="toPay">
                Total to pay : {getArrFav == 0 ? 
                        0 
                    : 
                        <span className='price'>{price}</span>
                }
            </div>
            <div className="btn-buy">
                <p>Buy</p>
            </div>
        </div>
         
            
    </section>
}
export default Order;