const express = require('express');
const compression = require('compression');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const MyApi = require('./myOwnApi');
const MyAuth = require('./myAuth');

app.use(compression());

app.use(express.static(path.join(__dirname,'dist')));
app.use(express.static(path.join(__dirname,'media')));

app.use('/api',MyApi);
app.use('/auth',MyAuth);

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'index.html'))
})


app.listen(port);