exports.CreateUserDB = function(db,id,data){
    const NextId = require('./nextId');
    const CheckToken = require('./parseClientServerToken');
    let result = null;
    let t = null;
    
    
    return new Promise(async function(resl,reje){
        t = setTimeout(()=>{
            reje({mess:'bad'});
        },5000);
        try {
            const doc = {
                id          :await NextId.NEXT_ID(id,db),
                login       :data.login,
                FirstName   :data.FirstName,
                LastName    :data.LastName,
                Email       :CheckToken.DB_HASH(data.Email),
                Password    :CheckToken.DB_HASH(data.Password),
            }
          
            result = await db.insertOne(doc);

            return resl({mess:'ok',value:doc});
            
        } 
        catch (error) {
            console.log(error);
        }
        finally{
            console.log('ALl ok',result);
        }
    }).then(
        function(value){
            clearTimeout(t);
            console.log("OK",value);
            return value;
        },
        function(error){
            return error;
        }
    )

    //   console.log()
}