import React,{useState} from 'react';
import SnikerCard from './SnikerCard.jsx';
import '../styles/orderHistory1row.scss';

function OneRow(props){
    let [showDetail,setShowDetails] = useState(false);

    return <div key={'CARD'+props.cards.indexOf(props.item)+props.item.items.join(',')} className='RowWithCards' >
            <p onClick={(event)=>{
                setShowDetails(!showDetail);
            }}
                className='ShowDetails'
            >Order <span className='important'>#{props.item.id}</span> price: <span className='important'>{props.item.cost}</span></p>
            {showDetail?<>
                <div className='WrapWithCards'>
                    {props.item.items.map(card => {
                        let key = ''+card+props.cards.indexOf(props.item);
                        // console.log("NEED SPAWN CARD::",card,'KEY::',key);
                        return <SnikerCard key={key} localId={card} notLike={true} notAddCart={true}/>
                    })}
                </div>
            </>:<></>}
            
        </div>
    
}

export default OneRow;