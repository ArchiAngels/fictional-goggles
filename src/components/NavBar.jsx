import React from 'react';
import '../styles/navbar.scss';
import {Link} from 'react-router-dom';

import { useState } from 'react';

function NavBar(props){
    let [link,setLink] = useState(1);

    function CurrentLink(aa){
        setLink(aa);
    }
    return (
        <nav>
            <div className='Logo-wrap'>
                <div className='logo-img'></div>
                <div className='logo-text'>
                    <div className='logo-title'>
                        <p>REACT SNEAKERS</p>
                    </div>
                    <div className='logo-subtitle'>
                        <p>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </div>
            <div className='Nav-link-wrap'>
                <ol>
                    {props.items3.map(function(elem){
                        return <Link key={elem.id} className='a_li' to={elem.href} >
                                <li 
                                    className={`brick_li ${link == elem.id ? 'selectedLink':''} ${props.items3.length == elem.id? 'border':''}`}
                                    id={`Link${elem.id}`}
                                    onClick={()=>{
                                        CurrentLink(elem.id);
                                    }}>
                                        <div>
                                            <p>
                                                <span className="material-icons-outlined icons">
                                                    {elem.title}
                                                </span>
                                            </p>
                                        
                                        </div>        
                                </li>
                            </Link>    
                        
                    })}
                </ol>
            </div>
            
        </nav>
    )
}


export default NavBar