import React,{ useState , useEffect} from 'react';
import '../styles/snikerCard.scss';

import SnikersAPI from '../../getDataFromApi.js';




let SnikerCard = (props)=>{
    console.log(`CARD ${props.localId} DRAWED`);
    const [state,setState] = useState({imgSRC:null,like:false,addCart:false,title:null,price:null});
    
    useEffect( function(){

        if(state.imgSRC == null){
            SnikersAPI(props.localId)
            .then(
                function(data){
                    // console.log("API::",data);
                    if(data.status == 'BAD'){}
                    else{
                        let img = (data.data.linkIMG_s);
                        let title = (data.data.title);
                        let price =  (data.data.price);
                        let like =   checkInLocalStorage('like',props.localId);
                        let cart =  checkInLocalStorage('addCart',props.localId);
                        // props.didMount(img,like,price,title,cart);

                        let obj = {
                            imgSRC:img,
                            like:like,
                            price:price,
                            title:title,
                            addCart:cart
                        };

                        setState(obj);

                        // return props.changeState(props.localId-1,obj);
                    }
                }
            )
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
            // console.log("ADD",props.localId);
            let size = localStorage.getItem(name);
            
            if(size == null){
                size = [];
                return l.setItem(name, size.concat(props.localId));
            }else{
                size = size.split(',');
                let isExist = size.map(i => parseInt(i)).indexOf(props.localId);
                return isExist != -1? 0: l.setItem(name, size.concat(props.localId));

            }
            
        }
        function rem(){
            // console.log('REMOVE',props.localId);
            let arr =  l.getItem(name).split(",").map(i => parseInt(i));
            let index = arr.indexOf(props.localId);
            if(index == -1){
                return 0;
            }else{
                let temp_arr = arr.splice(index);
                    temp_arr.shift();
                console.log(arr,temp_arr);
                    arr = arr.concat(temp_arr); 
                return l.setItem(name,arr);
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