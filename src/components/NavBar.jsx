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

    let oldLink = select(test.getState());


    function getCurrentActive(){
        let w = window.location.pathname;
        let output = links.filter((item) =>{
            if(item.href == w){
                return item.id
            } 
        })

        // console.log(w,links,output);
        let result = output.length == 0 ? 1 : output[0].id;
        test.dispatch({type:'Page/changeCurrentWindow',idOfPage:result});
        return result;

    }
    function CurrentLink(aa){
        test.dispatch({type:'Page/changeCurrentWindow',idOfPage:aa});
        

        
        // setLink(select(test.getState()))
    }

    let unsubscribe = test.subscribe(miniHandler)
    
    function miniHandler(){
        let fresh = select(test.getState());
        if(oldLink == fresh){
            // console.log('NAVBAR NOTHING',oldLink,fresh);
        }else{
            // console.log('NAVBAR CHANGE',oldLink,fresh);
            unsubscribe();

            let s = test.getState();
            // console.log(s);
            setLink(select(s));
            
        }
    }

    function select(state){
        return state.currentPage;
    }
    

    return (
        <section className='NavBarMainWrap'>
            <nav className='NavBar'>
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
        </section>
    )
}


export default NavBar