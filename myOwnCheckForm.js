
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

    console.log(ResultObjBoll,ResultObjBoll.pass.length / (ResultObjBoll.pass.length + ResultObjBoll.failed.length));

    // console.log(select(store.getState()));



    ResultObjBoll.pass.forEach(function(item){
        store.dispatch({type:'Page/switchErrorAuthForm',name:item.name,value:1})
    });

    ResultObjBoll.failed.forEach(function(item){
        if(item.el.value.trim() == ''){
            store.dispatch({type:'Page/switchErrorAuthForm',name:item.el.name,value:3})
        }else{
            store.dispatch({type:'Page/switchErrorAuthForm',name:item.el.name,value:2})
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
                result = isNotHaveDangerSymbols(value);
                result = value.length > maxLength ? {boll:false,why:'out of limit of email length'}:result;

            }else if(name == 'FirstName' || name == 'LastName'){
                let maxLength = 255;
                let dangerNot = isNotHaveDangerSymbols(value);
                let digitsNot = isNotHaveDigits(value);
                    if(dangerNot.boll == true && digitsNot.boll == true){
                        result = value.length > maxLength ? {boll:false,why:'out of limit of email length'}:{boll:true};
                    }else{
                        result = {boll:false,why: dangerNot.why || digitsNot.why };
                    }
            }else if(name == 'Email'){
                let maxLength = 320;
                result = isGoodEmail(value);
                result = value.length > maxLength ? {boll:false,why:'out of limit of email length'}:result;
            }
            else if(name == 'Password'){
                result.boll = true;
            }
             
            

            result.boll ? ResultObjBoll.pass.push(input) : ResultObjBoll.failed.push({el:input,why:result.why});

            
        }else{
            // console.log('SIZE IS NOT GOOD',value.length);
            ResultObjBoll.failed.push({el:input,why:'bad length of value'});
        }
    }

    function isNotHaveDangerSymbols(string){
        let reqx = /\W/gi;
        let output = string.match(reqx);
            if(output == null){
                // ZERO dangerSymbols
                // console.log('NO PROBLEMS danger');
                return {boll:true};
                
            }else{
                //  > 0 problems
                // console.log(`PROBLEM:: "${output}" length:${output.length}`);
                return {boll:false,why:'Bad field \nMaybe you did use special characters? it\'s not allowed'};
            }

    }

    function isNotHaveDigits(string){
        let reqx = /\d/g;
        let output = string.match(reqx);
            if(output == null){
                // Zero digits
                // console.log('NO PROBLEMS digits');
                return {boll:true};
            }else{
                // Have digits
                // console.log(`PROBLEM:: "${output}" length:${output.length}`);
                return {boll:false,why:'Bad field \nMaybe you did use numbers? it\'s not allowed '};
            }
    }

    function isGoodEmail(string){
        // console.log('VERIFY EMAIL START');
        let reqx = /^\w+([.-]\w+)?@(\w+[.-])+\w+$/g;
        let output = string.match(reqx);
            // console.log('MM::',output);
            if(output == null){
                // Problems
                // console.log(`PROBLEM:: "${output}"`);
                return {boll:false,why:'Bad email adress \nMaybe you did use something hot'};
            }else{
                // console.log(`GOOD :: "${output}" length:${output.length}`);
                return {boll:true};
            }
    }

}