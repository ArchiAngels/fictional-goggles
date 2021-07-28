// const path = require('path');
const fs = require('fs');
let db = fs.readFileSync('info2.json')+'';


function replaceOne(id,nameRow,newData){

    
    let temp_db = JSON.parse(db);
    console.log(temp_db);
        for(let obj = 0; obj < temp_db.length;obj++){
            for(let row in temp_db[obj]){
                if(temp_db[obj][row] == id){
                    temp_db[obj][nameRow] = newData;
                    break
                }else{
                    continue
                }
            }
        }
    let myJSON = JSON.stringify(temp_db);

    return fs.writeFileSync('info2.json',myJSON);
}

function insertOne(l,tc,t,p,is){

    
    let temp_db = JSON.parse(db);
    let newDB = null;
    // console.log(temp_db,temp_db[temp_db.length-1].id);
    let start_id = temp_db[temp_db.length-1].id + 1;
    let newRow = {
        id:start_id,
        liked:l,
        ToCart:tc,
        title:t,
        price:p,
        imgSRC:is
    }
    // let myJSON = JSON.stringify(temp_db.push(newRow));

    newDB = JSON.stringify(temp_db.concat(newRow));

    // temp_db = JSON.stringify(temp_db);

    console.log(newDB);

    return fs.writeFileSync('info2.json',newDB);
}


// replaceOne(5,'liked',false);

// insertOne(false,false,'noTitle','013','noSrc');

// console.log(db)

export {replaceOne,insertOne};

// "liked":true,
//             "ToCart":false,
//             "title":"Мужские Кроссовки Nike Blazer Mid Suede",
//             "price":"001",
//             "imgSRC":""