const DB = require ('./db.js');
const express = require('express');
const router = express.Router();

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })
// define the home page route
router.get('/', function (req, res) {
  res.send('api home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About api')
})

router.get('/snikers/:id', function(req,res){
  let GetData = new Promise(async function(resolve,reject){
    let timeStart = new Date();

    let TimeOut = setTimeout(()=>{

        reject({mess:'BAD',code:'Time up',moreCode:'Not response from DB'})
        
    },5000);

    TimeOut;

    let Result = await DB(req.params.id);

    if(Result){
      clearTimeout(TimeOut);

      let timeFinish = new Date();

      resolve({mess:'OK',data:Result,timeOperation:(timeFinish - timeStart)+'ms'});
    }
  })

  GetData.then(
    function(value){
      res.send(value);
    },
    function(error){
      res.send(error)
    }
  )
});

router.post('/userChange',function(req,res){
    const CheckToken = require('./parseClientServerToken');
    const updateUser = require('./dbUserUpdateInfo');
    console.log(req.url);
    req.on('data',function(chunk){
      console.log('POST USER CHANGE ::',chunk+'');
      let J = JSON.parse(chunk+'');
      let result = CheckToken.Parse(J.token,true);
      console.log('PARSED::',result)
      if(result.mess == 'ok'){
        return updateUser(result.data.data.id,J,res,result);
        
      }else{
        return res.send('BAD');
      }
    })
    
})

router.post('/makeOrder',function(req,res){
    const CheckToken = require('./parseClientServerToken');
    const AddNewOrder = require('./dbAddOrder');
    // const updateUser = require('./dbUserUpdateInfo');
    console.log(req.url);
    req.on('data',async function(chunk){

      let t = setTimeout(()=>{
        res.send({mess:'Time is up'});
      },5000);

      console.log('POST NEW ORDER ::',chunk+'');

      let J = JSON.parse(chunk+'');
      let result = CheckToken.Parse(J.token,true);
      let value = result.data.data;

      console.log('PARSED::',result,'\n',value);

      let R = await AddNewOrder({price:J.price,user_id:value.id});

      if(R){
        clearTimeout(t);
        res.send(R)
      }
    })

    // res.send('In building please trust us');

});

// function getOrders(){

// }

module.exports = router