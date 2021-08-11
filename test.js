const jwt = require('jsonwebtoken');

let secret = 'document.getElementById';
let secret2 = 'WeaReTH$%#CHAMPI()N5_@#SDA%^>:';

// let email = 'asd@gmail.com';
// let hemail = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYXNkQGdtYWlsLmNvbSIsImlhdCI6MTYyODU2MDI3MH0.cXnSaI24P76DeT4k2Jt8ou6T0DRHLD8fq61mKVQBRrI';
// let pass = 'asdasdasd';
// let hpass = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYXNkYXNkYXNkIiwiaWF0IjoxNjI4NTYwMjcwfQ.naq8lMrDTHHkGEuzasV36nQmTpRR7IO4CprhNSnKGWY';

const checkToken = require('./backend/parseClientServerToken');

let hemail = 'eyJhbGciOiJIUzI1NiJ9.TWlraXRhQE1pa2l0YS5NaWtpdGE.YJZSCCovsHvJ9oOyEug8gE5qj82UWJic-4J7E2tt8UI';
let hpass = 'eyJhbGciOiJIUzI1NiJ9.TWlraXRhTWlraXRhTWlraXRh.ftF4HjRbf13IFK4IGnD4yt1vAOt2SrLJAIJNUF78YhA'

// console.log("EMAIL 2 ::",checkToken.DB_HASH(email));
console.log('EMAIL 1 ::',checkToken.DB_DECODE(hemail));
// console.log("pass 2 ::",checkToken.DB_HASH(pass));
console.log('pass 1 ::',checkToken.DB_DECODE(hpass));
// let token = jwt.sign({
//         name:'Mikita',
//         age:20,
//         who:'Hacker',
//         exp:Math.floor(Date.now() / 1000) + (60)}
//     ,secret);

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJKZGpzbm5zIiwibG5hbWUiOiJTaGhzYmRicyIsImNvZGVXb3JkIjoiVExIIn0sImV4cCI6MTYyODU1NDU0NywiaWF0IjoxNjI4NTUwOTQ3fQ.u0PTKA9beAqiF2vpiN4JhVpSkq83JTSRlDV71Em6qcg';

// console.log('TOKEN::',token);

// try {
//     jwt.verify(token,secret2,function(err,decode){
//         console.log('DECODE::',decode);
//     });
// } 
// catch (err) {
//     console.log('error',err);
// }
// finally{
//     console.log('finaly not crash');
// }

// console.log(Date.now() /1000);