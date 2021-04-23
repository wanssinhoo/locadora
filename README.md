# Locadora de filmes

 O sistema permiti a criação de usuários (clientes), login de um usuário, 
 listagem de filmes disponíveis, locação de um filme, devolução de um filme, e pesquisa de filme pelo título.

## Tecnologias utilizadas
 - NodeJS (v10.24.0)
 - MySql (v8.0.23)

## Banco de dados
O script para criar o banco de dados encontra-se no arquivo **config/banco.sql**.

Caso precise fazer alguma alteração na configuração do banco, basta alterar os dados no arquivo **config/config.js**. 

## Instalação
Na pasta onde deseja instalar o projeto digite os seguintes comandos: 

```sh
$ git clone https://github.com/wanssinhoo/locadora.git
$ cd locadora
$ npm install

Obs: Para os proximos comandos é necessário que o banco de dados esteja criado e online.

$ sequelize-cli db:migrate
$ sequelize-cli db:seed:all
$ npm start
```

## Documentação de Integração
A documentação pode ser acessada pelo link: 
https://docs.google.com/document/d/1TRD5OneqyjHKHvSXstmzNzSFcEauH1g2eV5TEmeKlWo/edit?usp=sharing
Ou pelo PDF **documentacao.pdf** dentro da pasta do projeto.
