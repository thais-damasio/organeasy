'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Curso', {
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
      tem_materias: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      id_aluno: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Aluno'
          },
          key: 'id'
        },
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
    return queryInterface.dropTable('Curso');
  }
};
