'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Alugados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'Usuarios',
            key: 'id'
        }
      },
      filme_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Filmes',
          key: 'id'
        }
      },
      data_locacao: {
        allowNull: false,
        type: Sequelize.DATE
      },
      data_entrega: {
        type: Sequelize.DATE
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Alugados');
  }
};