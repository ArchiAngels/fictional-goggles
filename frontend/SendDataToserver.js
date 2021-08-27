exports.sendDataToServer = function (url,store,nameCollectStore,state,type){
    return new Promise(function(resolve,reject){
        let timeUp = setTimeout(()=>{
            reject({mess:'Time up',type:type});
        },5000);

        const mm = require('./Fdb');
        let xhr = new XMLHttpRequest();
        let body = JSON.stringify(type == 'obj' ? getDATAAsObj():getDataAsVar());
        // console.log("BODY::",body);
        xhr.open('POST',url);
        xhr.send(body);
        xhr.onload = function(){
            let r = JSON.parse(xhr.response);
            // console.log(r);
            
            if(r.state == true){
                console.log("OKKK");
                store.dispatch({type:'Token/SetNew',token:r.token});
                store.dispatch({type:'Page/LoginTrue'});

                mm.Save('token',r.token);
                
                clearTimeout(timeUp);
                if(type == 'obj'){
                    // console.log("VIA OBJ");
                    state(r.state);
                    return resolve({mess:'ok',isGodd:true,value:r.value});
                }else{
                    // console.log("VIA NOTOBJ");
                    state(r.state);

                }
                
                // console.log('STORE_SERVER_SEND::',store.getState());
                
                
                // window.location.reload();
            }else{
                console.log("OOOPS");
                store.dispatch({type:'Token/DeleteCurrentToken'});
                store.dispatch({type:'Page/LogoutTrue'});
                // console.log("OOOPS 2",store.getState());
                
                mm.Clear();
                clearTimeout(timeUp);
                return resolve({mess:'bad',isGodd:true,value:r.why});
                // mm.Delete('token');
                // // state(r.state);
                // store.dispatch({type:'Page/LogoutTrue'});
                
            }
        }

        function getDATAAsObj(){
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
        function getDataAsVar(){
            let s = store.getState();
            let obj = select2(s);

            function select2(item){
                return item[nameCollectStore];
            }
            // console.log("NOTOBJ:: ",obj);
            return obj;
        }
    })
}