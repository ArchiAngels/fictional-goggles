exports.VerifyReg = function(chunk,res){
    const getEmail = require('../dbCheckEmail');
    return new Promise(async function(myresolve,myreject){
        let parsedObj = JSON.parse(JSON.parse(chunk+''));

        let t = setTimeout(()=>{
            myreject({mess:'time up'});
        },5000);

        // console.log(parsedObj);

        let result = await getEmail(parsedObj);

        console.log("AAA::",result);

        if(result == 'ok'){
            clearTimeout(t);
            myresolve({mess:'ok'})
        }else if(result == 'bad'){
            clearTimeout(t);
            myreject({mess:'Email already is used enter please another email'});
        }

    }).then(
        function(value){
            res.json(value.mess);
        },
        function(error){
            res.json(error.mess);
        }
    )
}