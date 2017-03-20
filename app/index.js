
//index file for app

var path = require('path')
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// bodyparser for reading body of req
app.use(bodyParser.urlencoded({extended: true}));

// embedded javascript for template engine
app.set('view engine', 'ejs')
// directory for serving views
app.set('views', path.join(__dirname, 'router/views'))

// initialize router
require('./router').init(app);

module.exports = app;