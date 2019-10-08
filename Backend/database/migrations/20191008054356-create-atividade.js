'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Atividade', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      titulo: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      concluida: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      data_entrega: {
        allowNull: true,
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('Atividade');
  }
};
