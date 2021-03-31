//npm i jsonwebtoken --save
const jwt = require('jsonwebtoken');
const Config = require('../config/configuracoes');

var Filtro = {};

//Seta alguns header na response
Filtro.headerRes = function (req, res, next) {

	res.header("Access-Control-Allow-Origin", '*');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Access-Token, Content-Type, Accept, User-Agent, Referer, Connection, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Access-Control-Request-Method, Host, User-Agent, Pragma");
	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Credentials", "true");
	
	if(req.method === 'OPTIONS'){
		return res.json({ok:'OK'});
	}

	next();
};

//Verifica se existe token e se é válido
Filtro.token = function (req, res, next) {

	var token = req.headers.token;

	if (token && token != "") {

		jwt.verify(token, Config.chaveSecreta, function(err, session) {
			if (err) 
				return res.status(401).json({ msg: 'Sua sessão expirou, faça login novamente.', status : 0 });		

			req.session = session;
			next();
		});
	}

	if(!token){
		return res.status(400).json({
			msg: 'Você não está logado.'
		});
	}
}

module.exports = Filtro;