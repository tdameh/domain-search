const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const search = require('./routes/search');
const importer = require('./lib/importer')

let app = express();

let imp = new importer('top-1m.csv');
imp.run();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/search', search);

module.exports = app;
