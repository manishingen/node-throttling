'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

require('dotenv').config();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(port, function () {
    const address = this.address();
    console.log(`Listening on port ${address.address} : ${address.port} !`)
})


app.get('*', require('./routes'));
app.post('*', require('./routes'));
