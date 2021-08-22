exports.NEXT_ID = async function(currentID_,CollectName){
    let NEXT_ID = parseInt(currentID_.currentID)+1;
    const filter = { "myID": "-1" };
    const updateDoc = {
        $set: {
    
            currentID: (NEXT_ID)+''

        },
    };
    
    const result = await CollectName.updateOne(filter, updateDoc);
    
        // console.log(
    
        //     `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    
        // );
    console.log(NEXT_ID);
    return NEXT_ID+'';
}