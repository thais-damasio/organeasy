'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Checklist', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_atividade: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Atividade',
            schema: 'schema'
          },
          key: 'id'
        },
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING(255)
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
    return queryInterface.dropTable('Checklist');
  }
};
