module.exports = function(chunk,res){
    console.log(chunk+'');
    return res.json({mess:'ok',to:'/profile'});
    // return 0;
}