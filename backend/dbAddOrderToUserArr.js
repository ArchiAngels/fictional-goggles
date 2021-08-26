exports.AddOrderId = async function(usersList,user_id,order_id){
    let query = { "id":user_id };
    let user = await usersList.findOne(query);
        // console.log("user::user::",user);

    const option = { 
        upsert: true 
    };
    
    let doc = {
        $set:{
            orders:Value(order_id)
        }
    }
    let result = await usersList.updateOne(query,doc,option);
        // console.log("ADD:::::",result);
    if(result.modifiedCount == 1){
        return {mess:'Succesfully added',code:200};
    }else{
        return {mess:'something is bad',code:500};
    }

    function Value(id){
        // console.log(user.orders,typeof(user.orders));
        let result;
            if(user.orders instanceof Array){
                result = user.orders;
                result.push(id);
            }else{
                result = [id];
            }
        return result;
    }
}