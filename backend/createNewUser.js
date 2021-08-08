exports.CreateUserDB = function(db,id,data){
    const NextId = require('../backend/nextId');
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
                Email       :data.Email,
                Password    :data.Password,
            }
          
            result = await db.insertOne(doc);

            return resl({mess:'ok'});
            
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
            console.log("OK",value.mess);
            return value.mess;
        },
        function(error){
            return error.mess;
        }
    )

    //   console.log()
}