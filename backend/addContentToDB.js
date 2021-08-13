function AddDataToBD(linkIMG_s,linkIMG_l,price,title){
    const NextId = require('./nextId');
    const { MongoClient } = require("mongodb");

 

    // Replace the following with your Atlas connection string                                                                                                                                        
    
    const url = "mongodb+srv://Admin:Admin@cluster0.szzdq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    
    const client = new MongoClient(url);
    let currentID_;
    let SnikersList;
    
    async function run() {
    
        try {
    
            await client.connect();
    
            console.log("Connected correctly to server");
    
            const database = client.db("MyOwnDB");
            SnikersList = database.collection("SnikersList");

            
            let query = { "myID":"-1" };
            // console.log('SearchById',query,'\n');
                
            currentID_ = await SnikersList.findOne(query);

            // console.log("CURRENT ID::",currentID_);

            const doc = { 
                myId:await NextId(currentID_,SnikersList),
                linkIMG_s:'/sniker10.jpg',
                linkIMG_l:'/sniker10_l.jpg',
                price:"189.99 $",
                title:"Мужские Кроссовки Nike Kyrie Flytrap IV",

            };

            const result = await SnikersList.insertOne(doc);
        
            // console.log(
        
            //   `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
        
            // );


            


    
        } catch (err) {
    
            console.log(err.stack);
            return [];
    
        }
    
        finally {
            console.log('FINALLY we did it');

            await client.close();
    
        }
    
    }
    
    return run().catch(console.dir);
};


AddDataToBD();
module.exports = AddDataToBD;
