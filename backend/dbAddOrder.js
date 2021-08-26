function NewOrder(data){
    const { MongoClient } = require("mongodb");
    let id = require('./nextId');
    let addUser = require('./dbAddOrderToUserArr');

    let currentID_,currentUser_;

    // Replace the following with your Atlas connection string                                                                                                                                        
    
    const url = "mongodb+srv://Admin:Admin@cluster0.szzdq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    
    const client = new MongoClient(url);
    
    async function run() {
    
        try {
    
            await client.connect();
    
            console.log("Connected correctly to server");
    
            const database = client.db("MyOwnDB");
            const orderList = database.collection('Orders');
            const usersList = database.collection("usersList");

            let queryUser = {'id':data.user_id};
                currentUser_ = await usersList.findOne(queryUser);

            let queryID = { "myID":"-1" };
                
            currentID_ = await orderList.findOne(queryID);
                currentID_ = await id.NEXT_ID(currentID_,orderList);

            // console.log('ORDERS API::',currentID_);       
            // console.log('ORDERS API data::',data);       
            
            let DOC = {
                id:         currentID_,
                user_id:    data.user_id,
                items:      currentUser_.addCart,
                cost:       data.price
            }

            let result = await orderList.insertOne(DOC);
            // console.log("SUCCES :: ",result.insertedId);

            let result2 = await addUser.AddOrderId(usersList,data.user_id,currentID_);
            // console.log('SUCCES 2::',result2);
            return result2;
    
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

module.exports = NewOrder;
