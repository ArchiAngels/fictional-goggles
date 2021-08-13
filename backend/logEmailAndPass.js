module.exports = function(chunk,res){
    const getEmail = require('./dbCheckEmail');
    console.log(chunk+'');
    
    return res.json({mess:'ok',to:'/profile'});
    // return 0;
}