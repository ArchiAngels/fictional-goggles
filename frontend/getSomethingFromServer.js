module.exports = function(url){
    return new Promise(async function(resolve,reject){
        let timeOut = setTimeout(()=>{
            reject({mess:'Time up'});
        },5000)
        let xhr = new XMLHttpRequest();
        xhr.open('GET',url);
        xhr.send();
        xhr.onload = function(){
            console.log('RESPONSE :L:',xhr.response);
            clearTimeout(timeOut);
            resolve({mess:'ok',value:xhr.response});
        }
    })
}