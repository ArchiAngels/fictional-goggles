exports.JustSendUserChange = function(url,body){
    body = JSON.stringify(body);
    return new Promise(function(resolve,reject){
        let t = setTimeout(()=>{
            reject({mess:'Time up'});
        },5000);

        let xhr = new XMLHttpRequest;
        xhr.open('POST',url);
        xhr.send(body);
        xhr.onload = function(){
            if(xhr.status == 200){
                clearTimeout(t);
                resolve({mess:'resolve',value:xhr.response});
            }else{
                clearTimeout(t);
                resolve({mess:'reject',value:xhr.response});
            }
        }
    }).then(
        function(value){
            console.log(value)
        },
        function(err){
            console.log(err)
        }
    )
}