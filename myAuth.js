const getEmail = require('./dbCheckEmail');
const express = require('express');
const router = express.Router();

router.post('/maybe', function(req,res){
    console.log(req.url);
    req.on('data', chunk => {
        
        console.log(`Data chunk available: ${chunk}`)

        new Promise(async function(myresolve,myreject){
            let parsedObj = JSON.parse(JSON.parse(chunk+''));

            let t = setTimeout(()=>{
                myreject({mess:'time up'});
            },5000);

            // console.log(parsedObj);

            let result = await getEmail(parsedObj.Email);

            // console.log(result);

            if(result.mess == 'ok'){
                clearTimeout(t);
                myresolve({mess:'ok'})
            }else if(result.mess == 'bad'){
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
      })
    
})
module.exports = router