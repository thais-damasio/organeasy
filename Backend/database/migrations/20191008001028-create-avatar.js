'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Avatar', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      path: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      criado_em: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      atualizado_em: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Avatar');
  }
};
