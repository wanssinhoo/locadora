# Locadora de filmes
Exercicio de seleção da hub4all

 - Você irá criar um sistema de uma locadora de filmes. O sistema deve permitir a criação de usuários (clientes), logon e logoff de um usuário, 
 listagem de filmes disponíveis, locação de um filme, devolução de um filme, e pesquisa de filme pelo título.
 - Um filme deve possuir um título e um diretor.
 - A locadora pode possuir múltiplas cópias de um mesmo filme.
 - Um usuário deve possuir um e-mail para se identificar no sistema, um nome (para exibição) e uma senha.
 - O sistema pode ser acessado concorrentemente por múltiplos usuários, que
competirão pela locação dos filmes.

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

## Observações

 - Não criei a rota de logout porque eu acho que isso deve ser feito na parte do front (Excluindo o token), 
 a lib do JWT não permite invalidar o token gerado, uma opção seria criar uma blacklist ou setar a data de expiração com uma **new Date()**.

 - Não deu tempo de extrair muito conteudo sobre banco relacional, porque o meu conhecimento era só noSql. Eu sei que poderia melhorar as chamadas no banco.

 - Todas as rotas foram colocadas em um unico controller apenas por existir poucas rotas. (Para simplificar)
