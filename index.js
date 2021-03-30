var app = require('express')();
var http = require('http').Server(app);
var morgan = require('morgan');

const port = process.env.PORT || 5000;

app.use(morgan('dev'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Chamada de api's
app.use('/app', require('./app/controller/locadora.controller'));
app.use('/', function(req, res){ res.status(400).json({msg : 'Rota não encontrada.'}) });

//Inicia o servidor
http.listen(port, function(){
    console.log('Servidor iniciado na porta: ' + port);
});