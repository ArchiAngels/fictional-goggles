function getEmail(email,type){
    const { MongoClient } = require("mongodb");

    let currentID_,email2;

    // Replace the following with your Atlas connection string                                                                                                                                        
    
    const url = "mongodb+srv://Admin:Admin@cluster0.szzdq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    
    const client = new MongoClient(url);
    
    async function run() {
    
        try {
    
            await client.connect();
    
            console.log("Connected correctly to server");
    
            const database = client.db("MyOwnDB");
            const usersList = database.collection("usersList");

            let queryID = { "myID":"-1" };
                
            currentID_ = await usersList.findOne(queryID);

            let queryEmail;

            if(type == 'register'){
                queryEmail = {"Email":email.Email};
            }else if(type == 'login'){
                const CheckToken = require('./parseClientServerToken');
                queryEmail = {
                    "Email":CheckToken.DB_HASH(email.Email),
                    "Password":CheckToken.DB_HASH(email.Password)
                };
            }

             

            email2 = await usersList.findOne(queryEmail);

            // console.log('HERE::',currentID_.currentID);
            function mm(){
                return new Promise(async function(resl,reje){
                    if(type == 'register'){
                        if(email2 == undefined){
                            const AddNewUser = require('./createNewUser');
                            // console.log('This email is free to use');
                            await AddNewUser.CreateUserDB(usersList,currentID_,email)
                            .then(
                                function(value){
                                    console.log("OK",value);
                                    resl({mess:value.mess,value:value.value})
                                }
                            );
                            
                        }else{
                            // console.log('email already used enter another email');
                            reje({mess:'bad',why:'email has used/busy'});  
                        }
                    }
                    else if(type == 'login'){
                        if(email2 == undefined){
                            console.log("TEST::",email2);
                            reje({mess:'bad',why:'something is wrong'});                            
                        }else{
                            // console.log('email already used enter another email');
                            resl({mess:'ok',value:email2})
                        }
                    }
                }).then(
                    function(value){
                        return value;
                    },
                    function(error){
                        return error;
                    }
                )
            }

            return await mm();
            
    
        } catch (err) {
    
            console.log(err.stack);
            return [];
    
        }
    
        finally {
            // console.log('finally::',currentID_);
            await client.close();
    
        }
    
    }
    
    return run().catch(console.dir);
};

module.exports = getEmail;
