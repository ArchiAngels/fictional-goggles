exports.sendDataToServer = function (url,store,nameCollectStore,state,type){
    const mm = require('./Fdb');
    let xhr = new XMLHttpRequest();
    let body = JSON.stringify(type == 'obj' ? getDATAAsObj():getDataAsVar());
    console.log("BODY::",body);
    xhr.open('POST',url);
    xhr.send(body);
    xhr.onload = function(){
        let r = JSON.parse(xhr.response);
        console.log(r);
        mm.Save('token',r.token);
        if(r.mess == 'ok'){
            state(r.mess);
            store.dispatch({type:'Page/LoginTrue'});
            console.log('STORE_SERVER_SEND::',store.getState());
            // window.location.reload();
        }
    }

    function getDATAAsObj(){
        let s = store.getState();
        let obj = select2(s);
        let result = {};
            for(let item in obj){
                result[item] = obj[item].value;
            }
        console.log(s,result);

        function select2(item){
            return item[nameCollectStore];
        }
        return JSON.stringify(result);
    }
    function getDataAsVar(){
        let s = store.getState();
        let obj = select2(s);

        function select2(item){
            return item[nameCollectStore];
        }

        return obj;
    }

}