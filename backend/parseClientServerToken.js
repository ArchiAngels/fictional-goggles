exports.Parse = function(token,withData = false){
    token = JSON.parse(token);
    let jwt = require('jsonwebtoken');
    let secret = 'WeaReTH$%#CHAMPI()N5_@#SDA%^>:';

    let result = {};
    
    jwt.verify(token,secret,function(err,decode){
        if(err){
            result.mess = 'bad';
            result.why = err;
            result.state = false;
        }else{
            console.log('DECODE::',decode);
            if(withData){
                result.data = decode.data;
            }
            result.mess = 'ok';
            result.token = token;
            result.state = true;
        }
    });

    return result;

}
exports.Hash = function(data){
    let secret = 'WeaReTH$%#CHAMPI()N5_@#SDA%^>:';
    let jwt = require('jsonwebtoken');

    return jwt.sign({data:data,exp:Math.floor(Date.now() / 1000) + (60 * 60)},secret);
}
exports.DB_HASH = function(data){
    let SECRET_DB = 'ma(5;sf)4mg_54,f;&@#[{}95}56k()]';
    let jwt = require('jsonwebtoken');

    return jwt.sign(data,SECRET_DB);
}
exports.DB_DECODE = function(token){
    let SECRET_DB = 'ma(5;sf)4mg_54,f;&@#[{}95}56k()]';
    let jwt = require('jsonwebtoken');

    let result = {};
    
    jwt.verify(token,SECRET_DB,function(err,decode){
        if(err){
            result.mess = 'bad';
            result.why = err;
            result.state = false;
        }else{
            result.mess = 'ok';
            result.token = token;
            result.state = true;
        }
    });

    return result;
}