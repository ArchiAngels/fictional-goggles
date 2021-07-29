import React from 'react';
import '../styles/SnikerList.scss';
import SnikerCard from '../components/SnikerCard.jsx';

function Favorite(){
    let l = localStorage.getItem('like');
        l = l == null? 0 : l == ''? 0: l.split(',').map(i => parseInt(i));
    let arrFavorites = l;
    return <div className='SnikersContent'>

        {arrFavorites == 0? 
            <p>Empty</p>
        :
            arrFavorites.map(function(elem){
                return <SnikerCard key = {elem} localId={elem}/>
            })
        }       
            
    </div>
}

export default Favorite;