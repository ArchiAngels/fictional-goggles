import React, { useState } from 'react';
import '../styles/loginForm.scss';
import { useStore } from 'react-redux';
import FormRegister from '../components/registerInputs.jsx';
import LoginInForm from '../components/FormLogin.jsx';
import CheckAllDataInForm from '../../frontend/myOwnCheckForm.js';
import Send from '../../frontend/SendDataToserver.js';
import FB from '../../frontend/Fdb.js';

let objRegister = {
    title:"Create Account",
    subTitle:'Already have an account?',
    submit:'Sign up'
}
let objLogin = {
    title:"Welcome",
    subTitle:'Don\'t have an account?',
    submit:'Sign in'
}

export default function LoginForm(){


    const formRedux = useStore();
    const [formState,setForm] = useState(select(formRedux.getState()));
    const [res,setRes] = useState('');
    // console.log('DRAW::',res);


    let dataFromServer;

    function select(item){
        return item.CurrentFormAuth;
    }

    async function HandlerSubmit(event){
        // console.log(event);
        if(CheckAllDataInForm(event,formRedux) == 1){
            let s = formRedux.getState();
            console.log("SEND");
            dataFromServer = await Send.sendDataToServer(`/auth/${select(s)}`,formRedux,'authForm',setRes,'obj');
            // console.log("loginForm OUTPUT::",dataFromServer);
            let value = dataFromServer.value;
            // console.log('DATA::',value);
            FB.Save('user',{
                n:value.FirstName,
                l:value.LastName,
                id:value.id,
                like:value.like,
                addCart:value.addCart
            });
            save('like',value.like);
            save('addCart',value.addCart);
            formRedux.dispatch({type:'Page/changeCounterlikeAndCounter',CounterLike:LengthOfItem(value.like),CounterFavorite:LengthOfItem(value.addCart)});
            function LengthOfItem(str){
                // console.log('ASD::',str,str.split(',').length);
                if(str != '' && str != null){
                    return str.split(',').length;
                }else{
                    return 0;
                }
                
            }
            // setTimeout(()=>{
            //     console.log(formRedux.getState());
            // },300)
            function save(key,data){
                if(data != '' && data != null){
                    FB.SimpleSave(key,data);
                }
            }
        }else{
            console.log("NOT SEND");
        }
        
        // TODO send to server and check this data maybe we already have this email
        
    }

    
    

    function SwitchForm(){
        
        formRedux.dispatch({type:'Page/clearAuthForm'});
        formRedux.dispatch({type:'Page/SwitchForm'});

        let s = formRedux.getState();

        setForm(select(s));

    }

    function suscess(res){
        if(res == 'ok'){
            setTimeout(()=>{
                window.location.reload();
            },300)
            return <h4>{res}</h4>
        }else if(res == 'bad'){
            return <h4>{res}</h4>
        }else{
            return ''
        }
    }

    return <div className='LoginFormWrap'>
        <div className="wrapForm">
            <div className="titleWrap">
                <h2>{formState == 'register'?objRegister.title:objLogin.title}</h2>
                <p>{formState == 'register'?objRegister.subTitle:objLogin.subTitle} <a onClick={()=>{
                    SwitchForm()
                }}>{formState != 'register'?objRegister.submit:objLogin.submit}</a></p>
            </div>
            <div className="form">
                <form action='/auth/maybe' method='POST' onSubmit={(event)=>{
                    event.preventDefault();
                    HandlerSubmit(event)
                }}>

                    {formState == 'register'?<FormRegister propsRedux = {formRedux}></FormRegister>:<LoginInForm></LoginInForm>}
                        
                    <div className='SubmitBtnForm'>
                        <input type="submit" value={formState == 'register'?objRegister.submit:objLogin.submit}/>
                        <span className="material-icons-outlined arrowRight">east</span>
                    </div>
                </form>
                {/* {suscess(res)} */}
            </div>
            {formState == 'register'?<div className="TermsOfUse">
                                        <div className='box-check'></div>
                                        <p>I have read and agree the <a>rules</a></p>
                                    </div>:''}
            
        </div>
    </div>
}