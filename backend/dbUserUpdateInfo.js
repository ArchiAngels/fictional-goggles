function UpdateInfo(id,obj,res,result){
    return res.json({id:id,data:obj,all:result});
    // const { MongoClient } = require("mongodb");

 

    // // Replace the following with your Atlas connection string                                                                                                                                        
    
    // const url = "mongodb+srv://Admin:Admin@cluster0.szzdq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    
    // const client = new MongoClient(url);
    
    // async function run() {
    
    //     try {
    
    //         await client.connect();
    
    //         console.log("Connected correctly to server");
    
    //         const database = client.db("MyOwnDB");
    //         const SnikersList = database.collection("usersList");

    //         let allElemInCollection;

    //         if(id > 0){
    //             let query = { "myId":id };
    //             console.log('SearchById',query,'\n');
                
    //             return allElemInCollection =  await SnikersList.findOne(query);
    //         }else{
    //             return allElemInCollection =  await SnikersList.find().toArray();
    //         }
    
    //     } catch (err) {
    
    //         console.log(err.stack);
    //         return [];
    
    //     }
    
    //     finally {
    
    //         await client.close();
    
    //     }
    
    // }
    
    // return run().catch(console.dir);
};

module.exports = UpdateInfo;
