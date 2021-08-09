module.exports = function(chunk,res){
    console.log(chunk+'');
    return res.json('ok');
    // return 0;
}