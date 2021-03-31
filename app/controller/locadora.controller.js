const Express = require('express');
const Jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');

const Crypt = require('../../config/crypt');
const Config = require('../../config/configuracoes');
const Filtro = require('../../filtro/filtro');

const { Usuarios, Filmes, Alugados } = require('../../models');
const Rota = Express.Router();

//Filtro de header
Rota.use(Filtro.headerRes);

//Rota para cadastro de usuarios
Rota.post('/cadastro', function(req, res){

    if(!req.body.nome)
        return res.status(400).json({msg: 'Nome não informado.'});
    if(!req.body.senha)
        return res.status(400).json({msg: 'Senha não informada.'});
    if(!req.body.email)
        return res.status(400).json({msg: 'Email não informado.'});

    Usuarios.findOne({ where : {email : req.body.email} })
    .then(respUsuario => {
        
        if(respUsuario)
            return res.status(400).json({msg : "Email já cadastrado."});

        let conta = {
            nome : req.body.nome,
            email : req.body.email,
            senha : Crypt.crypt(req.body.senha), //Criptografar a senha do usuario
            status : 1
        };

        Usuarios.create(conta)
        .then(respCreate => {
            return res.status(200).send({ msg : 'Conta cadastrada com sucesso.'});
        })
        .catch((erro) => {
            return res.status(200).send({ msg : 'Erro ao se cadastrar.'});
        })

    })
    .catch((erro) => {
        return res.status(400).send({ msg : 'Erro ao verificar conta.'});
    })

});// OK

//Rota para gerar token de acesso
Rota.post('/token', function(req, res){

    if(!req.body.email)
        return res.status(400).json({msg: 'Email não informado.'});
    if(!req.body.senha)
        return res.status(400).json({msg: 'Senha não informada.'});

    Usuarios.findOne({ where: { email : req.body.email } })
    .then(respUsuario => {
        
        if(respUsuario == null)
            return res.status(400).json({msg : "Usuário não encontrado."});

        //Verifica se a senha é verdadeira
        if (!Crypt.compare(req.body.senha, respUsuario.dataValues.senha)) 
            return res.status(400).json({ msg: 'Login ou Senha invalida.'});

        //Dados para token
        var jsonUser = {
            id: respUsuario.dataValues.id,
            nome: respUsuario.dataValues.nome,
            email: respUsuario.dataValues.email
        };

        //Gera token de acesso com validade de 1H
        Jwt.sign(jsonUser, Config.chaveSecreta, { expiresIn: 3600 }, function(err, token) {
            if (err) 
                return res.status(400).send({msg : "Erro ao gerar token de acesso."});
            
            return res.status(200).send({token : token});
        });

    })
    .catch((erro) => {
        return res.status(400).send({ msg : 'Erro ao buscar usuário.'});
    })

});// OK

//Rota para exibir dados da conta
Rota.get('/conta', Filtro.token, function(req, res, next){

    let dadosBusca = {
        where: { id : req.session.id }, 
        attributes: { exclude: ["senha", "updatedAt"]}
    };

    Usuarios.findOne(dadosBusca)
    .then(respConta => {
        
        if(!respConta)
            return res.status(400).json({msg : "Conta não encontrada."});

        return res.status(200).json(respConta);

    })
    .catch((erro) => {
        return res.status(400).send({ msg : 'Erro ao buscar dados de conta.'});
    })

});// OK

//Rota para listar filmes disponiveis
Rota.get('/filmes', Filtro.token, function(req, res, next){

    let dadosBusca = {
        attributes: { exclude: ["createdAt", "updatedAt"]},
    };

    //Regex para pesquisar filme com nome imcompleto
    if(req.query.nome)
        dadosBusca.where = { nome : Sequelize.literal(' nome REGEXP "' + req.query.nome + '" ') };

    Filmes.findAll(dadosBusca)
    .then(respFilmes => {
        return res.status(200).json(respFilmes);
    })
    .catch((erro) => {
        return res.status(400).send({ msg : 'Erro buscar lista de filmes.'});
    })

});// OK

//Rota para listar filmes alugados
Rota.get('/filmes_alugados', Filtro.token, function(req, res, next){

    let dadosBusca = {
        usuario_id : req.session.id,
        attributes: { exclude: ["createdAt", "updatedAt"]},
        include: {
            model: Filmes,
            attributes: ["nome", "diretor"]
          }
    };

    if(req.query.nome)
        dadosBusca.include.where = {nome : Sequelize.literal(' nome REGEXP "' + req.query.nome + '" ')} ;

    Alugados.findAll(dadosBusca)
    .then(respHistorico => {
        return res.status(200).json(respHistorico);
    })
    .catch((erro) => {
        return res.status(400).send({ msg : 'Erro ao buscar filmes alugados.'});
    })

});// OK

//Rota para alugar um filme
Rota.post('/alugar_filme', Filtro.token, function(req, res){

    if(!req.body.filme_id)
        return res.status(400).json({msg: 'Id do filme não informado.'});

    Filmes.findOne({where : {id : req.body.filme_id}})
    .then(respFilme => {
        
        if(respFilme.estoque == 0)
            return res.status(200).send({ msg : 'Filme esgotado.'});

        let dados = {
            estoque : respFilme.estoque - 1,
            filme : respFilme
        };
            
        atualizarEstoque(dados);

    })
    .catch((erro) => {
        return res.status(400).send({ msg : 'Erro ao buscar filme.'});
    })

    //Atualiza o estoque do filme
    function atualizarEstoque(dados){

        dados.filme.update({ estoque: dados.estoque })
        .then(resSave => {
            criarAluguel();
        })
        .catch((erro) => {
            return res.status(400).send({ msg : 'Erro ao alugar filme.'});
        })

    }

    //Cria dados de aluguel do filme
    function criarAluguel(){

        let dadosAluguel = {
            usuario_id: Number(req.session.id),
            filme_id: Number(req.body.filme_id),
            data_locacao: new Date(),
            status: 1
        };

        Alugados.create(dadosAluguel)
        .then(resCreate => {
            return res.status(200).send({ msg : 'Filme alugado com sucesso.'});
        })
        .catch((erro) => {
            //Alterar estoque do filme aqui.
            return res.status(400).send({ msg : 'Erro ao alugar filme.'});
        })

    }


    
});// OK

//Rota para devolver um filme
Rota.put('/devolver_filme', Filtro.token, function(req, res){

    if(!req.body.aluguel_id)
        return res.status(400).json({msg: 'Id do aluguel não informado.'});

    let dadosBusca = {
        where : { 
            id : req.body.aluguel_id,
            usuario_id : req.session.id,
        },
        include: {
            model: Filmes
        }
    };

    Alugados.findOne(dadosBusca)
    .then(respAluguel => {

        if(!respAluguel)
            return res.status(400).json({msg: 'Aluguel não encontrado.'});
        if(respAluguel.status == 2)
            return res.status(400).json({msg: 'Filme já devolvido.'});
        
        let dados = {
            aluguel : respAluguel,
            estoque : respAluguel.Filme.estoque + 1,
            dados_devolucao : {
                status : 2,
                data_entrega : new Date()
            }
        };
            
        atualizarEstoque(dados);

    })
    .catch((erro) => {
        return res.status(400).send({ msg : 'Erro ao buscar dados do aluguel.'});
    })

    //Atualiza o estoque do filme
    function atualizarEstoque(dados){

        dados.aluguel.Filme.update({ estoque: dados.estoque })
        .then(resSave => {
            salvarAluguel(dados);
        })
        .catch((error) => {
            return res.status(400).send({ msg : 'Erro ao devolver filme.'});
        })

    }

    //Altera status do aluguel e seta data de entrega
    function salvarAluguel(dados){

        dados.aluguel.update(dados.dados_devolucao)
        .then(resSave => {
            return res.status(200).send({ msg : 'Filme devolvido com sucesso.'});
        })
        .catch((error) => {
            //Remover estoque do filme aqui.
            return res.status(400).send({ msg : 'Erro ao devolver filme.'});
        })

    }
    
});// OK

module.exports = Rota;