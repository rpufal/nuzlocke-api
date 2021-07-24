const express = require('express');
const routerRuns = require('../routers/routerRuns');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())
app.use('/runs', routerRuns)


module.exports = app;