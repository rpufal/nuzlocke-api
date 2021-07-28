const express = require('express');
const {routerRuns, routerUsers} = require('../routers');
const errorHandling = require('../middlewares/errorHandling')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use('/runs', routerRuns);
app.use('/users', routerUsers);
app.use(errorHandling);



module.exports = app;