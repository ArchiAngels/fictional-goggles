import checkForm from './frontend/verifyInputs';
export default function HandlerSubmit(event,store){
    // console.log('CHECK ALL DATA');
    // CHECK ALL DATA


    let ResultObjBoll = {
        pass:[],
        failed:[]
    }
    
    let arrInputs = select2(event);

    arrInputs.forEach(function(item){
        return VerifyString(item);
    });

    function select(data){
        return data.authForm;
    }


    // console.log(select(store.getState()));



    ResultObjBoll.pass.forEach(function(item){
        store.dispatch({type:'Page/switchErrorAuthForm',name:item.name,value:{value:item.value,code:1}})
    });

    ResultObjBoll.failed.forEach(function(item){
        if(item.el.value.trim() == ''){
            store.dispatch({type:'Page/switchErrorAuthForm',name:item.el.name,value:{value:item.value,code:3}})
        }else{
            store.dispatch({type:'Page/switchErrorAuthForm',name:item.el.name,value:{value:item.value,code:2}})
        }
        
    })

    // console.log(select(store.getState()));;


    function select2(data){
        let test = data.target.children;
        let arrOnlyInputs = [];
        for(let i=0;i<test.length;i++){
            if(test[i].tagName == 'INPUT'){
                arrOnlyInputs.push(test[i]);
            }
        }
        return arrOnlyInputs;
    }

    function VerifyString(input){
        let name = input.name;
        let value = input.value;
        let result = {};

        value = value.trim();

        if(value.length > 1){
            // console.log('value VERIFY',value);

            if(name == 'login'){
                let maxLength = 64;
                result = checkForm.isNotHaveDangerSymbols(value);
                result = value.length > maxLength ? {boll:false,why:'out of limit of email length'}:result;

            }else if(name == 'FirstName' || name == 'LastName'){
                let maxLength = 255;
                let dangerNot = checkForm.isNotHaveDangerSymbols(value);
                let digitsNot = checkForm.isNotHaveDigits(value);
                    if(dangerNot.boll == true && digitsNot.boll == true){
                        result = value.length > maxLength ? {boll:false,why:'out of limit of email length'}:{boll:true};
                    }else{
                        result = {boll:false,why: dangerNot.why || digitsNot.why };
                    }
            }else if(name == 'Email'){
                let maxLength = 320;
                result = checkForm.isGoodEmail(value);
                result = value.length > maxLength ? {boll:false,why:'out of limit of email length'}:result;
            }
            else if(name == 'Password'){
                result = checkForm.isPass(value);
            }
             
            

            result.boll ? ResultObjBoll.pass.push(input) : ResultObjBoll.failed.push({el:input,why:result.why});

            
        }else{
            // console.log('SIZE IS NOT GOOD',value.length);
            ResultObjBoll.failed.push({el:input,why:'bad length of value'});
        }
    }

    console.log(ResultObjBoll,ResultObjBoll.pass.length / (ResultObjBoll.pass.length + ResultObjBoll.failed.length));
    return ResultObjBoll.pass.length / (ResultObjBoll.pass.length + ResultObjBoll.failed.length);

}