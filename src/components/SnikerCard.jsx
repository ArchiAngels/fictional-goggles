import React,{ useState , useEffect} from 'react';
import '../styles/snikerCard.scss';

import { useStore } from 'react-redux';

import SnikersAPI from '../../frontend/getDataFromApi.js';




let SnikerCard = (props)=>{
    // console.log(`CARD ${props.localId} DRAWED`);
    const CARD_NAME = `card${props.localId}`;
    const test = useStore();
    const [state,setState] = useState({imgSRC:null,like:false,addCart:false,title:null,price:null});
    
    useEffect( function(){
        let fromLocalStorage = getCardInfoLocalStorage();
        // console.log(fromLocalStorage,state);
        if(fromLocalStorage == null){
            SnikersAPI(props.localId)
            .then(
                function(data){
                    // console.log("API::",data);
                    if(data.status == 'BAD'){}
                    else{
                        let obj = {
                            imgSRC:data.data.linkIMG_s,
                            like:checkInLocalStorage('like',props.localId),
                            price:data.data.price,
                            title:data.data.title,
                            addCart:checkInLocalStorage('addCart',props.localId)
                        };

                        let objCopy = JSON.parse(JSON.stringify(obj));
                            objCopy['id'] = props.localId;
                            objCopy['isDrawed'] = true;

                            setCardInfoLocalStorage(objCopy);
                            setState(obj);

                        

                        // return props.changeState(props.localId-1,obj);
                    }
                }
            )
        }
        else if(fromLocalStorage.isDrawed == true){
            fromLocalStorage.isDrawed = false;
            setCardInfoLocalStorage(fromLocalStorage);
        }
        else{
            let objCopy = JSON.parse(JSON.stringify(fromLocalStorage));
                objCopy.like = checkInLocalStorage('like',props.localId);
                objCopy.addCart = checkInLocalStorage('addCart',props.localId);
                if(objCopy.isDrawed == true){

                }else{
                    fromLocalStorage.isDrawed = true;
                    setCardInfoLocalStorage(fromLocalStorage);
                    setState(objCopy);
                    
                }
                
        }
        
    })
    function ChangeState(nameState,newValue){

        ChangeLocalStorage(nameState,newValue);
        
        let temp_obj = JSON.parse(JSON.stringify(state));
            temp_obj[nameState] = newValue;
        
        return setState(temp_obj);
    }

    function ChangeLocalStorage(name,value){

        let l = localStorage;

        value == true? add():rem();

        function add(){
            // console.log("ADD",`Page/changeCounter${name}`);
            let size = localStorage.getItem(name);
            
            if(size == null){
                size = [];
                test.dispatch({type:`Page/changeCounter${name}`,Counter:1});
                return l.setItem(name, size.concat(props.localId));
            }else{
                size = size.split(',');
                let isExist = size.map(i => parseInt(i)).indexOf(props.localId);
                    isExist = isExist == -1? size.concat(props.localId): 0;
                test.dispatch({type:`Page/changeCounter${name}`,Counter:isExist.length});
                
                return l.setItem(name,isExist);

            }
            
        }
        function rem(){
            // console.log('REMOVE',`Page/changeCounter${name}`);
            let arr =  l.getItem(name).split(",").map(i => parseInt(i));
            let index = arr.indexOf(props.localId);
            if(index == -1){
                return 0;
            }else{
                let temp_arr = arr.splice(index);
                    temp_arr.shift();
                // console.log(arr,temp_arr);
                    arr = arr.concat(temp_arr); 
                    test.dispatch({type:`Page/changeCounter${name}`,Counter:arr.length});
                return arr.length == 0 ? l.removeItem(name) : l.setItem(name,arr);
            }
            
        }
        // console.log("STATE::",localStorage);
    }
    function checkInLocalStorage(name,id){
        
        let l = localStorage;
        let arr = l.getItem(name);
        let output;
            if(arr == null){
                output = false;
            }else{
                
                arr = arr.split(',').map(i => parseInt(i)).indexOf(id) == -1? false:true;
                output = arr ;

            }
        
        
        return output;
    }
    function setCardInfoLocalStorage(object){
        let l = localStorage;
        let output = {
            id:         object.id,
            imgSRC:     object.imgSRC,
            price:      object.price,
            title:      object.title,
            isDrawed:   object.isDrawed
        };
        output = JSON.stringify(output);
        l.setItem(CARD_NAME,output);
        
    }

    function getCardInfoLocalStorage(){
        let l = localStorage;
        let output = l.getItem(CARD_NAME);
        if(output == null){
            return null;
        }else{
            return JSON.parse(output);
        }
    }
    
    
    return <>
        <div 
            id={`CardNr${props.localId}`} 
            className='SnikerCard'
        >
            <div className='SnikerCard-Top'>
                <div className='Sniker-Img'>
                    <img className={state.imgSRC ? 'Sniker_img-pic':"EMPTY img"} src={state.imgSRC ? state.imgSRC:''}></img>
                    <div className={`${state.like?"Sniker-Like":state.imgSRC ? 'Sniker-Like NotChoosed':"EMPTY noDisplay"}`}> 
                        <span 
                        onClick={()=>{
                            ChangeState('like',! state.like);
                        }}
                        className={`material-icons-outlined ${state.like ? "liked":""}`}>
                            {state.imgSRC ? state.like? "favorite":'favorite_border':"netuIMG"}
                        </span>
                    </div>
                </div>
            </div>
            <div className='SnikerCard-Bottom'>
                <div className={state.title ? 'Sniker-title':'EMPTY title-large'}>
                    <p>{state.title ? state.title : ''}</p>
                </div>
                <div className={state.price ? 'Sniker_bottom-buy':""}>
                    <div className={state.price ? 'Sniker-price':'EMPTY title-small'}>
                        <label htmlFor='#addToCart'>
                            <p>{state.price ? "Цена:":""}</p>
                            <p>{state.price ? state.price:""}</p>
                        </label>
                    </div>
                    {state.price ? "":<div className='EMPTY price'></div>}
                    <div className='Sniker-add'>
                        <div 
                            id={state.price? 'addToCart':""} 
                            className={state.price? state.addCart ? 'Choosed':"NotChoosed":'EMPTY btn-add'}
                            onClick={()=>{
                                ChangeState('addCart',! state.addCart);
                                if(props.changeSumPay){
                                    props.changeSumPay();
                                }
                            }
                        }>
                            <span className="material-icons-outlined">{state.price ? state.addCart ? "done" :"add":""}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
};


export default SnikerCard;