const DB = require ('./db.js');
const express = require('express');
const router = express.Router();

router.post('/maybe',function(req,res){
    console.log(req.url);
    req.on('data', chunk => {
        console.log(`Data chunk available: ${chunk}`)
      })
    setTimeout(()=>{
        res.send('OK')
    },1500)
})
module.exports = router