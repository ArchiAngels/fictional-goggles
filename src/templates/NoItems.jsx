import React from 'react';
import '../styles/noItem.scss';

import {Link} from 'react-router-dom';

import { useStore } from 'react-redux';

export default function NoItem(props){

    let test = useStore();

    function ChangeCurrentPage(){
        test.dispatch({type:'Page/changeCurrentWindow',idOfPage:1})
    }
 
    return <div className='WrapEmptyBlock'>
       <div className="contentEmpty">
        <div className="emojiEmpty">
                <p>&#128543;</p>
            </div>
            <p className='TitleEmpty'>Head title</p>
            <p className='ParagraphEmpty'>Paragraph</p>
            <Link to='/' key='linkEmpty' style={{textDecoration:'none'}} onClick={ChangeCurrentPage}>
                <div className="btnEmpty">
                    <span className="material-icons-outlined margin">west</span>
                    <p className='margin'>Go back</p>
                </div>
            </Link>
            
       </div>
    </div>
}