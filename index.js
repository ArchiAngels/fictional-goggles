const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const MyApi = require('./myOwnApi');

app.use(express.static(path.join(__dirname,'dist')));
app.use(express.static(path.join(__dirname,'media')));

app.use('/api',MyApi);

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'index.html'))
})


app.listen(port);