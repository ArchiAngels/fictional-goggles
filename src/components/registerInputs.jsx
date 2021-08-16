import React, { useState } from 'react';
import verifyInputs from '../../frontend/verifyInputs';
// import { useStore } from 'react-redux';

export default function RegisterForm(){
    let style = {
        good:{border:"1px solid green"},
        bad:{border:"1px solid red"},
        neutral:{border:''}
    }

    let [err,setErr] = useState({Email: 3,FirstName: 3,LastName: 3,Password: 3,login: 3});

    function handler(name,event){
        let output = 3;
        if(name == 'login'){
            let result = verifyInputs.isNotHaveDangerSymbols(event.target.value);
            output = result.why ? 2 : result.boll ? 1 : 3;
        }else if(name == 'LastName' || name == 'FirstName'){
            let res1 = verifyInputs.isNotHaveDangerSymbols(event.target.value);
            let res2 = verifyInputs.isNotHaveDigits(event.target.value);

            if(res1.boll == true && res2.boll == true){
                output = 1;
            }else if(res1.why || res2.why){
                output = 2;
            }
        }else if(name == 'Email'){
            let result = verifyInputs.isGoodEmail(event.target.value);
                output = result.why ? 2 : result.boll ? 1 : 3;
        }else if(name == 'Password'){
            let result = verifyInputs.isPass(event.target.value);
            output = result.why ? 2 : result.boll ? 1 : 3;
        }
        let newState = {...err}
            newState[name] = output;
            // console.log('newState::',newState,name,output,newState[name]);
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
        <input className='longInput inpData' type="text" placeholder='Login' name='login' defaultValue={err.login.value || ''} 
        onChange={(event)=>{handler('login',event)}}
        style={{border:giveStyle(err.login)}}
        />
            <br/><br/>
        <input className='customLeft inpData' type="text" placeholder='First Name' name='FirstName' defaultValue={err.FirstName.value || ''}
        onChange={(event)=>{handler('FirstName',event)}} 
        style={{border:giveStyle(err.FirstName)}}
        />

            <span className="EmptySpace"></span>

        <input className='customRight inpData' type="text" placeholder='Last Name' name='LastName' defaultValue={err.LastName.value || ''} 
        onChange={(event)=>{handler('LastName',event)}} 
       
        style={{border:giveStyle(err.LastName)}}
        />
            <br/><br/>
        <input className='longInput inpData' type="text" placeholder='E-mail' name='Email' defaultValue={err.Email.value || ''}  
        onChange={(event)=>{handler('Email',event)}} 
        
        style={{border:giveStyle(err.Email)}}
        />
            <br/><br/>
        <input className='longInput inpData' type="text"  placeholder='Password' name='Password' defaultValue={err.Password.value || ''} 
        onChange={(event)=>{handler('Password',event)}} 
        
        style={{border:giveStyle(err.Password)}}
        />
    </>
}