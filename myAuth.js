const registrEmail = require('./backend/regEmail');
const express = require('express');
const router = express.Router();

router.post('/maybe', function(req,res){
    console.log(req.url);
    req.on('data', chunk => {
        
        console.log(`Data chunk available: ${chunk}`)
        return registrEmail.VerifyReg(chunk,res);
        
    })
    
})
module.exports = router