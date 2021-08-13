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
})

module.exports = router