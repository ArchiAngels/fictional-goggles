import React, { useEffect, useState } from 'react';
import { useStore } from 'react-redux';

// import '../styles/SnikerList.scss';
import '../styles/order.scss';

import SnikerCard from '../components/SnikerCard.jsx';
import Empty from './NoItems.jsx';
import Succes from '../components/succesfully.jsx';
import Fail from '../components/failured.jsx';

import APIsend from '../../frontend/OnlySendSomeData.js';
import BDF from '../../frontend/Fdb.js';


function Order(){

    let store = useStore();
    let [oldSnikers,setOldSnikers] = useState(getArrFav());
    let [price,setPrice] = useState(0);
    let [finishScreen,setFinsihSCreen] = useState();
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


    function MakeOrder(){
        let token = localStorage.getItem('token');
            if(token != null && token != undefined && token.length > 1 && price.length > 1){
                console.log('good token');
                token = BDF.tryGetTokenAsJSON(token);
                APIsend.JustSendUserChange('/api/makeOrder',{token:token,price:price},myCallBack);
            }
            else{
                console.log('bad token or price',price,typeof(price));
                setFinsihSCreen(Fail);
            }
        
    }
    function myCallBack(status){
        console.log("FROM CALL BACK::",status);
        if(status.code == 201){
            store.dispatch({type:'Page/changeCounteraddCart',Counter:0});
            BDF.Delete('addCart')
            setFinsihSCreen(Succes);
        }
        else{
            setFinsihSCreen(Fail);
        }
    }
    return <section className='SnikersContent Fortypx'>
        {finishScreen ? finishScreen : 
        <>

            {oldSnikers == 0? 
                <Empty></Empty>
            :
            oldSnikers.map(function(elem){
                    return <SnikerCard key = {elem} localId={elem} changeSumPay = {toPay} ready={go}/>
                })
            }     
            {price == 0?<></>:
            <>
                <div className='Total'>
                    <div className="toPay">
                        Total to pay : {getArrFav == 0 ? 
                                0 
                            : 
                                <span className='price'>{price}</span>
                        }
                    </div>
                    <div className="btn-buy" onClick={MakeOrder}>
                        <p>Buy</p>
                    </div>
                </div>
            </>}
            

        </>}         
            
    </section>
}
export default Order;