const express = require('express');
const path = require('path');
const router = express.Router();

let links = ['/','/order-list','/favorite','/profile'];


router.get('*',function(req,res){
    console.log(req.url);
    let result = links.filter(item=>req.url == item);
    if(result.length == 1){
        res.sendFile(path.join(__dirname,'../','index.html')) 
    }else{
        res.sendFile(path.join(__dirname,'../','404.html')) 
    }
})

module.exports = router