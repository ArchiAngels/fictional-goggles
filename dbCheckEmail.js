function getEmail(email){
    const AddNewUser = require('./backend/createNewUser');
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

            let queryEmail = {"Email":email.Email};

            email2 = await usersList.findOne(queryEmail);

            console.log('HERE::',currentID_.currentID);
            function mm(){
                return new Promise(async function(resl,reje){
                    if(email2 == undefined){
                        console.log('This email is free to use');
                        await AddNewUser.CreateUserDB(usersList,currentID_,email)
                        .then(
                            function(value){
                                console.log("OK",value);
                                resl(value)
                            }
                        );
                        
                    }else{
                        console.log('email already used enter another email');
                        reje('bad');
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
            console.log('finally::',currentID_);
            await client.close();
    
        }
    
    }
    
    return run().catch(console.dir);
};

module.exports = getEmail;
