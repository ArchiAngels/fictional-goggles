import React, { useState } from 'react';
import verifyInputs from '../../frontend/verifyInputs';


export default function loginInForm(){
    let style = {
        good:{border:"1px solid green"},
        bad:{border:"1px solid red"},
        neutral:{border:''}
    }

    let [err,setErr] = useState({Email:3,Password:3});

    function handler(name,event){
        let output = 3;
        
        if(name == 'Email'){
            let result = verifyInputs.isGoodEmail(event.target.value);
                output = result.why ? 2 : result.boll ? 1 : 3;
        }else if(name == 'Password'){
            let result = verifyInputs.isPass(event.target.value);
            output = result.why ? 2 : result.boll ? 1 : 3;
        }
        let newState = {...err}
            newState[name] = output;
        return setErr(newState);

    }


    function giveStyle(code){
        let output;
        if(code == 1){
            output = style.good;
        }else if(code == 2){
            output = style.bad;
        }else{
            output = style.neutral;
        }
        return output.border;
    }


    return <>
    <input className='longInput' type="text" placeholder='E-mail' name='Email' defaultValue='admin@adim.admin'
        onChange={(event)=>{handler('Email',event)}}
        style={{border:giveStyle(err.Email)}}
    />
        <br/><br/>
    <input className='longInput' type="password" placeholder='Password' name='Password' defaultValue='admin123'
        onChange={(event)=>{handler('Password',event)}}
        style={{border:giveStyle(err.Password)}}
    />
    </>
}