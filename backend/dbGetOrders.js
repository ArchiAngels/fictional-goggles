function getOrders(user_id){
    const { MongoClient } = require("mongodb");

    const url = "mongodb+srv://Admin:Admin@cluster0.szzdq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(url);

    async function run() {
        try {
            await client.connect();

            const database = client.db("MyOwnDB");
            const orderList = database.collection('Orders');
            // query for movies that have a runtime less than 15 minutes
            const query = { 'user_id':user_id };

            const options = {
                // sort returned documents in ascending order by title (A->Z)
                // sort: { title: 1 },
            // Include only the `title` and `imdb` fields in each returned document
                projection: { _id: 0, id: 1, items: 1, cost: 1 },
            };
            
            function mm(){
                return new Promise(async function(resolve,reject){
                    let timeout = setTimeout(()=>{
                        reject({mess:'bad',why:'time out'})
                    },5000);

                    let cursor = await orderList.find(query, options);

                    if ((await cursor.count()) === 0) {
                        clearTimeout(timeout);
                        console.log("No documents found!");
                        resolve({mess:'bad',why:'not found'});
                    }else{
                        console.log("Documents found!");
                        clearTimeout(timeout);
                        cursor = await cursor.toArray();
                        resolve({mess:'ok',value:cursor})
                    }
                }).then(
                        function(value){
                            // console.log("VALUE::",value);
                            return value;
                        },
                        function(error){
                            // console.log("error::",error);
                            return error
                        }
                    )
            }
            
            return await mm();

            // print a message if no documents were found
            

            // console.log(await cursor.toArray());
            // return Promise.resolve(cursor.toArray());

            // replace console.dir with your callback to access individual elements
            // await cursor.forEach(console.dir);
        } catch(error){
            console.log(error.stack);
        }
        finally {
            await client.close();
        }
    }
    return run().catch(console.dir);

}

module.exports = getOrders;