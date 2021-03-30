'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Filmes', [
      {
        nome: 'O Curioso Caso de Benjamin Button',
        diretor: "David Fincher",
        estoque: 3,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'A Incrível História de Adeline',
        diretor: "Lee Toland Krieger",
        estoque: 1,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'O Menino Que Descobriu o Vento',
        diretor: "Chiwetel Ejiofor",
        estoque: 5,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'A Voz Suprema do Blues',
        diretor: "George C. Wolfe",
        estoque: 2,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Soul',
        diretor: "Pete Docter",
        estoque: 3,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Ted',
        diretor: "Seth MecFarlane",
        estoque: 3,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Nu',
        diretor: "Michael Tiddes",
        estoque: 1,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Os Vingadores',
        diretor: "Joe Russo",
        estoque: 5,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Mulher Maravilha',
        diretor: "Patty Jenkins",
        estoque: 5,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Matrix',
        diretor: "Lana Wachowski",
        estoque: 2,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ]);
    
  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Filmes', null, {});

  }
};
