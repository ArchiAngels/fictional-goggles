exports.sendDataToServer = function (url,store,nameCollectStore,state){
    let xhr = new XMLHttpRequest();
    let body = JSON.stringify(getDATA());
    console.log("BODY::",body);
    xhr.open('POST',url);
    xhr.send(body);
    xhr.onload = function(){
        console.log(xhr.response);
        state(xhr.response);
    }

    function getDATA(){
        let s = store.getState();
        let obj = select2(s);
        let result = {};
            for(let item in obj){
                result[item] = obj[item].value;
            }
        // console.log(s,result);

        function select2(item){
            return item[nameCollectStore];
        }
        return JSON.stringify(result);
    }

}