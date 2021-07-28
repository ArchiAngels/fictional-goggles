function getApiData(id){
    // console.log('Try to get');
    let url = '/api/snikers/';
    return new Promise(async function(resolve,reject){
        let timeOut = setTimeout(()=>{
            reject({mess:'Time is up'});
        },5000);

        timeOut;

        async function send(url){
            let xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.onload = function(){
                    let j = JSON.parse(xhr.response);
                    return resolve(j);
                }
            xhr.send()
        }
        await send(url+id);
    }).then(
        function(value){
            // console.log('Try to get -- SUCCES');
            // console.log(value)
            return value;
        },
        function(error){
            // console.log('Try to get __ BAD');
            // console.warn(error.mess);
            return {status:'BAD',data:error.mess};
        }
    )
}

export default getApiData;