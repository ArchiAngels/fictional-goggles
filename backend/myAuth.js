const registrEmail = require('./regEmail');
const CheckToken = require('./parseClientServerToken');
const express = require('express');

const router = express.Router();

router.post('/register', function(req,res){
    // console.log(req.url);
    req.on('data', chunk => {
        
        console.log(`Data chunk available: ${chunk}`)
        return registrEmail.VerifyReg(chunk,res,'register');
        
    })
    
});
router.post('/login', function(req,res){
    // console.log(req.url);
    req.on('data', chunk => {
        
        console.log(`Data chunk available: ${chunk}`)
        return registrEmail.VerifyReg(chunk,res,'login');
        
    })
    
});
router.post('/login/token', function(req,res){
    // console.log(req.url);
    req.on('data', chunk => {
        
        console.log(`Data chunk available: ${chunk} ${typeof(JSON.parse(chunk))}`)
        let r = CheckToken.Parse(chunk);
        console.log(r);
        return res.json(r);
        
    })
    
});
module.exports = router