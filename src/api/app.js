const express = require('express');
const {routerRuns} = require('../routers');
const {routerUsers} = require('../routers');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use('/runs', routerRuns);
app.use('/users', routerUsers);



module.exports = app;