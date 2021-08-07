function getEmail(email){
    const { MongoClient } = require("mongodb");

 

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

            let queryEmail = {"Email":email};

            email2 = await usersList.findOne(queryEmail);

            console.log('HERE::',currentID_);
            if(email2 == undefined){
                console.log('This email is free to use');
                return Promise.resolve({mess:'ok'});
            }else{
                console.log('email already used enter another email');
                return Promise.resolve({mess:'bad'});
            }
            

            

            
    
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
