'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OpcaoChecklist', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_checklist: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Checklist',
            schema: 'schema'
          },
          key: 'id'
        },
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      feito: {
        allowNull: true,
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('OpcaoChecklist');
  }
};
