function UpdateInfo(id,obj,res){
    // return res.json({id:id,data:obj,all:result});
    const { MongoClient } = require("mongodb");

 

    // Replace the following with your Atlas connection string                                                                                                                                        
    
    const url = "mongodb+srv://Admin:Admin@cluster0.szzdq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    
    const client = new MongoClient(url);
    
    async function run() {
    
        try {
    
            await client.connect();
    
            console.log("Connected correctly to server");
    
            const database = client.db("MyOwnDB");
            const UserList = database.collection("usersList");

            // let allElemInCollection;

            let query = { "id":id };
            // console.log('SearchById',query,'\n');
            
            // allElemInCollection =  await UserList.findOne(query);
            const updateDoc = {
                $set: valueToSet(),
            };
            // console.log('FIND::',allElemInCollection);
            // const options = { upsert: true };
            
            await UserList.updateOne(query, updateDoc);
            function valueToSet(){
                let o = {};
                    o[obj.name] = obj.value;
                return o;
            }
            // let query2 = { "id":id };
            // let result2 = await UserList.findOne(query2);
            // console.log('RESULT 2::',result2);
            return res.json({mess:'OK'});
    
        } catch (err) {
    
            console.log(err.stack);
            return [];
    
        }
    
        finally {
            await client.close();
    
        }
    
    }
    
    return run().catch(console.dir);
};

module.exports = UpdateInfo;
