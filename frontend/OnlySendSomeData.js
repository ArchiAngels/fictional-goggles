exports.JustSendUserChange = function(url,body,callback){
    body = JSON.stringify(body);
    return new Promise(function(resolve,reject){
        let t = setTimeout(()=>{
            reject({mess:'Time up',code:504});
        },5000);

        let xhr = new XMLHttpRequest;
        xhr.open('POST',url);
        xhr.send(body);
        xhr.onload = function(){
            if(xhr.status == 200){
                clearTimeout(t);
                resolve({mess:'resolve',value:xhr.response,code:201});
            }else{
                clearTimeout(t);
                resolve({mess:'reject',value:xhr.response,code:500});
            }
        }
    }).then(
        function(value){
            console.log(value);
            callback(value);
        },
        function(err){
            console.log(err);
            callback(err);
        }
    )
}