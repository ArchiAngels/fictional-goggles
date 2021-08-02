import React , { useEffect, useState } from 'react';
import '../styles/navbar.scss';
import {Link} from 'react-router-dom';
import Counter from './counter.jsx';
import { useStore } from 'react-redux';

let links = [
    {id:1,title:`home`,href:'/'},
    {id:2,title:`shopping_cart`,href:'/order-list',conter:'addCart'},
    {id:3,title:`favorite_border`,href:'/favorite',conter:'like'},
    {id:4,title:`account_circle`,href:'/profile'},
]



function NavBar(){
    // console.log("DRAWED");
    let test = useStore();
    let [link,setLink] = useState(getCurrentActive());
    let [Active,setActive] = useState(1);


    function getCurrentActive(){
        let w = window.location.pathname;
        let output = links.filter((item) =>{
            if(item.href == w){
                return item.id
            } 
        })

        // console.log(w,links,output);
        test.dispatch({type:'Page/changeCurrentWindow',idOfPage:output[0].id});
        return output[0].id;

    }

    function CurrentLink(aa){
        test.dispatch({type:'Page/changeCurrentWindow',idOfPage:aa});
        // setLink(select(test.getState()))
    }

    let unsubscribe = test.subscribe(() => {
        // console.log('subscribed');
        function select(state){
            return state.currentPage;
        }
        let s = test.getState();
        // console.log(s);
        setLink(select(s));
        unsubscribe();
        // console.log(Active);
        setActive(++Active);
    } )
    

    

    return (
        <nav>
            <div id={Active} className='Logo-wrap'>
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
                    {links.map(function(elem){
                        return <Link key={elem.id} className='a_li' to={elem.href} >
                                <li 
                                    className={`brick_li ${link == elem.id ? 'selectedLink':''} ${links.length == elem.id? 'border':''}`}
                                    id={`Link${elem.id}`}
                                    onClick={()=>{
                                        CurrentLink(elem.id);
                                    }}>
                                        <div>
                                            {elem.conter ?<Counter name={elem.conter}></Counter>:null}
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