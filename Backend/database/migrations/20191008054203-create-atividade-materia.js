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
            tableName: 'Materia',
            schema: 'schema'
          },
          key: 'id'
        },
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
      tem_pontos: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      valor: {
        allowNull: true,
        type: Sequelize.DOUBLE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AtividadeMateria');
  }
};
