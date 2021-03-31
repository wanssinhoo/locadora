var express = require('express');
var app = express();
var morgan = require('morgan');

var port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(express.json());

//Chamada da api
app.use('/app', require('./app/controller/locadora.controller'));
app.use('/', function(req, res){ res.status(404).json({msg : 'Rota não encontrada.'}) });

//Inicia o servidor
app.listen(port, function(){
    console.log('Servidor iniciado na porta: ' + port);
});