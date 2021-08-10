exports.VerifyReg = function(chunk,res,typeAccAction){
    const getEmail = require('../dbCheckEmail');
    const CheckToken = require('./parseClientServerToken');
    return new Promise(async function(myresolve,myreject){
        let parsedObj = JSON.parse(JSON.parse(chunk+''));

        let t = setTimeout(()=>{
            myreject({mess:'time up'});
        },5000);

        // console.log(parsedObj);

        let result = await getEmail(parsedObj,typeAccAction);

        console.log("AAA::",result);

        if(result.mess == 'ok'){
            clearTimeout(t);
            myresolve({mess:result.mess,value:result.value,token:CheckToken.Hash(
                {
                    data:{
                        login:result.value.login,
                        UserAcces:true,
                        codeWord:'TLH'
                    },
                    exp: Math.floor(Date.now() / 1000) + (60 * 60)
                },
                )
            });
        }else if(result.mess == 'bad'){
            clearTimeout(t);
            myreject({mess:result.mess,why:result.why});
        }

    }).then(
        function(value){
            res.json(value);
        },
        function(error){
            res.json(error);
        }
    )
}