const registrEmail = require('./backend/regEmail');
const logEmail = require('./backend/logEmailAndPass');
const express = require('express');
const router = express.Router();

router.post('/register', function(req,res){
    // console.log(req.url);
    req.on('data', chunk => {
        
        console.log(`Data chunk available: ${chunk}`)
        return registrEmail.VerifyReg(chunk,res);
        
    })
    
});
router.post('/login', function(req,res){
    // console.log(req.url);
    req.on('data', chunk => {
        
        console.log(`Data chunk available: ${chunk}`)
        return logEmail(chunk,res);
        
    })
    
});
module.exports = router