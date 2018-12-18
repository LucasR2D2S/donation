'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

//Conecta ao banco
mongoose.connect('mongodb://lucas:lucas1@ds042128.mlab.com:42128/nstrs2');

// Carrega os Models
const Ong = require('./models/ong');
const Doador = require('./models/doador');
const Doacao = require('./models/doacao');

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const ongRoute = require('./routes/ong-route');
const doadorRoute = require('./routes/doador-route');
const doacaoRoute = require('./routes/doacao-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Habilita o CORS
app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/ongs', ongRoute);
app.use('/doadores', doadorRoute);
app.use('/doacoes', doacaoRoute);

module.exports = app;