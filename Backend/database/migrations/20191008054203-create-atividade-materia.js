'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AtividadeMateria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_materia: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Materia'
          },
          key: 'id'
        },
      },
      id_atividade: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Atividade'
          },
          key: 'id'
        },
      },
      tem_pontos: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      valor: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
      valor_ganho: {
        allowNull: true,
        type: Sequelize.DOUBLE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AtividadeMateria');
  }
};
