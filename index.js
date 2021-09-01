const express = require('express');
const compression = require('compression');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const MyApi = require('./backend/myOwnApi');
const MyAuth = require('./backend/myAuth');
const DefRoutes = require('./backend/myDefRouts');

app.use(compression());

app.use(express.static(path.join(__dirname,'dist')));
app.use(express.static(path.join(__dirname,'media')));

app.use('/api',MyApi);
app.use('/auth',MyAuth);
app.use('/',DefRoutes);

app.listen(port);